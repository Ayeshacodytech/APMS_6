import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export function useTeacherSignin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailerror] = useState("");
  const [passwordError, setPassworderror] = useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      if (!email) {
        setEmailerror("Please enter a valid email");
      }
      if (!password) {
        setPassworderror("Please enter a valid password");
      }
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://apms-6.onrender.com/api/v1/teacher/signin",
        {
          email,
          password,
        }
      );
      console.log(response.data.token);

      login(response.data.token);
      navigate("/teacher/home");
    } catch (err) {
      setError("Sign in failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    emailError,
    setEmailerror,
    passwordError,
    setPassworderror,
    handleSignin,
  };
}
