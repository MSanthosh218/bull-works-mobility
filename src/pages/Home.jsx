import React from 'react'
import MainHome from '../components/MainHome'
import ResponsiveSlider from '../components/ResponsiveSlider'
import DiscoverSection from '../components/DiscoverSection'
import BhaiSection from '../components/BhaiSection'
import Blog from '../components/Blogs'
import RotatingImageCarousels from '../components/RotatingImageCarousels'
import GreenerBharath from '../components/GreenerBharath'
import EventsShowcase from '../components/EventsShowcase'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'





const Home = () => {
  return (
    <>
        <MainHome />
        <div className="min-h-[50vh] z-0 bg-gray-50 p-4">
            <ResponsiveSlider />
        </div>
        <DiscoverSection />
        <BhaiSection />
        <Blog />
        <RotatingImageCarousels />
        <GreenerBharath />
        <EventsShowcase />
        <FAQSection />
        <CTASection />
        <Footer />
      
        
    </>
    
    
  )
}

export default Home