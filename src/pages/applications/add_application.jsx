import { localStorageCheck } from "@/helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categories/categories";
import { fetchRegions } from "@/redux/slices/getRegions/getRegions.slice";
import { postQuestion } from "@/redux/slices/addApplication/addApplication.slice";
import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Add_application = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const regions = useSelector((state) => state.getRegions);
  const isLoading = useSelector((state) => state.questions.loading);
  const response = useSelector((state) => state.questions.response);
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAddAplication = () => {
    const data = getValues();
    const date = new Date();
    const answers = 0;

    const requestData = {
      title: data.title,
      description: data.description,
      category: data.category,
      region: data.region,
      datetime: date.toISOString(),
      answers: answers,
    };

    dispatch(postQuestion(requestData));
    router.push('/account/my_questions')
  };

  const handleFormReset = () => {
    reset();
  };

  if (localStorageCheck) {
    const user = localStorage.getItem("user");
    if (user?.length === 2 || !user) {
      router.push("/account/login");
    }
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        <div>
          <p className='text-3xl font-medium pb-6'>Задать вопрос</p>
        </div>
        <div className='w-5/6 '>
          <form
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            onSubmit={handleSubmit(handleAddAplication)}
            onReset={handleFormReset}
          >
            <div>
              <div className='flex items-center justify-between '>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Заголовок
                </label>
              </div>
              <div className='mt-2'>
                <input
                  {...register("title", { required: true })}
                  id='title'
                  name='title'
                  type='text'
                  autoComplete='current-title'
                  placeholder='Например: "Как купить участок земли" ?'
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3 h-12`}
                />
              </div>
            </div>

            <div className='py-2'>
              <div className='flex items-center justify-between '>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Описание
                </label>
              </div>
              <div className='mt-2'>
                <textarea
                  {...register("description", { required: true })}
                  id='description'
                  name='description'
                  type='text'
                  autoComplete='current-title'
                  placeholder='Опишите проблему'
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondColor sm:text-sm sm:leading-6 pl-3 h-28`}
                />
              </div>
            </div>

            <div className='py-2'>
              <div className='flex items-center justify-between '>
                <label
                  htmlFor='categories'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Выберите категорию
                </label>
              </div>
              <div className='relative w-full '>
                <select
                  className='w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-secondColor text-xs'
                  id='categories'
                  name='categories'
                  key='categories'
                  {...register("category", { required: true })}
                >
                  {categories.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.rusTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='py-2'>
              <div className='flex items-center justify-between '>
                <label
                  htmlFor='categories'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Выберите регион
                </label>
              </div>
              <div className='relative w-full '>
                <select
                  className='w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-secondColor text-xs'
                  id='region'
                  name='region'
                  key='region'
                  {...register("region", { required: true })}
                >
                  {regions.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.rusTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className='py-2'>
              <div>
                <label htmlFor='file' className='py-2 text-sm'>
                  Можете прикрепить фотографию
                </label>
              </div>
              <div className='relative overflow-hidden py-2 top-1 w-36 flex cursor-pointer'>
                <input
                  type='file'
                  id='file'
                  name='file'
                  multiple
                  onChange={handleFileChange}
                  className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                />
                <label
                  htmlFor='file'
                  className='block px-2 py-2 text-center text-sm font-medium text-gray-900 bg-white border border-gray-200 
                  rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                >
                  Загрузить файлы
                </label>
              </div>
              <div className='flex flex-wrap pt-3'>
                {files.map((file, index) => (
                  <div key={index} className='w-32 h-32'>
                    <div className='relative'>
                      <div className='absolute inset-1 w-28 h-28'>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt='Uploaded file'
                          className='rounded-lg object-cover object-center w-full h-full'
                          width={200}
                          height={200}
                        />
                      </div>
                      <span
                        className='absolute right-1 bg-red-500 text-white rounded-full px-1 cursor-pointer'
                        onClick={() => handleRemoveFile(index)}
                      >
                        x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <div>
              <button
                type='submit'
                className='px-20 py-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 
                rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
              >
                Оставить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add_application;
