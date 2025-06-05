import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const controlOptions = [
  {
    title: 'Control through Remote',
    description:
      'The vehicle features a remote control, enabling you to manage its movements, including steering, accelerating, and braking, all from a distance for added convenience and control.',
    image: '/assets/images/control1.png',
  },
  {
    title: 'Control through App',
    description:
      'The vehicle can be controlled through a user-friendly mobile app, offering remote access and autonomous features.',
    image: '/assets/images/control2.png',
  },
  {
    title: 'Control through Draw-wire',
    description:
      'The vehicle, featuring a new and innovative tethered control system, operates seamlessly through a wired connection for easy control.',
    image: '/assets/images/control3.png',
  },
];

export default function ControlSystemSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gray-50 py-10 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900">
          DISCOVER BULLWORK'S CONTROL SYSTEM
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Bullwork offers a variety of unique control options tailored to their vehicles
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {controlOptions.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between p-6 ${
              idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
            data-aos="fade-up"
          >
            {/* Text */}
            <div className="md:w-[70%]">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-black">
                {item.title}
              </h3>
              <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Image */}
            <div className="w-[400px] h-[350px] mt-4 md:mt-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
