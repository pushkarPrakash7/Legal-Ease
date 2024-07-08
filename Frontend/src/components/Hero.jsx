import HeroImg from "../assets/Lawyer.png";

function Hero() {
    return (
        <div className="bg-[#324a5f]">
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left mt-16 lg:mt-0">
                        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold mb-4">Welcome to <span className="text-primary">LegalEase</span>! Your ultimate Legal Firm</h1>
                        <p className="text-white md:mb-6">Welcome to Legal Ease, your trusted platform for finding and booking appointments with experienced lawyers. We simplify the process of connecting you with top-rated attorneys who specialize in various legal matters, including family law, business disputes, and personal injury. Navigate your legal challenges with ease and confidence, knowing that expert advice and representation are just a few clicks away. Legal Ease is here to ensure you receive the justice and support you deserve.</p>
                    </div>
                    <div className="text-center">
                        <img src={HeroImg} className="w-full md:w-auto mx-auto  lg:animate-float lg:p-8" alt="Lawyer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
