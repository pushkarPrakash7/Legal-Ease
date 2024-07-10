import AppointmentForm from "../components/AppointmentForm";
import AppointmentImage from "../assets/appointmentImage.gif"
function Appointment() {
    return (
        <div>
            <div className="mx-auto p-6 lg:pt-12 flex flex-col lg:flex-row items-center justify-between bg-gray-600 min-h-screen w-full">
                <div className="text-center lg:text-left mb-8 lg:mb-0 lg:max-w-lg lg:ml-16 mt-24">
                    <h1 className="text-4xl font-bold mb-4 text-white"><span className="text-primary">Book An Apointment</span> With A Lawyer</h1>
                    <p className="text-md text-white">
                        LegalEase is your trusted platform for booking appointments with top-rated lawyers easily and efficiently. Our user-friendly interface ensures a seamless experience, allowing you to connect with legal professionals who specialize in your specific needs. Whether you require legal advice, representation, or consultation, our network of experienced lawyers is dedicated to providing personalized and expert legal services. At LegalEase, we prioritize your convenience and peace of mind, ensuring you receive the best legal support with just a few clicks.
                    </p>
                </div>
                <div className="flex flex-col items-center lg:items-start lg:mr-44">
                    <img src={AppointmentImage} alt="hero" className="w-full max-w-xs lg:max-w-md my-8 lg:my-0" />
                </div>
            </div>
            <AppointmentForm />
        </div>
    )
}

export default Appointment
