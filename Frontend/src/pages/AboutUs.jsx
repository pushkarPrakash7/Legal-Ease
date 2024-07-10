import LegalStatementImg from "../assets/LegalStatement.png";
import clientLawyerImg from "../assets/clientLawyer.png";

function AboutUs() {
    return (
        <section className="bg-slate-500 min-h-screen text-white ">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:pt-24 lg:pb-2 lg:flex-row lg:justify-between lg:space-x-4">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left lg:flex-shrink-0 my-8 lg:ml-16">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl my-4">
                        Dedicated to <span className="text-primary">Excellence</span>
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">
                        Our mission is to provide unparalleled legal services and support to our clients.
                        With a focus on professionalism, integrity, and efficiency, we strive to achieve
                        the best outcomes for those we serve. Whether you need legal advice, representation, or consultancy, our team is here to help.
                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <a rel="noopener noreferrer" href="/" className="px-8 py-3 text-lg font-semibold rounded bg-primary">
                            Learn More
                        </a>
                        <a rel="noopener noreferrer" href="/contact" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-[540px] xl:h-112 2xl:h-128 lg:mr-16">
                    <img src={LegalStatementImg} alt="Legal Statement" className="object-contain h-72 sm:h-80 lg:h-[540px] xl:h-112 2xl:h-128 animate-move-up-down" />
                </div>
            </div>

            <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:space-x-4">
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-[540px] xl:h-112 2xl:h-128">
                    <img src={clientLawyerImg} alt="Client and Lawyer" className="object-contain h-72 sm:h-80 lg:h-[540px] xl:h-112 2xl:h-128 animate-move-up-down" />
                </div>
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left lg:flex-shrink-0">
                    <h2 className="text-3xl font-bold leading-none sm:text-4xl">
                        Our <span className="text-primary">Commitment</span>
                    </h2>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">
                        We are committed to delivering personalized and high-quality legal services.
                        Our team of experienced professionals works collaboratively to ensure every client
                        receives the attention and support they deserve. Your success is our priority.
                        Let us help you navigate your legal challenges with confidence.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
