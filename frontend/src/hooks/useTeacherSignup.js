import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export function useTeacherSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const handleSignup = async () => {
    // Reset errors
    setError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setDepartmentError("");

    // Validation checks
    if (!username) setNameError("Please enter your name");
    if (!email) setEmailError("Please enter your email");
    if (!password) setPasswordError("Please enter your password");
    if (!department) setDepartmentError("Please enter your department");

    if (nameError || emailError || passwordError || departmentError) {
      setError("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    setError("");
    console.log("done");
    try {
      const response = await axios.post(
        "https://apms-6.onrender.com/api/v1/teacher/signup",
        {
          name: username,
          email,
          password,
          department: department,
        }
      );

      console.log(response);
      console.log("User registered successfully");
      login(response.data.token);
      navigate("/teacher/home");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Email is already taken.");
      } else {
        setError("Sign up failed. Please check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    department,
    setDepartment,
    loading,
    error,
    nameError,
    emailError,
    passwordError,
    departmentError,
    handleSignup,
  };
}
