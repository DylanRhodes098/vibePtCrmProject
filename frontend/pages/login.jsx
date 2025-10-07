import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as userLogin } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setErr("");
        try {
            const data = await userLogin({ email, password });
            if (data?.token) {
                sessionStorage.setItem("authToken", data.token);
                if (data?.id) sessionStorage.setItem("id", data.id);
            }
            navigate("/", { replace: true });
        } catch (error) {
            const message = error?.response?.data?.error || "Invalid credentials";
            setErr(message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        New here?{' '}
                        <Link className="text-blue-600 hover:text-blue-500" to="/register">Create an account</Link>
                    </p>
                </div>

                <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
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
                            autoComplete="current-password"
                        />
                    </div>

                    {err ? (
                        <p className="text-sm text-red-600">{err}</p>
                    ) : null}

                    <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
