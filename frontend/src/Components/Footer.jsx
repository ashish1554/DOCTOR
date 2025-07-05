

import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between px-6 md:px-10 py-10 md:py-20 gap-8 md:gap-0'>
        {/* Left Section */}
        <div className='flex flex-col items-start gap-4 md:gap-6 md:w-1/2'>
          <img src={assets.logo} alt='Logo' className='w-32 md:w-40' />
          <p className='text-gray-600 text-sm md:text-base'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Center Section */}
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-gray-600 mb-3'>COMPANY</p>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>Home</ul>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>About Us</ul>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>Contact Us</ul>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>Privacy Policy</ul>
        </div>

        {/* Right Section */}
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-gray-600 mb-3'>GET IN TOUCH</p>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>+1-212-456-7890</ul>
          <ul className='text-gray-600 cursor-pointer hover:text-gray-800'>greatstackdev@gmail.com</ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright © 2024 GreatStack - All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
