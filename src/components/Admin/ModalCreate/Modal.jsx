import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createModer } from "@/redux/slices/moders/moders.slice";

const Modal = ({ showModal, setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();


  const handleCreateModer = () => {
    const data = getValues();
    console.log(data);
    dispatch(createModer(data));
    setShowModal(false)
  };


  return (
    <>
      {showModal ? (
        <>
          <div className='fixed bg-gray-900 bg-opacity-70 top-0 left-0 right-0 z-50 flex items-center justify-center w-full md:inset-0 h-screen max-h-full'>
            <div className='relative w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <button
                  className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
                <div className='px-6 py-6 lg:px-8'>
                  <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                    Введите данные для модератора
                  </h3>
                  <form
                    className='space-y-6'
                    onSubmit={handleSubmit(handleCreateModer)}
                  >
                    <div>
                      <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Имя
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Качкеев Канат'
                        required
                        {...register("fullName", { required: true })}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Номер телефона
                      </label>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='+996504521215'
                        required
                        {...register("phone", { required: true })}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='password'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Пароль
                      </label>
                      <input
                        type='text'
                        name='password'
                        id='password'
                        placeholder='••••••••'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        required
                        {...register("password", { required: true })}
                      />
                    </div>

                    <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                      Добавить модератора
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
