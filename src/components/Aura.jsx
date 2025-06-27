import React from 'react'

const Aura = () => {
  return (
    <div className='relative min-h-screen bg-[#001446]'>
      {/* <div className='bg-[#3B51A6] w-[800px] h-[800px] rounded-full absolute top-[-10%] left-[10%] rotate-animation  blur-[70px] opacity-30'></div>
      <div className='bg-[#778FCD] w-[1000px] h-[1000px] rounded-full absolute top-[-8%] right-[-15%] auroraFlow-animate  text-white blur-[40px] opacity-30'></div> */}
      <div className='blobify-animation w-[150px] h-full blur-3xl opacity-20 bg-white absolute bottom-0 right-[100px] -rotate-12 rounded-3xl'></div>
      <div className='blobify-animation w-[150px] h-full blur-3xl opacity-20 bg-white absolute top-0 right-[360px] -rotate-12 rounded-3xl'></div>
      <div className='blobify-animation w-[150px] h-full blur-3xl opacity-20 bg-white absolute top-0 right-[590px] -rotate-12 rounded-3xl'></div>
    </div>
  )
}

export default Aura