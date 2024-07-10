import Hero from "../components/Hero.jsx";
import Biography from "../components/Biography.jsx";
import Department from "../components/Department.jsx";
import MessageForm from "../components/messageForm.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function Home() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return ( 
        <div>
            <Hero />
            <Biography />
            <Department/>
            <MessageForm />
        </div>
    )
}

export default Home
