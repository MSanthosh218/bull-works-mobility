// import React from 'react'
// import FrontPhoto from '../Tech-Componets/FrontPhoto'

// const Technology = () => {
//   return (
//     <>
//         <FrontPhoto />
//     </>
//   )
// }

// export default Technology

import React from 'react'
import Hero from '../Tech-Componets/Hero'
import AutomaticElectricVehicleSection from '../Tech-Componets/AutomaticElectricVehicleSection'
import ControlSystemSection from '../Tech-Componets/ControlSystemSection'
import FeatureSlider from '../Tech-Componets/FeatureSlider'
import FeatureSlider2 from '../Tech-Componets/FeatureSlider2'
import YouMayAlsoLike from '../Tech-Componets/YouMayAlsoLike'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const Technology = () => {
  return (
    <>
      <div className='mt-15'>
        <Hero />
        <AutomaticElectricVehicleSection />
        <ControlSystemSection />
        <FeatureSlider />
        <FeatureSlider2 />
        <YouMayAlsoLike />
        <CTASection />
        <Footer />
      </div>
    </>
    
  )
}

export default Technology