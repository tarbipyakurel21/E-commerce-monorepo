import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="animate-spin rounded-full border-4 border-t-transparent border-blue-500 w-12 h-12" role="status" />
    </div>
  );
};

export default Loader;
