import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AppointmentForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [lawyer, setLawyer] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState("");

    const navigateTo = useNavigate();

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

    const [lawyers, setLawyers] = useState([]);
    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/user/lawyers", { withCredentials: true });
                setLawyers(data.lawyers);
            } catch (error) {
                console.error("Error fetching lawyers:", error);
                // Handle error fetching lawyers (e.g., show error toast)
                toast.error("Failed to fetch lawyers. Please try again later.");
            }
        };
        fetchLawyers();
    }, []);

    const filteredLawyers = lawyers.filter(lawyer => lawyer.lawyerDepartment === department);

    const handleAppointment = async (e) => {
        e.preventDefault();
        try {

            const [lawyerFirstName, lawyerLastName] = lawyer.split(" ");
            const visited = hasVisited === "Yes";

            const appointmentData = {
                firstName,
                lastName,
                phone,
                email,
                dob,
                gender,
                appointment_date: appointmentDate,
                department,
                address,
                lawyer_firstName: lawyerFirstName,
                lawyer_lastName: lawyerLastName,
                hasVisited: visited
            };

            const { data } = await axios.post("http://localhost:4000/api/v1/appointment/book", appointmentData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success(data.message);
            navigateTo("/"); // Redirect to homepage after successful booking
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-600 px-4">
            <div className="bg-white p-4 md:p-16 rounded-lg shadow-lg max-w-5xl w-full mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Book An Appointment</h2>
                <p className="mb-6 text-center">Fill all the details mentioned below to book an appointment with your Lawyer.</p>
                <form onSubmit={handleAppointment}>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointmentDate">
                                Appointment Date
                            </label>
                            <input
                                type="date"
                                id="appointmentDate"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                Department
                            </label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => {
                                    setDepartment(e.target.value);
                                    setLawyer("");
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lawyer">
                                Select Lawyer
                            </label>
                            <select
                                id="lawyer"
                                value={lawyer}
                                onChange={(e) => setLawyer(e.target.value)}
                                disabled={!department}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Lawyer</option>
                                {filteredLawyers.map((lawyer, index) => (
                                    <option key={index} value={`${lawyer.firstName} ${lawyer.lastName}`}>
                                        {lawyer.firstName} {lawyer.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hasVisited">
                                Have you visited us before?
                            </label>
                            <select
                                id="hasVisited"
                                value={hasVisited}
                                onChange={(e) => setHasVisited(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full py-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            id="address"
                            rows="4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Book Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm;
