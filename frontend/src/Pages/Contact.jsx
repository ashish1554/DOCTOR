

import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-gray-500 text-center text-2xl pt-10'>
        <p>
          CONTACT <span className='text-gray-700 font-bold'>US</span>
        </p>
      </div>

      {/* Content Section */}
      <div className='flex flex-col md:flex-row items-center md:items-start gap-5 mt-10'>
        {/* Image Section */}
        <div className='flex justify-center md:justify-start'>
          <img
            className='w-[300px] md:w-[500px] p-5 md:p-14 md:ml-5'
            src={assets.about_image}
            alt=''
          />
        </div>

        {/* Text Section */}
        <div className='flex flex-col gap-5 text-gray-500 px-5 md:px-0 md:mt-28'>
          <p className='font-bold text-gray-700'>OUR OFFICE</p>
          <p className='text-sm'>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className='text-sm'>
            Tel: (415)555‑0132 <br />
            Email: greatstackdev@gmail.com
          </p>
          <p className=' text-gray-700 font-bold'>Careers at PRESCRIPTO</p>
          <p className='text-sm'>
            Learn more about our teams and job openings.
          </p>
          <button className='text-xs rounded-md border-2 border-gray-600 p-3 w-1/2 hover:bg-primary hover:text-white'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
