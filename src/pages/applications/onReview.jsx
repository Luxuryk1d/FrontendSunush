import React, {useEffect, useState} from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { localStorageCheck } from "@/helpers/constants";
import Loader from '@/components/Loader/Loader';
import { getUnpublished } from "@/redux/slices/getUnpublished/getUnpublished.slice";
import axiosApi from "@/helpers/axiosInstance";

const OnReview = () => {
  const dispatch = useDispatch();
  const unpublished = useSelector((state) => state.getUnpublished);
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    if (localStorageCheck) {
      setUserSession(JSON.parse(localStorage.getItem("user")));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userSession && userSession._id) {
      dispatch(getUnpublished());
    }
  }, [dispatch, userSession]);

  const publishe = async (e) => {
    await axiosApi.patch('/questions/' + e.target.value);
    dispatch(getUnpublished());
  };


  return (
    <div className='w-full h-screen bg-gray-800 mt-20'>
        {!unpublished ? <Loader /> : unpublished.map(i => (
            <div key={i._id} className="bg-white" >
            <div className='max-w-sm lg:max-w-full lg:flex'>
              <div className='border w-[calc(100%-5rem)] min-h-full border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 mx-20 mt-20 flex flex-col justify-between leading-normal relative'>
                <div className='flex items-center'>
                  <Image
                    className='rounded-full mr-4'
                    src={`/avatar/defaultAvatar.png`}
                    alt='error'
                    width={50}
                    height={50}
                  />
                  <div className='text-sm'>
                    <p className='text-gray-900 leading-none'>{i.user.fullName}</p>
                    <p className='text-sm text-gray-600 flex items-center mt-1'>
                      {i.datetime && (
                        <i>
                          <span>
                            <span id='app.date'>Дата</span>:{" "}
                            {new Date(i.datetime).toISOString().slice(0, 10)}
                          </span>
                          <span>
                            <span id='app.time'> Время</span>:{" "}
                            {new Date(i.datetime).toISOString().slice(11, 19)}
                          </span>
                        </i>
                      )}
                    </p>
                  </div>
                </div>
                <div className='mb-8'>
                  <div className='text-gray-900 font-bold text-xl my-2'>
                    {i.title}
                  </div>
                  <p className='text-gray-700 text-base text-ellipsis'>
                    {i.description}
                  </p>
                </div>
                <button 
                  type="button"
                  value={i._id}
                  className='absolute bottom-1 right-10'
                  onClick={publishe}
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default OnReview;
