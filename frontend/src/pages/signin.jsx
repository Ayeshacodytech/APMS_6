import { useSignin } from "../hooks/useSignin";
import { InputBox } from "../components/inputBox";
import { PasswordBox } from "../components/passwordBox";
import { FunctionButton } from "../components/functionButton";
import { Appheader } from "../components/appheader";

export const Signin = () => {
  const {
    setEmail,
    setPassword,
    loading,
    error,
    emailError,
    passwordError,
    handleSignin,
  } = useSignin();

  return (
    <div className="bg-[url('https://wallpapercave.com/wp/wp3260428.jpg')] object-fill h-screen">
      <div>
        <Appheader></Appheader>
        <div className="flex items-center justify-center pt-24">
          <div className="w-[528px] p-12 rounded-lg mb-[120px]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                PLACEMENT ASSISTANT
              </h1>
            </div>

            <div className="space-y-6 flex">
              <div>email</div>
              <InputBox
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
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

export default Signin;