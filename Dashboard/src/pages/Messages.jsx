/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../main.jsx"
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Messages() {
    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/message/getall', { withCredentials: true });
                setMessages(data.messages);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchMessages();
    }, []);

    if (!isAuthenticated && messages.length > 0) {
        return <Navigate to={"/login"} />
    }
    return (
        <div className="md:ml-64 max-w-screen h-full bg-gray-200 pb-8 ">
            <h1 className="uppercase text-3xl p-6 font-bold">Messages</h1>
            {
                messages.map((message) => (
                    <div key={message._id} className="p-2 md:p-4 border-b border-gray-100 bg-white m-4 rounded-xl">
                        <h1><spn className="font-semibold">Name: </spn>{message.firstName} {message.lastName}</h1>
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt />
                            <span>{message.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdMail />
                            <span>{message.email}</span>
                        </div>
                        <h2><span className="font-semibold">Message: </span> " {message.message}"</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default Messages
