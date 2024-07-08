import Hero from "../components/Hero.jsx";
import Biography from "../components/Biography.jsx";
import Department from "../components/Department.jsx";
import MessageForm from "../components/messageForm.jsx";
function Home() {
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
