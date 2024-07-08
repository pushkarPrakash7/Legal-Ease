import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Remove this if not needed for login

    const navigateTo = useNavigate();
    
    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/api/v1/user/login",{email,password,confirmPassword,role:"User"},{
                withCredentials: true,
                headers: {"Content-Type": "application/json"},
            });
            toast.success(response.data.message);
            navigateTo("/");
            setIsAuthenticated(true);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                    <div>
                        <p className="text-center">New to LegalEase? Register <Link to='/register' className="text-blue-500 underline">Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
