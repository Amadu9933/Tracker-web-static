
import React from 'react';
import './HeaderLastChild.css'

const LastChild: React.FC = () => {
  return (
    <div className="container text-black flex mt-4 ">
      <div className=" large-container  mr-4 bg-gray-600 text-white p-2 "></div>
      <div className="small-container  flex-1 bg-red-600 text-white p-2"></div>
    </div>
  );
};

export default LastChild;
