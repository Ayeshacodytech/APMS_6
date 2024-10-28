import { InputBox } from "../components/inputBox";
import { PasswordBox } from "../components/passwordBox";
import { FunctionButton } from "../components/functionButton";
import { useSignup } from "../hooks/useSignup";

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
        <div
            className="h-screen flex justify-center items-center"
            style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #3074f4 100%)",
            }}
        >
            <div className="bg-slate-300 w-[528px] p-12 rounded-lg mb-[120px]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        WELCOME TO TPGIT
                    </h1>
                </div>

                <div className="space-y-6">
                    <InputBox
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <div className="text-red-500">{nameError}</div>}
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
                    onClick={handleSignup}
                    label={loading ? "Signing up..." : "Sign up"}
                    disabled={loading}
                />
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Sign in.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;