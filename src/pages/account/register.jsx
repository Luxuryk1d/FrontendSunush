import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/register/register.slice";
import { fetchCategories } from "@/redux/slices/categories/categories";
import { fetchRegions } from "@/redux/slices/getRegions/getRegions.slice";
import { useRouter } from "next/router";
import { localStorageCheck } from "@/helpers/constants";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRegions());
  }, [dispatch]);

  const { dataRegister, error } = useSelector((state) => state.register);

  const handleRegister = () => {
    let userData = getValues();
    userData.role = "user";
    dispatch(registerUser(userData));
  };

  const handleFormReset = () => {
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorageCheck && dataRegister) {
      localStorage.setItem("user", JSON.stringify(dataRegister));
    }
    if (error === null) {
      router.push("/");
    }
  }, [dataRegister, error, router]);

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm pt-16'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Регистрация учетной записи
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(handleRegister)}
          onReset={handleFormReset}
        >
          <div>
            <label
              htmlFor='text'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              ФИО
            </label>
            <div className='mt-2'>
              <input
                id='text'
                name='text'
                type='text'
                autoComplete='text'
                placeholder='Качкеев Канат Кубатович'
                required
                {...register("fullName", { required: true })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3'
              />
              {/* {errors.name && <span>Поле "Имя" обязательно для заполнения</span>} */}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Ваш номер телефона
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='phone'
                name='phone'
                type='text'
                autoComplete='current-password'
                placeholder='+996700207200'
                {...register("phone", { required: true })}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Придумайте пароль
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                autoComplete='current-password'
                {...register("password", { required: true })}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3'
              />
              {errors.password && (
                <span>Поле Пароль обязательно для заполнения</span>
              )}

              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='mt-1.5 bg-transparent border-none outline-none focus:outline-none text-xs'
              >
                {showPassword ? "Скрыть" : "Показать пароль"}
              </button>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='px-20 py-2 w-full flex items-center justify-center text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
              Зарегестрироваться
            </button>
          </div>
        </form>

        <p className='mt-2 text-center text-sm text-gray-500'>
          Есть аккаунт ?
          <Link
            href='/account/login'
            className='font-semibold leading-6 text-secondColor hover:text-mainColor px-1'
          >
            Войти в учетную запись
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
