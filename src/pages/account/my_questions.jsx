import React, { useEffect, useState } from "react";
import Questions from "@/components/User/Questions/Questions";

const My_questions = () => {
  
  const [myQuestions, setMyQuestions] = useState(true);
  const [underConsiderationQuestions, setUnderConsiderationQuestions] =
    useState(false);
  

  const handleActiveButton = (clicked) => {
    if (clicked === "myQuestions") {
      setMyQuestions(true);
      setUnderConsiderationQuestions(false);
    } else null;
    if (clicked === "underConsiderationQuestions") {
      setMyQuestions(false);
      setUnderConsiderationQuestions(true);
    } else null;
  };


  return (
    <div className='w-full flex justify-center flex-col items-center pt-32 '>
      <div className='inline-flex rounded-md shadow-sm'>
        <button
          className='px-20 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
          onClick={() => handleActiveButton("myQuestions")}
        >
          Опубликованные
        </button>
        <button
          className='px-20 py-3 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
          onClick={() => handleActiveButton("underConsiderationQuestions")}
        >
          Неопубликованные
        </button>
      </div>
      <Questions
        myQuestions={myQuestions}
        underConsiderationQuestions={underConsiderationQuestions}
      />
    </div>
  );
};

export default My_questions;
