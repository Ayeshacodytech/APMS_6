import { EditableInputbox } from "./editableInputbox";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, selectUserProfile, selectUserStatus, selectUserError } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { EditableGraduationYearDropdown } from "./editableYearofGraduation";
import { EditabledeptDropDown } from "./editableDeptdropdown";
import { EditableYearDropdown } from "./editableYeardropdown";
import { EditableIsPlaced } from "./editableIsplaced";
import { EditableBatchDropDown } from "./editableBatchdropdown";

import { FunctionButton } from "./functionButton";
import { EditableFeildofInterestDropDown } from "./editableFeildofInterest";

export const ProfileData = () => {
    const dispatch = useDispatch();

    // Selecting profile data and state from Redux
    const profile = useSelector(selectUserProfile);
    const status = useSelector(selectUserStatus);
    const error = useSelector(selectUserError);

    // Local state for form inputs
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    // Effect hook to fetch profile data when the component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProfile());
        }
    }, [status, dispatch]);

    // Sync local formData with profile data from Redux
    useEffect(() => {
        setFormData(profile); 
    }, [profile]);

    // Log formData whenever it changes
    useEffect(() => {
        console.log("Updated FormData:", formData);
    }, [formData]);

    const handleInputChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    

    // Handle form submission for updating profile
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        console.log("started")
        dispatch(updateProfile(formData));
        console.log("end")
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setFormData(profile); // Reset form data to current profile
        setIsEditing(false);
    };

    // Show loading spinner if status is loading
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Show error message if there is an error
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="text-2xl font-bold flex justify-center">
                Profile
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <EditableInputbox
                    value={formData.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    name="name"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <EditableInputbox
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    name="email"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Register number</label>
                <EditableInputbox
                    value={formData.registernumber}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    name="registernumber"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Year of Graduation</label>
                <EditableGraduationYearDropdown
                    value={formData.YearofGraduation}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Department</label>
                <EditabledeptDropDown
                    value={formData.department}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Year</label>
                <EditableYearDropdown
                    value={formData.year}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Are you placed</label>
                <EditableIsPlaced
                    value={formData.isPlaced}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Batch</label>
                <EditableBatchDropDown
                    value={formData.batch}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">CGPA</label>
                <EditableInputbox
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    name="cgpa"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Field of Interest</label>
                <EditableFeildofInterestDropDown
                    value={formData.FieldofInterest}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
            <div className="flex justify-center space-x-4">
                {isEditing ? (
                    <>
                        <FunctionButton
                            label="Save"
                            onClick={handleSaveClick}
                        />
                        <FunctionButton
                            label="Cancel"
                            onClick={handleCancelClick}
                        />
                    </>
                ) : (
                    <FunctionButton
                        label="Edit"
                        onClick={handleEditClick}
                    />
                )}
            </div>
        </div>
    );
};
