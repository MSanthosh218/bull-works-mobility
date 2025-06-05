import React from 'react';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const AboutUs = () => { // Renamed from About to AboutUs
  // Data for co-founders, now including LinkedIn URLs
  const coFounders = [
    {
      name: 'Hemanth Kumar',
      title: 'CEO',
      img: 'https://www.bullworkmobility.com/aboutus/hemanth.webp',
      linkedinUrl: 'https://www.linkedin.com/in/hemanth-kumar-30a07b85/'
    },
    {
      name: 'Dr. Sriharsha Sheshanarayana',
      title: 'CTO',
      img: 'https://www.bullworkmobility.com/aboutus/harsha.webp',
      linkedinUrl: 'https://www.linkedin.com/in/sriharsha-sheshanarayana-23091910/' // Example LinkedIn for Dr. Sriharsha
    },
    {
      name: 'Vinay Raghuram',
      title: 'COO',
      img: 'https://www.bullworkmobility.com/aboutus/vinay.webp',
      linkedinUrl: 'https://www.linkedin.com/in/vinay-raghuram-b5b7b919/' // Example LinkedIn for Vinay
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Top Banner */}
        <section className="bg-white py-0"> {/* Removed py-12 as image handles vertical space */}
          <div>
            <img
              src="https://www.bullworkmobility.com/aboutus/teampic.webp"
              className="w-full h-[400px] md:h-[737px] object-cover mb-6"
              alt="Team Banner"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/1200x600/cccccc/000000?text=Team+Banner+Image`; }}
            />
          </div>
          <div className="max-w-6xl mx-auto px-4 text-center py-8"> {/* Added py-8 for spacing */}
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
              WE WANT TO CHANGE THE WORLD,<br />
              WE THINK WE ARE CRAZY ENOUGH TO DO IT
            </h1>
          </div>
        </section>

        {/* Guiding Partner */}
        <section className="bg-[#f5f0f9] py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-semibold mb-8">
              OUR GUIDING PARTNER
            </h2>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12">
              <img
                src="https://www.bullworkmobility.com/aboutus/mahesh%20shetty.webp"
                alt="Mr. Mahesh Shetty"
                className="w-[300px] md:w-[350px] rounded shadow-lg" // Added shadow for better visual
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/350x350/cccccc/000000?text=Mahesh+Shetty`; }}
              />
              <div className="text-left max-w-md">
                <h3 className="text-xl md:text-2xl font-bold mb-2">MR. MAHESH SHETTY</h3>
                <p className="text-gray-700 leading-relaxed">
                  Joining in our journey to change the landscape of utility vehicles:
                  Multiplex Group has been our guiding partner with Mr. Mahesh Shetty
                  donning the role of Chairman to take the organization to its next level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Co-founders */}
        <section className="bg-white text-center py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">OUR CO-FOUNDERS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coFounders.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center"> {/* Added flex-col and items-center for consistent alignment */}
                <img
                  src={person.img}
                  alt={person.name}
                  className="mx-auto rounded-lg shadow-md h-64 w-64 object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/256x256/cccccc/000000?text=${person.name.replace(/ /g, '+')}`; }}
                />
                <h3 className="mt-4 font-semibold text-lg">{person.name}</h3>
                <p className="font-bold text-gray-600">{person.title}</p> {/* Added text-gray-600 for consistency */}
                {person.linkedinUrl && ( // Conditionally render LinkedIn link if URL exists
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer" // Important for security
                    className="mt-2"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/174/174857.png" // Using a generic LinkedIn icon
                      alt="LinkedIn"
                      className="w-6 h-6 hover:opacity-75 transition-opacity duration-200" // Added hover effect
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/24x24/cccccc/000000?text=LI`; }}
                    />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* R&D Facility Intro */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR R&D FACILITY</h2>
            <p className="max-w-2xl mx-auto text-gray-700 text-lg">
              Driving the forefront of technological advancement, Our R&D facility is located in Nelamangala, Bangalore where ideas are transformed into reality
            </p>
          </div>
        </section>

        {/* R&D Image Layout */}
        <section className="bg-white py-10 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Left tall image */}
            <div className="h-[700px]">
              <img
                src="https://www.bullworkmobility.com/facility/facility3.webp"
                alt="Welding"
                className="w-full h-full object-cover rounded-xl shadow-md"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/400x700/cccccc/000000?text=Facility+Image+3`; }}
              />
            </div>

            {/* Right stacked images */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="h-[345px]">
                <img
                  src="https://www.bullworkmobility.com/facility/facility1.webp"
                  alt="Factory"
                  className="w-full h-full object-cover rounded-xl shadow-md"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/800x345/cccccc/000000?text=Facility+Image+1`; }}
                />
              </div>
              <div className="h-[345px]">
                <img
                  src="https://www.bullworkmobility.com/facility/facility2.webp"
                  alt="Team"
                  className="w-full h-full object-cover rounded-xl shadow-md"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/800x345/cccccc/000000?text=Facility+Image+2`; }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <CTASection />
      <Footer />
    </>
  );
};

export default AboutUs; // Renamed export
