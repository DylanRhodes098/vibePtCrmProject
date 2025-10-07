import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as userRegister } from "../services/auth";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setErr("");
        try {
            await userRegister({ full_name: fullName, password, email });
            navigate("/login", { replace: true });
        } catch (error) {
            const message = error?.response?.data?.error || "Something went wrong";
            setErr(message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link className="text-blue-600 hover:text-blue-500" to="/login">Sign in</Link>
                    </p>
                </div>

                <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {err ? (
                        <p className="text-sm text-red-600">{err}</p>
                    ) : null}

                    <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
        
    
