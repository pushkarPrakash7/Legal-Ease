import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import contactImg from "../assets/contactImage.gif";
import { FaHome } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";

function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/message/send",
                { firstName, lastName, email, phone, message },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(res.data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while sending your message. Please try again.");
            }
        }
    };

    return (
        <div className="bg-[#8d99ae] py-8 px-4 md:px-16 lg:px-24">
            <h2 className="mt-16 text-center text-white font-semibold text-3xl pb-8">Contact Us for your queries</h2>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between max-w-screen-lg mx-auto">
                <form onSubmit={handleMessage} className="w-full lg:w-1/2 order-2 lg:order-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            className="w-full p-2 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            className="w-full p-2 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            className="w-full p-2 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full p-2 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            className="w-full p-2 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={7}
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-primary text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-primary-dark transition duration-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 order-1 lg:order-2 md:ml-16 md:flex flex-col md:relative">
                    <img src={contactImg} alt="Contact Us" className="w-full h-auto md:ml-16 z-10" />
                    <div className="border-4 border-gray-600 p-4 md:absolute hover:z-20">
                        <h3 className="text-xl font-semibold text-gray-600 mb-4">Contact Info</h3>
                        <p className="text-gray-600 font-semibold">
                            LegalEase <br />
                            <div className="flex gap-2 justify-center items-center mt-4">
                                <FaHome />
                                < br />
                                <div>
                                    123 Main St <br />
                                    City, State 12345 <br />
                                    USA <br />
                                </div>
                            </div>
                            <div className="flex mt-4 items-center gap-2">
                                <IoIosCall />
                                <a href="tel:123-456-7890">123-456-7890</a> <br />
                            </div>
                            <div className="flex mt-4 items-center gap-2 justify-center">
                                <IoMdMail />
                                <a href="mailto:info@example.com">info@example.com</a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
