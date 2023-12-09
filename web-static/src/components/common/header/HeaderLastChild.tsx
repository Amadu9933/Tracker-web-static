// LastChild.tsx
import React from 'react';

const LastChild: React.FC = () => {
  return (
    <div className=" text-black flex mt-4 ">
      <div className="w-80 mr-4 bg-gray-600 text-white p-2 ">80%</div>
      <div className="flex-1 bg-red-600 text-white p-2">20%</div>
    </div>
  );
};

export default LastChild;
