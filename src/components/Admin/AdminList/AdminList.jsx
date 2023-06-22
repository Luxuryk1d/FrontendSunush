import Loader from "@/components/Loader/Loader";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "@/redux/slices/categories/categories";
import { getModers, deleteModer } from "@/redux/slices/moders/moders.slice";

const AdminList = ({ moderator, categoriesProps, banned }) => {
  const dispatch = useDispatch();

  const moders = useSelector((state) => state.moders);
  const categories = useSelector((state) => state.categories);

  const handleDeleteModer = (id) => {
    dispatch(deleteModer(id));
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getModers());
  }, [dispatch]);

  return (
    <div className='w-full h-screen dark:bg-gray-800 mt-10'>
      {!moderator
        ? ""
        : moders &&
          moders.map((i) => (
            <div
              className='w-full my-5 flex items-center justify-between'
              key={i._id}
            >
              <p className='ml-10 dark:text-white w-96'>{i.fullName}</p>
              <div className='w-20 mr-10 flex justify-between items-center'>
                <AiOutlineDelete className='dark:text-white' />
                <button
                  className=' dark:text-white text-sm'
                  onClick={() => handleDeleteModer(i._id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}

      {!categoriesProps ? (
        ""
      ) : !categories ? (
        <Loader />
      ) : (
        categories.map((i) => (
          <div
            className='w-full my-5 flex items-center justify-between'
            key={i._id}
          >
            <p className='ml-10 dark:text-white w-96'>{i.rusTitle}</p>
            <div className='w-20 mr-10 flex justify-between items-center'>
              <AiOutlineDelete className='dark:text-white' />
              <button
                className=' dark:text-white text-sm'
                onClick={() => handleDeleteCategory(i._id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminList;
