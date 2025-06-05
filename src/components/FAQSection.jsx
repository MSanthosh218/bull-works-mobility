import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional, for icons

const faqs = [
  {
    question: 'Does Electric Tractor have same pull and torque as diesel Tractor?',
    answer: 'The Electric Tractor has more torque, high efficiency and best-in-class drawbar pull compared to conventional diesel Tractor.',
  },
  {
    question: 'What is the expected battery life of Bullwork vehicles?',
    answer: 'Bullwork vehicles are designed to last for years with robust battery systems; typical life is over 2000 charging cycles.',
  },
  {
    question: 'Can standard implements be attached with Vamana, GLX, and the Electric Tractor models?',
    answer: 'Yes, all Bullwork tractor models are compatible with standard agricultural implements.',
  },
  {
    question: 'How do you charge Bullwork vehicles?',
    answer: 'You can charge Bullwork vehicles using a standard 16A socket or dedicated EV chargers.',
  },
  {
    question: 'How long does Bullwork vehicles run on one single charge?',
    answer: 'Depending on the load, Bullwork vehicles can run up to 8–10 hours on a full charge.',
  },
  {
    question: 'How do I get my Bullwork vehicles serviced?',
    answer: 'You can contact our service team via website or call the service helpline for on-site servicing.',
  },
  {
    question: 'Can we?',
    answer: 'Yes, we can.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); 
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-center py-4 px-2 md:px-20">
      <h2 className="text-center text-4xl font-semibold font-stretch-50% uppercase text-gray-900 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-purple-700 py-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-2xl font-medium text-black focus:outline-none"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-10 w-7 font-bold text-2xl text-purple-700" />
              ) : (
                <ChevronDown className="h-10 w-7 font-bold text-2xl text-purple-700" />
              )}
            </button>
            {openIndex === index && (
              <div className="mt-3 text-purple-800 text-xl font-semibold">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {/* View More Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/Qna"
            className="px-3 py-2 bg-gradient-to-l from-[#57115E] to-[#A100B1]  text-white text-lg font-semibold rounded-md hover:bg-purple-800 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
