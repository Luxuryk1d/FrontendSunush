import React, { useState } from "react";
import AdminList from "@/components/Admin/AdminList/AdminList";
import Modal from "@/components/Admin/ModalCreate/Modal";
import ModalCategory from '@/components/Admin/ModalCategory/ModalCategory';

const Index = () => {
  const [moderatorBtn, setModeratorBtn] = useState(true);
  const [categoriesBtn, setCategoriesBtn] = useState(false);
  const [bannedBtn, setBannedBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false)

  const handleActiveButton = (clicked) => {
    if (clicked === "moderator") {
      setModeratorBtn(true);
      setCategoriesBtn(false);
      setBannedBtn(false);
    } else null;
    if (clicked === "categories") {
      setCategoriesBtn(true);
      setBannedBtn(false);
      setModeratorBtn(false);
    } else null;
    if (clicked === "banned") {
      setModeratorBtn(false);
      setCategoriesBtn(false);
      setBannedBtn(true);
    } else null;
  };

  return (
    <div className='w-full flex justify-center flex-col items-center pt-32 '>
      <div className='inline-flex rounded-md shadow-sm'>
        <button
          className='px-20 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
          onClick={() => handleActiveButton("moderator")}
        >
          Модераторы
        </button>
        <button
          className='px-20 py-3 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
          onClick={() => handleActiveButton("categories")}
        >
          Категории
        </button>
        <button
          className='px-20 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
          onClick={() => handleActiveButton("banned")}
        >
          Баны
        </button>
      </div>
      {moderatorBtn && (
        <>
          <button
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-3 mr-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={() => setShowModal(true)}
          >
            Добавить модераторов
          </button>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}

      {categoriesBtn && (
        <>
          <button
            type='button'
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-3 mr-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={() => setShowModalCategory(true)}
          >
            Добавить категорию
          </button>
          <ModalCategory showModal={showModalCategory} setShowModal={setShowModalCategory}/>
        </>
      )}
      <AdminList
        moderator={moderatorBtn}
        categoriesProps={categoriesBtn}
        banned={bannedBtn}
      />
    </div>
  );
};

export default Index;
