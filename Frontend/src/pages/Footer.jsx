
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

import logoImage from "../assets/Logo.png";
export default function FooterSection() {
    return (
        <Footer className="">
            <div className="w-full bg-[#8d99ae] p-8">
                <FooterDivider/>
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <FooterBrand
                            href="/"
                            src={logoImage}
                            alt="Logo"
                            className="h-20 w-20"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title="about" />
                            <FooterLinkGroup col>
                                <FooterLink href="/about">About Us</FooterLink>
                                <FooterLink href="/">Privacy Policy</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Follow us" />
                            <FooterLinkGroup col>
                                <FooterLink href="https://github.com/pushkarPrakash7">Github</FooterLink>
                                <FooterLink href="https://www.linkedin.com/in/pushkar-prakash-6948a2228/">LinkedIn</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink href="/appointment">Book An Appointment</FooterLink>
                                <FooterLink href="/">Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:flex sm:items-center sm:justify-between ">
                    <FooterCopyright href="#" by="LegalEase™" year={2024} className="my-4 md:my-0" />
                    <div className="pt-6 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                        <FooterIcon href="#" icon={BsGithub} />
                        <FooterIcon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
