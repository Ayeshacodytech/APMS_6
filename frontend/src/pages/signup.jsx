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
    setName,
    setEmail,
    setPassword,
    loading,
    error,
    nameError,
    emailError,
    passwordError,
    handleSignup,
  } = useSignup();

  return (
    <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <div>
        <Appheader></Appheader>
        <div className="flex items-center justify-center pt-1 text-white">
          <div className="w-[528px] p-12 rounded-lg mb-[120px]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold">SKILL NODE</h1>
            </div>

            <div className="space-y-2">
              <div className="text-md font-bold">Name</div>
              <InputBox
                placeholder="Enter your Name"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-md font-bold">email</div>
              <InputBox
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-md font-bold">Register number</div>
              <InputBox
                placeholder="Enter your Register number"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-md font-bold">Select your Year</div>
              <YearDropdown></YearDropdown>
              <div className="text-md font-bold">Select your department</div>
              <DeptDropdown></DeptDropdown>
              <div className="text-md font-bold">Year of graduation</div>
              <GraduationYearDropdown></GraduationYearDropdown>
              {emailError && <div className="text-red-500">{emailError}</div>}
              <div className="text-md font-bold">Select your batch</div>
              <BatchDropDown></BatchDropDown>
              <div className="text-md font-bold">CGPA</div>
              <InputBox
                placeholder="Enter your CGPA"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-md font-bold">
                Select your field of Interest
              </div>
              <FieldOfInterest></FieldOfInterest>
              <div className="text-md font-bold">Are you a placed student</div>
              <IsPlaced></IsPlaced>
              <div className="text-md font-bold">password</div>
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
