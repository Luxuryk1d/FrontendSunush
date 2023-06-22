import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser, logoutUser } from "@/redux/slices/login/login.slice";
import { localStorageCheck } from "@/helpers/constants";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { dataLogin, error } = useSelector((state) => state.login);
  const router = useRouter();

  const handleLogin = (data, e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  const handleFormReset = () => {
    reset();
  };

  
  useEffect(() => {
    if (localStorageCheck && dataLogin) {
      localStorage.setItem("user", JSON.stringify(dataLogin));
    }
    if (error === null) {
      router.push("/");
    }
  }, [dataLogin, error, router]);

  
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm pt-28'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Вход в учетную запись
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(handleLogin)}
          onReset={handleFormReset}
        >
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Ваш номер телефона
              </label>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-semibold text-secondColor hover:text-mainColor'
                >
                  Забыли пароль ?
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <input
                {...register("phone", { required: true })}
                id='phone'
                name='phone'
                type='text'
                autoComplete='current-password'
                placeholder='+996700207200'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3 ${
                  errors.phone && "border-red-500"
                }`}
              />
              {errors.phone && (
                <span className='text-red-500'>Обязательное поле</span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Ваш пароль
            </label>
            <div className='mt-2'>
              <input
                {...register("password", { required: true })}
                id='password'
                name='password'
                type='password'
                autoComplete='password'
                placeholder='например luxuryk1d'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3 ${
                  errors.password && "border-red-500"
                }`}
              />
              {errors.password && (
                <span className='text-red-500'>Обязательное поле</span>
              )}
            </div>
          </div>

          {error && <span className='text-red-500 mt-2'>{error}</span>}

          <div>
            <button
              type='submit'
              className='px-20 py-2 w-full flex items-center justify-center text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
