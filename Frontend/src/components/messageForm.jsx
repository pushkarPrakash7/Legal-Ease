import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MessageForm() {
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
        <div className="mt-16 bg-[#8d99ae] py-8 px-4 md:px-16 lg:px-24">
            <h2 className="text-center text-white font-semibold text-3xl pb-8">Send Us A Message</h2>
            <form onSubmit={handleMessage} className="max-w-4xl mx-auto">
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
        </div>
    );
}

export default MessageForm;
