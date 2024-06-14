import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-[#ec9454] flex justify-around items-center text-white p-4 text-center mt-16 relative" id="ContactUs">

            <div className="m-5">
                <h2 className="font-bold">Contact Us</h2>
                <p>+1-9-781-155-2721</p>
                <p>+1-0-223-563-2562</p>
                <p>+1-5-658-082-7247</p>
            </div>

            <div className="m-5">
                <a href="#"
                    className="hover:text-blue-500"
                >
                    <h2 className="font-bold">Privacy Policy</h2>
                </a>
                <a href="#"
                    className="hover:text-blue-500"
                >
                    <h2 className="font-bold">Return and Refund Policy</h2>
                </a>
            </div>

            <div className="flex flex-col justify-center">
                <h2 className="font-bold mb-2">Stay in Touch</h2>
                <div className="flex flex-row">
                  <FaFacebook
                    className="cursor-pointer size-8 hover:text-black" 
                    href="#"
                />

                <FaInstagram 
                    className="cursor-pointer ml-4 size-8 hover:text-black" 
                    href="#"
                />

                <FaTiktok 
                    className="cursor-pointer ml-4 size-8 hover:text-black" 
                    href="#"
                />

                <FaYoutube 
                    className="cursor-pointer ml-4 size-8 hover:text-black" 
                    href="#"
                />  
                </div>
                
            </div>
        </div>
    )
}

export default Footer;