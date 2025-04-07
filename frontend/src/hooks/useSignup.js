import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export function useSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] = useState(0);
  const [batch, setBatch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [field, setField] = useState("");
  const [isPlaced, setIsPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [registerNumberError, setRegisterNumberError] = useState("");
  const [yearError, setYearError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [graduationYearError, setGraduationYearError] = useState("");
  const [batchError, setBatchError] = useState("");
  const [cgpaError, setCgpaError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [registered, setRegistered] = useState("");

  const handleSignup = async () => {
    // Reset errors
    setError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setRegisterNumberError("");
    setYearError("");
    setDepartmentError("");
    setGraduationYearError("");
    setBatchError("");
    setCgpaError("");
    setFieldError("");

    // Validation checks
    if (!username) setNameError("Please enter your name");
    if (!email) setEmailError("Please enter your email");
    if (!password) setPasswordError("Please enter your password");
    if (!registerNumber)
      setRegisterNumberError("Please enter your registration number");
    if (!year) setYearError("Please enter your year of study");
    if (!department) setDepartmentError("Please enter your department");
    if (!graduationYear || graduationYear <= 0)
      setGraduationYearError("Please enter a valid graduation year");
    if (!batch) setBatchError("Please select your batch");
    if (!cgpa || isNaN(cgpa) || cgpa < 0 || cgpa > 10)
      setCgpaError("Please enter a valid CGPA (0-10)");
    if (!field) setFieldError("Please enter your field of study");
    const isPlacedBoolean =
      typeof isPlaced === "string"
        ? isPlaced.toLowerCase() === "true"
        : Boolean(isPlaced);
    console.log(isPlacedBoolean);

    if (
      nameError ||
      emailError ||
      passwordError ||
      registerNumberError ||
      yearError ||
      departmentError ||
      graduationYearError ||
      batchError ||
      cgpaError ||
      fieldError
    ) {
      setError("Please fill in all required fields correctly.");
      return;
    }
    setLoading(true);
    setError("");
    console.log("done");
    try {
      const response = await axios.post(
        "https://futureforge-iota.vercel.app/api/v1/student/signup",
        {
          name: username,
          email,
          password,
          registernumber: registerNumber,
          year,
          department: department,
          YearofGraduation: graduationYear,
          isPlaced: isPlacedBoolean,
          FieldofInterest: field,
          cgpa,
          batch,
        }
      );

      console.log(response);
      console.log("User registered successfully");
      login(response.data.token);
      navigate("/home");
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
    registerNumber,
    setRegisterNumber,
    password,
    setPassword,
    year,
    setYear,
    department,
    setDepartment,
    graduationYear,
    setGraduationYear,
    batch,
    setBatch,
    cgpa,
    setCgpa,
    field,
    setField,
    isPlaced,
    setIsPlaced,
    loading,
    error,
    nameError,
    emailError,
    passwordError,
    registerNumberError,
    yearError,
    departmentError,
    graduationYearError,
    batchError,
    cgpaError,
    fieldError,
    handleSignup,
  };
}
