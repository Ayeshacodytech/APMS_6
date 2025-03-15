
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, selectUserProfile, selectUserStatus, selectUserError } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { SideNavBar } from '../components/SideNavbar';
import { ProfileData } from '../components/profiledata';
const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selecting profile data and state from Redux
    const profile = useSelector(selectUserProfile);
    const status = useSelector(selectUserStatus);
    const error = useSelector(selectUserError);

    // Local state for form inputs
    const [formData, setFormData] = useState({
        name: profile.name || '',
        email: profile.email || '',
        registernumber: profile.registernumber || '',
        year: profile.year || '',
        department: profile.department || '',
        YearofGraduation: profile.YearofGraduation || '',
        cgpa: profile.cgpa || '',
        batch: profile.batch || '',
        isPlaced: profile.isPlaced || false,
        FieldofInterest: profile.FieldofInterest || '',
    });

    // Effect hook to fetch profile data when the component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProfile());
        }
    }, [status, dispatch]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission for updating profile
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch updateProfile action
        dispatch(updateProfile(formData))
            .then(() => {
                toast.success('Profile updated successfully!');
            })
            .catch((error) => {
                toast.error('Error updating profile!');
            });
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
        <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
            <div>
                <SideNavBar />
            </div>
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">

                <ProfileData></ProfileData>
            </div>
        </div>
    );
};

export default ProfilePage;
