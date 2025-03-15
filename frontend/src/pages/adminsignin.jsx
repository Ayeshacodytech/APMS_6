import { InputBox } from "../components/inputBox";
import { PasswordBox } from "../components/passwordBox";
import { FunctionButton } from "../components/functionButton";
import { Appheader } from "../components/appheader";
import { useAdmin } from "../hooks/useAdmin";

export const Adminsignin = () => {
  const {
    setEmail,
    setPassword,
    loading,
    error,
    emailError,
    passwordError,
    handleSignin,
  } = useAdmin();

  return (
    <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <div>
        {/* <Appheader></Appheader> */}
        <div className="flex items-center justify-center pt-24 text-white">
          <div className="w-[528px] p-12 rounded-lg mb-[120px] bg-white">
            <div className="text-center mb-8">
              <div className="text-5xl font-grechen leading-[1.3]">
                <span className="bg-gradient-to-l from-[#a935fd] via-[#6f5eff] to-[#35fdf5] bg-clip-text text-transparent p-1">
                  Futureforge
                </span>
              </div>

            </div>

            <div className="space-y-2 ">
              <div className="text-md font-bold">email</div>
              <InputBox
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
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
              onClick={handleSignin}
              label={loading ? "Signing in..." : "Sign in"}
              disabled={loading}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminsignin;
