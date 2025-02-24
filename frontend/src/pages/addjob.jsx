import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../store/slices/jobSlice";
import { InputBox } from "../components/inputBox";
import AdminHeader from "../components/adminHeader";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const dispatch = useDispatch();
  const jobStatus = useSelector((state) => state.jobs.status);
  const jobError = useSelector((state) => state.jobs.error);
  const departments = ["ECE", "EEE", "Mech", "CSE", "Civil"];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CompanyName: "",
    role: "",
    package: "",
    jobdescription: "",
    Type: "",
    eligibility: "",
    department: [],
    applylink: "",
    deadline: new Date().toISOString().slice(0, 16), // ✅ Fix datetime format
    companyvisit: new Date().toISOString().slice(0, 16),
    status: "current",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      department: checked
        ? [...(prev.department || []), value]
        : prev.department.filter((dept) => dept !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Submission:", formData); // ✅ Debugging
    dispatch(addJob(formData));
    navigate("/admin/home");
  };

  return (
    <div>
      <AdminHeader />
      <div className="py-5 bg-gradient-to-l from-[#a935fd] to-[#35fdf5] min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Add New Job</h2>

          <div className="grid gap-4">
            <InputBox
              type="text"
              name="CompanyName"
              placeholder="Company Name"
              value={formData.CompanyName}
              onChange={handleChange}
              required
            />
            <InputBox
              type="text"
              name="role"
              placeholder="Job Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <InputBox
              type="text"
              name="package"
              placeholder="Salary Package"
              value={formData.package}
              onChange={handleChange}
              required
            />

            <textarea
              name="jobdescription"
              placeholder="Job Description"
              value={formData.jobdescription}
              onChange={handleChange}
              className="p-2 border bg-slate-300 text-black rounded-md w-full h-24"
              required
            />

            <select
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              className="bg-slate-300 text-black p-2 border rounded-md w-full"
              required
            >
              <option value="">Select Job Type</option>{" "}
              {/* ✅ Default Empty Option */}
              <option value="IT">IT</option>
              <option value="Core">Core</option>
            </select>

            <InputBox
              type="text"
              name="eligibility"
              placeholder="Eligibility Criteria"
              value={formData.eligibility}
              onChange={handleChange}
              required
            />

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
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>

            <InputBox
              type="url"
              name="applylink"
              placeholder="Apply Link"
              value={formData.applylink}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="companyvisit"
              value={formData.companyvisit}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-slate-300 p-2 border rounded-md w-full"
            >
              <option value="current">Current</option>
              <option value="closed">Closed</option>
            </select>

            <button
              type="submit"
              className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {jobStatus === "loading" ? "Submitting..." : "Submit"}
            </button>

            {jobStatus === "failed" && (
              <p className="text-red-500">{jobError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
