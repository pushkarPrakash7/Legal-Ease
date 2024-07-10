import { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    const navigateTo = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    "http://localhost:4000/api/v1/user/client/register",
                    { firstName, lastName, email, phone, dob, gender, password, role:"User" },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                )
                .then((res) => {
                    toast.success(res.data.message);
                    setIsAuthenticated(true);
                    navigateTo("/");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setDob("");
                    setGender("");
                    setPassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-500 py-28 px-4 md:px-0">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <p className="mb-6 text-center">Please Sign Up to Continue</p>
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Select Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold py-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <p className="my-4">Already Have an account! Click <Link to="/login" className="text-blue-500 underline">Here.</Link> to Login</p>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
