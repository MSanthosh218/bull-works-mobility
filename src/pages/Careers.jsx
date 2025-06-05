import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

// Get the backend URL from environment variables.
// Use 'import.meta.env.VITE_BACKEND_URL' if you are using Vite.
// Use 'process.env.REACT_APP_BACKEND_URL' if you are using Create React App.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

const Careers = () => {
  // State to control the visibility of the application modal
  const [showApplyModal, setShowApplyModal] = useState(false);

  // State for the new Apply form within the modal
  // Initialize position to an empty string
  const [applyForm, setApplyForm] = useState({ name: '', email: '', position: '' });
  const [submitApplyStatus, setSubmitApplyStatus] = useState(null); // 'success', 'error', 'submitting'
  const [submitApplyMessage, setSubmitApplyMessage] = useState('');

  // Function to handle changes in the modal's apply form inputs
  const handleApplyFormChange = (e) => {
    const { name, value } = e.target;
    setApplyForm(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle the submission of the modal's apply form
  const handleSubmitApply = async (e) => {
    e.preventDefault();
    setSubmitApplyStatus('submitting');
    setSubmitApplyMessage('');

    // Ensure BACKEND_URL is defined before attempting to fetch
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Check your .env file and environment variables.");
      setSubmitApplyStatus('error');
      setSubmitApplyMessage('Failed to submit application: Backend URL not configured.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/apply`, { // Replaced localhost
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applyForm), // applyForm now includes 'position'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setSubmitApplyStatus('success');
      setSubmitApplyMessage('Your application has been submitted successfully!');
      setApplyForm({ name: '', email: '', position: '' }); // Reset form including position
      // Optionally close modal after a short delay on success
      setTimeout(() => setShowApplyModal(false), 2000);
    } catch (err) {
      setSubmitApplyStatus('error');
      setSubmitApplyMessage(`Failed to submit application: ${err.message}`);
      console.error('Application submission error:', err);
    }
  };

  // Function to close the modal and reset its state
  const closeApplyModal = () => {
    setShowApplyModal(false);
    setApplyForm({ name: '', email: '', position: '' }); // Reset form including position
    setSubmitApplyStatus(null);
    setSubmitApplyMessage('');
  };

  // Image data for the initial "LIFE @ BULLWORK MOBILITY" gallery
  const mainImageData = [
    {
      id: 1,
      src: 'https://www.bullworkmobility.com/careers/life/life1.webp',
      alt: 'Team enjoying an outdoor activity',
      containerClass: 'w-full sm:w-1/2 p-1.5 md:p-2',
    },
    {
      id: 2,
      src: 'https://www.bullworkmobility.com/careers/life/life2.webp',
      alt: 'Productive team meeting in the office',
      containerClass: 'w-full sm:w-1/4 p-1.5 md:p-2',
    },
    {
      id: 3,
      src: 'https://www.bullworkmobility.com/careers/life/life3.webp',
      alt: 'A happy group photo of the team',
      containerClass: 'w-full sm:w-1/4 p-1.5 md:p-2',
    },
    {
      id: 4,
      src: 'https://www.bullworkmobility.com/careers/life/life4.webp',
      alt: 'Team building exercise',
      containerClass: 'w-full sm:w-1/4 p-1.5 md:p-2',
    },
    {
      id: 5,
      src: 'https://www.bullworkmobility.com/careers/life/life5.webp',
      alt: 'Team celebrating a milestone',
      containerClass: 'w-full sm:w-1/4 p-1.5 md:p-2',
    },
    {
      id: 6,
      src: 'https://www.bullworkmobility.com/careers/life/life6.webp',
      alt: 'Large company event photo',
      containerClass: 'w-full sm:w-1/2 p-1.5 md:p-2',
    },
  ];

  // Image data for the "BULLWORK GALLERY" marquee section
  const galleryImageData = [
    {
      id: 1,
      src: 'https://www.bullworkmobility.com/careers/gallery2.webp',
      alt: 'Team enjoying an outdoor activity',
      marqueeItemClass: 'w-96 h-110 p-6 flex-shrink-0',
    },
    {
      id: 2,
      src: 'https://www.bullworkmobility.com/careers/gallery3.webp',
      alt: 'Productive team meeting in the office',
      marqueeItemClass: 'w-86 h-110 p-6 flex-shrink-0',
    },
    {
      id: 3,
      src: 'https://www.bullworkmobility.com/careers/gallery4.webp',
      alt: 'A happy group photo of the team',
      marqueeItemClass: 'w-96 h-110 p-6 flex-shrink-0',
    },
    {
      id: 4,
      src: 'https://www.bullworkmobility.com/careers/gallery1.webp',
      alt: 'Team building exercise',
      marqueeItemClass: 'w-96 h-110 p-6 flex-shrink-0',
    },
    {
      id: 5,
      src: 'https://www.bullworkmobility.com/careers/gallery5.webp',
      alt: 'Team celebrating a milestone',
      marqueeItemClass: 'w-96 h-110 p-6 flex-shrink-0',
    },
    {
      id: 6,
      src: 'https://www.bullworkmobility.com/careers/gallery4.webp',
      alt: 'Large company event photo',
      marqueeItemClass: 'w-96 h-110 p-6 flex-shrink-0',
    },
  ];

  const duplicatedGalleryImageData = [...galleryImageData, ...galleryImageData];

  // Job data for the "Apply" section
  const jobs = [
    { title: 'Electrical Engineer', experience: '1-3 years experience' },
    { title: 'Finance and Accounting Intern', experience: 'Fresher' },
    { title: 'Electrical Intern', experience: 'Fresher' },
    { title: 'Graphic Design Intern', experience: 'Fresher' },
  ];

  // Function to scroll to a specific section (kept for other sections if needed)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen font-['Inter'] text-gray-800">
      {/* Global Marquee Animation Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite; /* Adjusted speed */
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section 1: LIFE @ BULLWORK MOBILITY (Original Careers content) */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide"> {/* Changed tracking-tight to tracking-wide */}
            <br /> {/* This br tag was in the original, keeping it */}
            LIFE @ BULLWORK MOBILITY
          </h1>
        </header>

        <div className="flex flex-wrap -m-1.5 md:-m-2">
          {mainImageData.map((image) => (
            <div key={image.id} className={image.containerClass}>
              <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/400x300/cccccc/000000?text=Image+Error`;
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: JOIN OUR AWESOME TEAM & BULLWORK GALLERY (Formerly from 'Life' component) */}
      <section id="life-at-bullwork" className="bg-white py-12 px-4"> {/* Added ID for scrolling */}
        <div className="max-w-7xl mx-auto">
          {/* Join Our Awesome Team */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide mb-4"> {/* Changed tracking-tight to tracking-wide */}
              JOIN OUR AWESOME TEAM
            </h2>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 mb-8">
              At Bullwork Mobility, we are on the lookout for individuals who are driven and dedicated to
              making a difference and contribute to the acceleration of innovative solutions in sustainable
              agriculture and construction.
            </p>
            <button
              onClick={() => {
                // When the general "Apply Now" button is clicked, clear any previous position
                setApplyForm(prev => ({ ...prev, position: '' }));
                setShowApplyModal(true);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          </div>

          {/* Bullwork Gallery */}
          <div>
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide mb-2"> {/* Changed tracking-tight to tracking-wide */}
                BULLWORK GALLERY
              </h2>
              <p className="text-lg sm:text-xl text-gray-500">
                A sneak peek into life at Bullwork Mobility
              </p>
            </header>

            <main className="my-12">
              <div className="w-full overflow-hidden px-4">
                <div className="flex flex-nowrap animate-marquee gap-x-8">
                  {duplicatedGalleryImageData.map((image, index) => (
                    <div key={`marquee-item-${image.id}-${index}`} className={image.marqueeItemClass}>
                      <div className="overflow-hidden rounded-xl shadow-lg w-full h-full">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            const parentWidth = e.target.parentElement.clientWidth || 256;
                            const placeholderHeight = Math.round(parentWidth * (9/16));
                            e.target.src = `https://placehold.co/${parentWidth}x${placeholderHeight}/F3F4F6/9CA3AF?text=Not+Found`;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Section 3: CURRENT OPEN POSITIONS */}
      <section id="current-open-positions" className="bg-gray-50 py-12 px-4"> {/* Added ID for scrolling */}
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-10 tracking-widest font-sans ">
            CURRENT OPEN POSITIONS
          </h1>

          {/* Job Cards */}
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 mb-5 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <h2 className="text-gray-600">{job.experience}</h2>
              </div>
              <button
                onClick={() => {
                  // Set the position in the form state before opening the modal
                  setApplyForm(prev => ({ ...prev, position: job.title }));
                  setShowApplyModal(true);
                }}
                className="bg-gradient-to-r from-fuchsia-600 to-purple-900 text-white font-semibold py-2 px-5 rounded-md hover:from-fuchsia-700 hover:to-purple-950"
              >
                Apply Now
              </button>
            </div>
          ))}

          {/* Mail CTA Section */}
          <div className="bg-white rounded-xl shadow-md p-10 text-center mt-12">
            <h1 className="text-lg font-semibold tracking-widest mb-2">
              THINK YOU HAVE WHAT IT TAKES TO INNOVATE WITH US?
            </h1>
            <p className="text-md font-semibold mb-6 tracking-wide">MAIL US AT</p>

            <div className="flex items-center justify-center">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 shadow-sm w-full max-w-md justify-between">
                <span className="text-sm md:text-base font-medium text-black">
                  jobs@bullworkmobility.com
                </span>
                <a
                  href={`mailto:jobs@bullworkmobility.com`}
                  className="bg-purple-800 hover:bg-purple-900 text-white p-2 rounded-md transition-colors"
                >
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-violet-900 bg-opacity-75 flex items-center justify-center z-50 p-4"> {/* Changed background to violet-900 */}
          <div className="bg-violet-50 rounded-lg shadow-xl p-8 max-w-md w-full relative"> {/* Changed modal background to violet-50 */}
            <h2 className="text-2xl font-bold text-center mb-6 text-violet-800">
              Apply for {applyForm.position ? applyForm.position : 'a Position'}
            </h2> {/* Updated title to reflect selected position */}
            <form onSubmit={handleSubmitApply} className="space-y-4">
              <div>
                <label htmlFor="modalName" className="block text-sm font-medium text-gray-700 sr-only">Your Name</label>
                <input
                  type="text"
                  id="modalName"
                  name="name"
                  value={applyForm.name}
                  onChange={handleApplyFormChange}
                  placeholder="Your Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="modalEmail" className="block text-sm font-medium text-gray-700 sr-only">Your Email</label>
                <input
                  type="email"
                  id="modalEmail"
                  name="email"
                  value={applyForm.email}
                  onChange={handleApplyFormChange}
                  placeholder="Your Email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              {/* If position is not pre-filled, allow user to input it */}
              {!applyForm.position && (
                <div>
                  <label htmlFor="modalPosition" className="block text-sm font-medium text-gray-700 sr-only">Position Applying For</label>
                  <input
                    type="text"
                    id="modalPosition"
                    name="position"
                    value={applyForm.position}
                    onChange={handleApplyFormChange}
                    placeholder="Position Applying For (e.g., Electrical Engineer)"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                    // Make it required if no position is pre-selected
                    required={!applyForm.position}
                  />
                </div>
              )}
              {/* Hidden input for position, automatically set when "Apply Now" is clicked for a specific job */}
              {applyForm.position && (
                <input type="hidden" name="position" value={applyForm.position} />
              )}


              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitApplyStatus === 'submitting'}
                >
                  {submitApplyStatus === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </div>
              {submitApplyStatus && (
                <div className={`mt-4 text-center p-3 rounded-md ${
                  submitApplyStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {submitApplyMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Global CTA and Footer */}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Careers;
