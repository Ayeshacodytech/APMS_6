import { InputBox } from "../components/inputBox";
import { PasswordBox } from "../components/passwordBox";
import { FunctionButton } from "../components/functionButton";
import { useSignup } from "../hooks/useSignup";
import { YearDropdown } from "../components/yearDropdown";
import { DeptDropdown } from "../components/deptDropdown";
import { GraduationYearDropdown } from "../components/graduationYear";
import { BatchDropDown } from "../components/batchDropdown";
import { FieldOfInterest } from "../components/fieldOfInterest";
import { IsPlaced } from "../components/IsPlaced";
import { Appheader } from "../components/appheader";

export const Signup = () => {
  const {
    batch,
    department,
    field,
    isPlaced,
    year,
    graduationYear,
    setName,
    setEmail,
    setPassword,
    setBatch,
    setCgpa,
    setDepartment,
    setField,
    setYear,
    setIsPlaced,
    setGraduationYear,
    setRegisterNumber,
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
  } = useSignup();

  return (
    <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <div>
        <Appheader />
        <div className="flex items-center justify-center pt-1 text-white">
          <div className="w-[528px] p-12 rounded-lg mb-[120px]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold">SKILL NODE</h1>
            </div>

            <div className="space-y-2">
              <div className="text-md font-bold">Name</div>
              <InputBox
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <div className="text-red-500">{nameError}</div>}

              <div className="text-md font-bold">Email</div>
              <InputBox
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}

              <div className="text-md font-bold">Register Number</div>
              <InputBox
                placeholder="Enter your Register Number"
                onChange={(e) => setRegisterNumber(e.target.value)}
              />
              {registerNumberError && (
                <div className="text-red-500">{registerNumberError}</div>
              )}

              <div className="text-md font-bold">Select Your Year</div>
              <YearDropdown
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
              {yearError && <div className="text-red-500">{yearError}</div>}

              <div className="text-md font-bold">Select Your Department</div>
              <DeptDropdown
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              />
              {departmentError && (
                <div className="text-red-500">{departmentError}</div>
              )}

              <div className="text-md font-bold">Year of Graduation</div>
              <GraduationYearDropdown
                onChange={(value) => {
                  console.log("Selected graduation year:", value); // Debugging line
                  setGraduationYear(value); // Correctly set the graduation year
                }}
                value={graduationYear}
              />
              {graduationYearError && (
                <div className="text-red-500">{graduationYearError}</div>
              )}

              <div className="text-md font-bold">Select Your Batch</div>
              <BatchDropDown
                onChange={(e) => setBatch(e.target.value)}
                value={batch}
              />

              {batchError && <div className="text-red-500">{batchError}</div>}

              <div className="text-md font-bold">CGPA</div>
              <InputBox
                placeholder="Enter your CGPA"
                onChange={(e) => setCgpa(e.target.value)}
              />
              {cgpaError && <div className="text-red-500">{cgpaError}</div>}

              <div className="text-md font-bold">
                Select Your Field of Interest
              </div>
              <FieldOfInterest
                onChange={(e) => setField(e.target.value)}
                value={field}
              />
              {fieldError && <div className="text-red-500">{fieldError}</div>}

              <div className="text-md font-bold">Are You a Placed Student?</div>
              <IsPlaced
                onChange={(e) => setIsPlaced(e.target.value)}
                value={isPlaced}
              />

              <div className="text-md font-bold">Password</div>
              <PasswordBox
                placeholder="Please enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
            </div>

            <FunctionButton
              onClick={handleSignup}
              label={loading ? "Signing up..." : "Sign up"}
              disabled={loading}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}

            <div className="text-center mt-6">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-600 hover:underline">
                  Sign in.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
