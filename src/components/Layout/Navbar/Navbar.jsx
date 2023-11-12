import React from 'react';
import InfoButton from './InfoButton';

export default function Navbar() {
  return (
    <div className='absolute w-full border-t-4 border-orange-500 bg-white'>
      <div className='border-b border-gray-300 flex justify-between max-w-6xl mx-auto'>
        <span className='py-4 px-4 text-2xl font-semibold text-orange-500'>
          Warewe Consultancy Private Limited Assignment - Divij Katyal
        </span>
        <InfoButton />
      </div>
    </div>
  );
}
