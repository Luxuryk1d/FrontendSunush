import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categories/categories";
import Tape from "../Tape/Tape";
import Loader from "../Loader/Loader";
import { MdCategory } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [categ, setCateg] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClick = (id) => {
    setCateg(id);
  };

  return (
    <>
      <aside
        className='fixed left-0 z-40 w-96 h-screen pt-20 transition-transform -translate-x-full bg-white border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        id='sidebar-multi-level-sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800'>
          <div className='space-y-2 font-medium'>
            <div className='cursor-pointer p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <span className='ml-3' onClick={() => handleClick("")}>
                Все категории
              </span>
            </div>
            {!categories ? (
              <Loader />
            ) : (
              categories.map((i) => (
                <div
                  className='p-3 flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                  key={i._id}
                >
                  <div>
                    <MdCategory className='h-3 w-3 flex' />
                  </div>
                  <span
                    className='ml-3 flex'
                    onClick={() => handleClick(i._id)}
                  >
                    {i.rusTitle}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
      <Tape category={categ} />
    </>
  );
};

export default Sidebar;
