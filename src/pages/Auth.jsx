import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { Mail, KeyRound, User } from "lucide-react";
import { signup, signin } from "../data/auth.js";
import { useAuth } from "../context/index.js";

const Auth = () => {
    const { isAuthenticated, setCheckSession, setIsAuthenticated } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();

    // const navigate = useNavigate();
    // const [checkSession, setCheckSession] = useState(true);

    const [{ firstName, lastName, email, password, confirmPassword }, setForm] =
        useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

    const resetForm = () =>
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isSignUp) {
            try {
                if (
                    // 🔐 SIGNUP-LOGIK
                    !firstName ||
                    !lastName ||
                    !email ||
                    !password ||
                    !confirmPassword
                )
                    throw new Error("All fields are required");
                if (password !== confirmPassword)
                    throw new Error("Passwords do not match");
                setLoading(true);
                const res = await signup({
                    firstName,
                    lastName,
                    email,
                    password,
                });
                // setIsAuthenticated(true);
                // setCheckSession(true);
                toast.success(res.success);
                resetForm();
                setIsSignUp(false);
                // setTimeout(() => navigate("/auth"), 500);
                return;
            } catch (err) {
                console.error(err);
                setError(err.message || "Sign Up failed. Try again.");
                toast.error(err.message || "Sign Up failed. Try again.");
            } finally {
                setLoading(false);
            }
        } else {
            try {
                // 🔑 SIGNIN-LOGIK
                if (!email || !password)
                    throw new Error("All fields are required");
                setLoading(true);
                const res = await signin({ email, password });
                setIsAuthenticated(true);
                setCheckSession(true);
                toast.success(res.success);
            } catch (err) {
                console.error(err);
                setError(err.message || "Sign In failed. Try again.");
                toast.error(err.message || "Sign In failed. Try again.");
            } finally {
                setLoading(false);
            }
        }
    };
    if (isAuthenticated)
        return <Navigate to={location.state?.next || "/dashboard"} />;

    return (
        <div className="card-container">
            <div>
                <h2>{isSignUp ? "Create your account" : "Sign In"}</h2>
            </div>
            <form
                className="my-5 md:w-1/2 mx-auto flex flex-col gap-3"
                onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        {/* Input for SignUp */}
                        <label className="input flex items-center gap-2">
                            <User className="text-neutral700" />
                            <input
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                                type="text"
                                className="grow font-light text-base"
                                placeholder="First Name"
                            />
                        </label>
                        <label className="input flex items-center gap-2">
                            <User className="text-neutral700" />
                            <input
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                                type="text"
                                className="grow font-light text-base"
                                placeholder="Last Name"
                            />
                        </label>
                    </>
                )}
                <label className="input flex items-center gap-2">
                    <Mail className="text-neutral700" />
                    <input
                        name="email"
                        value={email}
                        onChange={handleChange}
                        type="email"
                        className="grow font-light text-base"
                        placeholder="Email"
                    />
                </label>
                <label className="input flex items-center gap-2">
                    <KeyRound className="text-neutral700" />
                    <input
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        className="grow font-light text-base"
                        placeholder="Password"
                    />
                </label>
                {isSignUp && (
                    <>
                        {/* Input for SignUp */}
                        <label className="input flex items-center gap-2">
                            <KeyRound className="text-neutral700" />
                            <input
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                type="password"
                                className="grow font-light text-base"
                                placeholder="Confirm your password..."
                            />
                        </label>
                    </>
                )}

                <small className="text-center">
                    {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Sign In" : "Create One"}
                    </button>
                </small>

                {error && (
                    <p className="text-error text-sm text-center mt-2">
                        {error}
                    </p>
                )}

                <button
                    className="btn btn-primary self-center"
                    disabled={loading}>
                    {isSignUp ? "Create Account" : "Log In"}
                </button>
            </form>
        </div>
    );
};

export default Auth;
