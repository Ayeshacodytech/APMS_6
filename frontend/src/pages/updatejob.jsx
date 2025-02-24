import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminJobs,
  updateJob,
  selectCurrentJobs,
} from "../store/slices/jobSlice";
import { EditableInputbox } from "../components/editableInputbox";
import { FunctionButton } from "../components/functionButton";
import { useNavigate, useLocation } from "react-router-dom";

export const Updatejob = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { job } = location.state || {};
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);
  const jobs = useSelector(selectCurrentJobs);

  const existingJob = jobs.find((j) => j.id === job?.id);

  // Ensure department is always an array
  const [formData, setFormData] = useState(() => ({
    ...(existingJob || job),
    department: existingJob?.department || job?.department || [], // Ensure it's an array
  }));
  const [isEditing, setIsEditing] = useState(false);

  // Departments List
  const departments = ["ECE", "Mech", "Civil", "EEE", "CSE"];

  useEffect(() => {
    if (!job && status === "idle") {
      dispatch(fetchAdminJobs());
    }
  }, [status, dispatch, job]);

  useEffect(() => {
    if (existingJob) {
      setFormData((prev) => ({
        ...prev,
        department: existingJob.department || [], // Ensure department remains an array
      }));
    }
  }, [existingJob]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      department: checked
        ? [...prev.department, value] // Add department
        : prev.department.filter((dept) => dept !== value), // Remove department
    }));
  };

  const handleSaveClick = () => {
    dispatch(updateJob({ id: formData.id, updatedJob: formData }));
    setIsEditing(false);
    navigate(`/admin/home`);
  };

  const handleCancelClick = () => {
    setFormData(existingJob || job);
    setIsEditing(false);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
      <div className="text-2xl font-bold flex justify-center">Job Details</div>

      <div>
        <label className="block mb-2 text-sm font-medium">Company Name</label>
        <EditableInputbox
          value={formData.CompanyName}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="CompanyName"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Role</label>
        <EditableInputbox
          value={formData.role}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="role"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Package</label>
        <EditableInputbox
          value={formData.package}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="package"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Job Description
        </label>
        <textarea
          value={formData.jobdescription}
          onChange={(e) => handleInputChange("jobdescription", e.target.value)}
          readOnly={!isEditing}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Job Type</label>
        <select
          name="Type"
          value={formData.Type}
          onChange={(e) => handleInputChange("Type", e.target.value)}
          disabled={!isEditing}
          className="p-2 border rounded-md w-full"
        >
          <option value="IT">IT</option>
          <option value="Core">Core</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Eligibility</label>
        <EditableInputbox
          value={formData.eligibility}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="eligibility"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Apply Link</label>
        <EditableInputbox
          value={formData.applylink}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="applylink"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Deadline</label>
        <EditableInputbox
          value={formData.deadline}
          onChange={handleInputChange}
          readOnly={!isEditing}
          name="deadline"
        />
      </div>

      {/* Departments Selection */}
      <div className="bg-slate-300 p-2 border rounded-md w-full">
        <label className="block font-bold mb-2">Departments:</label>
        {departments.map((dept) => (
          <label key={dept} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="department"
              value={dept}
              checked={formData.department.includes(dept)}
              onChange={handleDepartmentChange}
              disabled={!isEditing}
              className="mr-2 bg-slate-300 text-black"
            />
            <span>{dept}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        {isEditing ? (
          <>
            <FunctionButton label="Save" onClick={handleSaveClick} />
            <FunctionButton label="Cancel" onClick={handleCancelClick} />
          </>
        ) : (
          <FunctionButton label="Edit" onClick={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};
