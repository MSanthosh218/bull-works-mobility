import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Contact Trigger Button */}
      <div
        className="contact_us fixed bottom-[10%] z-50 right-0 h-10 w-[50px] bg-white z-99 rounded-l-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src="/assets/chat-icon.png"
          alt="Chat"
          className="sticky-button w-12 h-12"
        />
      </div>

      {/* Contact Widget Box */}
      <div
        className={`c-d ${
          isOpen ? "block" : "hidden"
        } fixed bottom-[5%] right-0 w-[400px] max-w-[90%] bg-white rounded-md shadow-md z-10 transition-all`}
      >
        {/* Header */}
        <div className="contact-container flex justify-between items-center text-center w-full bg-[#EDEDED] p-2 rounded-t-md">
          <p className="contacttext text-[20px] font-bold tracking-[2px] px-2 m-0">
            Let’s Talk!
          </p>
          <IoMdClose
            className="cursor-pointer"
            size={25}
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="contact_text p-5 text-center">
          <p className="contactsubtext text-[16px] font-bold m-0">We’re here to help you grow.</p>
          <p className="contactsubtext1 text-[16px] font-bold m-0 mt-4">Contact us to get started!</p>
          <p className="contactsubtext2 text-[14px] font-bold pl-2 pt-1 m-0">
            Our team is ready to answer your questions and support your business.
          </p>

          {/* Buttons */}
          <button className="contact-button mt-4 w-[350px] max-w-full h-[45px] bg-gradient-to-t from-[#DD8401] to-[#FFA726] text-white font-bold rounded-full underline">
            Get in Touch
          </button>
          <button className="contact-button1 mt-2 w-[350px] max-w-full h-[45px] border border-black bg-white text-black font-bold rounded-full">
            Request a Callback
          </button>
        </div>

        {/* Footer Image or Icon Row */}
        <div className="contact_text1 bg-[#EDEDED] p-3 mt-2 flex items-center justify-center rounded-b-md">
          <div className="somosacross flex items-center">
            <img src="/logo-icon.png" alt="Logo" className="w-[15px] mr-2 cursor-pointer" />
            <span className="text-sm font-semibold">SomosAcross</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactWidget;
