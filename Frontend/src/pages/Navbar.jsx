import { useState } from 'react'
import DesktopNav from '../components/DesktopNavbar';
import logoImg from "../assets/Logo.png";
import MobileNav from '../components/MobileNav';
function Navbar() {
    const [hideLeft,setHideLeft] = useState("-left-[1000px]");
    const menuItems = ["appointment","lawyers","about","contact",];

    const onOpen=()=>{
        setHideLeft("left-0");
    }
    const onClose = ()=>{
        setHideLeft("-left-[1000px]");
    }
    return (
        <>
            <div className='max-[900px]:hidden'>
                <DesktopNav menuItems={menuItems} logo={logoImg}/>
            </div>
            <div className='min-[900px]:hidden'>
                <MobileNav menuItems={menuItems} logo={logoImg} onClose={onClose} hideLeft={hideLeft} onOpen={onOpen}/>
            </div>
        </>
    )
}

export default Navbar

