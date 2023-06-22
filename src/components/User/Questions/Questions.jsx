import React, { useState, useEffect } from "react";
import { getMyQuestions } from "@/redux/slices/getMyQuestions/getMyQuestions.slice";
import { useDispatch, useSelector } from "react-redux";
import { localStorageCheck } from "@/helpers/constants";
import { API_URL } from "@/helpers/constants";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import Image from "next/image";


const Questions = ({ myQuestions, underConsiderationQuestions }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.getMyQuestions);
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    if (localStorageCheck) {
      setUserSession(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (userSession && userSession._id) {
      dispatch(getMyQuestions(userSession._id));
    }
  }, [dispatch, userSession]);

  console.log(questions);
  return (
    <div className='w-full h-screen dark:bg-gray-800 mt-10'>
      {!questions ? (
        <Loader />
      ) : (
        questions.map((i) =>
          i.published === myQuestions ? (
            <div key={i._id}>
              <div className='max-w-sm lg:max-w-full lg:flex'>
                <div className='border w-[calc(100%-10rem)] h-48 border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 ml-20 mt-10 flex flex-col justify-between leading-normal relative'>
                  <div className='flex items-center'>
                    <Image
                      className='rounded-full mr-4'
                      src={`/avatar/defaultAvatar.png`}
                      alt='error'
                      width={50}
                      height={50}
                    />
                    <div className='text-sm'>
                      <p className='text-gray-900 leading-none'>{i.fullName}</p>
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
                      {i.description.slice(0, 110)}...
                    </p>
                  </div>
                  <Link
                    href={`/questions/${i._id}`}
                    className='absolute top-36 right-10'
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            !i.published !== myQuestions && (
              <div key={i._id}>
                <div className='max-w-sm lg:max-w-full lg:flex'>
                  <div className='border w-[calc(100%-10rem)] h-48 border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 ml-20 mt-10 flex flex-col justify-between leading-normal relative'>
                    <div className='flex items-center'>
                      <Image
                        className='rounded-full mr-4'
                        src={`/avatar/defaultAvatar.png`}
                        alt='error'
                        width={50}
                        height={50}
                      />
                      <div className='text-sm'>
                        <p className='text-gray-900 leading-none'>
                          {i.fullName}
                        </p>
                        <p className='text-sm text-gray-600 flex items-center mt-1'>
                          {i.datetime && (
                            <i>
                              <span>
                                <span id='app.date'>Дата</span>:{" "}
                                {new Date(i.datetime)
                                  .toISOString()
                                  .slice(0, 10)}
                              </span>
                              <span>
                                <span id='app.time'> Время</span>:{" "}
                                {new Date(i.datetime)
                                  .toISOString()
                                  .slice(11, 19)}
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
                        {i.description.slice(0, 110)}...
                      </p>
                    </div>
                    <Link
                      href={`/question/${i._id}`}
                      className='absolute top-36 right-10'
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            )
          )
        )
      )}
    </div>
  );
};

export default Questions;