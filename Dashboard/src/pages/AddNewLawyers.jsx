import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImage from "../assets/LogoDark.png";
import axios from "axios";
import ProfilePreview from "../assets/Profile.webp";

function AddNewLawyers() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [lawyerDepartment, setLawyerDepartment] = useState("");
    const [lawAvatar, setLawAvatar] = useState("");
    const [lawAvatarPreview, setLawAvatarPreview] = useState("");

    const navigateTo = useNavigate();

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLawAvatarPreview(reader.result);
            setLawAvatar(file);
        };
    }

    const handleAddNewLawyer = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("password", password);
            formData.append("lawyerDepartment", lawyerDepartment);
            formData.append("lawAvatar", lawAvatar);

            await axios.post(
                "http://localhost:4000/api/v1/user/lawyer/addnew",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            ).then((res) => {
                toast.success(res.data.message);
                navigateTo("/");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setDob("");
                setGender("");
                setPassword("");
                setLawyerDepartment("");
                setLawAvatar("");
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    const departmentArray = [
        "Criminal Law",
        "Civil Law",
        "Family Law",
        "Property Law",
        "Environmental Law",
        "Labor Law",
        "Corporate Law",
        "Tax Law",
        "Hindu Law",
        "Muslim Law",
    ];

    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 py-14 px-4 md:px-4 md:ml-64 relative">
            <img src={logoImage} className="h-20 absolute lg:top-20 lg:left-60 md:top-14 md:left-10 -top-8 right-8" alt="Logo" />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Register a New Lawyer</h2>
                <p className="mb-6 text-center">Fill the details below to register a new Lawyer.</p>
                <form onSubmit={handleAddNewLawyer}>
                    <div className="mb-4 flex flex-col items-center">
                        <img
                            src={lawAvatarPreview || ProfilePreview}
                            alt="lawyer preview"
                            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover mb-4"
                        />
                        <input
                            type="file"
                            onChange={handleAvatar}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                    </div>
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
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                Department
                            </label>
                            <select
                                id="department"
                                value={lawyerDepartment}
                                onChange={(e) => {
                                    setLawyerDepartment(e.target.value);
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Department</option>
                                {departmentArray.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Add New Lawyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewLawyers;
