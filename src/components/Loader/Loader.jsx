import { localStorageCheck } from '@/helpers/constants';
import React, { useEffect, useState } from 'react';

const Loader = ({state}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorageCheck) {
      window.addEventListener("load", () => {
        setIsLoading(false); 
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  return null;
};

export default Loader;
