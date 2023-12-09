// CenterContent.tsx
import React from 'react';
import './HeaderSecondChild.css'

const CenterContent: React.FC = () => {
  return (
    <div className="container text-black text-center mt-4">
        <div className='cont2'>
      <div className=" first-child text-sm   mb-2"><span className='H'>How it works</span> <span className='T'>Track my parcel</span> </div>
      <div className="second-child items-center justify-end">
        
        <div className="mr-4 cursor-pointer">🔍</div>
        <div className="Help pmr-4">Need help?</div>
        <div className="profile mr-4">Profile</div>
        <div>Login</div>
      </div>
      </div>
    </div>
  );
};

export default CenterContent;
