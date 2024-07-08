import LawyerImg from "../assets/Hero.png";

function Hero() {
    return (
        <div className="mt-12">
            <h1 className="text-secondary text-3xl md:text-5xl lg:text-6xl text-center font-semibold">What makes us different</h1>
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                        <img src={LawyerImg} className="w-full md:w-auto mx-auto lg:p-8" alt="Lawyer" />
                    </div>
                    <div className="text-center md:text-left md:mt-16 lg:mt-0">
                        <div className="shadow-2xl rounded-br-2xl mb-4 p-4 mr-12">
                            <h1 className="text-primary text-lg font-semibold mb-4">Search and Match with Lawyers</h1>
                            <p className="md:mb-6">LegalEase allows users to search for lawyers based on their specific legal needs, such as family law, business disputes, personal injury, etc. Users can input their requirements and preferences, and LegalEase matches them with suitable lawyers who specialize in those areas. </p>

                        </div>
                        <div className="shadow-2xl rounded-br-2xl mb-4 p-4 ml-12 mt-12 md:mt-none">
                            <h1 className="text-primary text-lg font-semibold mb-4">Online Appointment Booking</h1>
                            <p className="md:mb-6">LegalEase facilitates the booking of appointments with lawyers directly through its platform. Users can view the availability of lawyers, select convenient time slots, and schedule appointments online. </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Hero;
