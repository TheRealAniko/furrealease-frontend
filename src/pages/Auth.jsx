import { useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router";
import { toastSuccess } from "../utils/toastHelper.js";
import {
    Mail,
    KeyRound,
    User,
    Hospital,
    Syringe,
    AlarmClock,
} from "lucide-react";
import { signup, signin } from "../data/auth.js";
import { useAuth } from "../context/index.js";
import Cat from "../assets/Cat.svg";
import Dog from "../assets/Dog.svg";
import Rabbit from "../assets/Rabbit.svg";

const Auth = () => {
    const [searchParams] = useSearchParams();
    const defaultIsSignUp = searchParams.get("signup") === "true";
    const { isAuthenticated, setCheckSession, setIsAuthenticated } = useAuth();
    const [isSignUp, setIsSignUp] = useState(defaultIsSignUp);
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
                toastSuccess(res.success);
                resetForm();
                setIsSignUp(false);
                // setTimeout(() => navigate("/auth"), 500);
                return;
            } catch (err) {
                console.error(err);
                setError(err.message || "Sign Up failed. Try again.");
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
                toastSuccess(res.success);
            } catch (err) {
                console.error(err);
                setError(err.message || "Sign In failed. Try again.");
            } finally {
                setLoading(false);
            }
        }
    };
    if (isAuthenticated) return <Navigate to="/dashboard" />;

    return (
        <>
            <div className="flex flex-col justify-center text-center py-16 w-full mx-auto max-w-screen-xs">
                {/* Auth Container */}
                <div className="card-container">
                    <div>
                        <h2 className="h2-section">
                            {isSignUp ? "Create your account" : "Sign In"}
                        </h2>
                    </div>
                    <form
                        className="my-5 mx-auto flex flex-col gap-3"
                        onSubmit={handleSubmit}>
                        {isSignUp && (
                            <>
                                {/* Input for SignUp */}
                                <label className="input-wrapper flex items-center gap-2">
                                    <User className="text-neutral700" />
                                    <input
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleChange}
                                        type="text"
                                        className="input-field"
                                        placeholder="First Name"
                                    />
                                </label>
                                <label className="input-wrapper flex items-center gap-2">
                                    <User className="text-neutral700" />
                                    <input
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleChange}
                                        type="text"
                                        className="input-field"
                                        placeholder="Last Name"
                                    />
                                </label>
                            </>
                        )}
                        <label className="input-wrapper flex items-center gap-2">
                            <Mail className="text-neutral700" />
                            <input
                                name="email"
                                value={email}
                                onChange={handleChange}
                                type="email"
                                className="input-field"
                                placeholder="Email"
                            />
                        </label>
                        <label className="input-wrapper flex items-center gap-2">
                            <KeyRound className="text-neutral700" />
                            <input
                                name="password"
                                value={password}
                                onChange={handleChange}
                                type="password"
                                className="input-field"
                                placeholder="Password"
                            />
                        </label>
                        {isSignUp && (
                            <>
                                {/* Input for SignUp */}
                                <label className="input-wrapper flex items-center gap-2">
                                    <KeyRound className="text-neutral700" />
                                    <input
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        type="password"
                                        className="input-field"
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
            </div>
        </>
    );
};

export default Auth;
