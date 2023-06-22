import { getQuestion } from "@/redux/slices/getQuestion/getQuestion.slice";
import { getAnswer } from "@/redux/slices/getAnswer/getAnswer.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiGitPullRequest } from "react-icons/bi";
import Loader from "@/components/Loader/Loader";
import { addAnswer } from "@/redux/slices/addAnswer/addAnswer.slice";
import { localStorageCheck } from "@/helpers/constants";

const Id = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.getQuestion);
  const answers = useSelector((state) => state.getAnswer);
  const [userSession, setUserSession] = useState();
  const router = useRouter();
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    if (localStorageCheck) {
      setUserSession(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getQuestion(id));
      dispatch(getAnswer(id));
    }
  }, [dispatch, id]);

  const getAnswerHandler = (e) => {
    setAnswer(e.target.value)
  }

  const addAnsw = () => {
    dispatch(addAnswer({ question: id, answer: answer }));
    setAnswer("");
  }

  return (
    <>
      <div className='w-full flex items-center flex-col justify-center mt-28'>
        {question !== null ? (
          <div className='border-2 border-gray-800  w-2/3 h-fit lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal relative'>
            <div className='flex items-center'>
              <Image
                className='rounded-full mr-4'
                src={`/avatar/defaultAvatar.png`}
                alt='error'
                width={50}
                height={50}
              />
              <div className='text-xl'>
                <p className='text-gray-900 leading-none'>
                  {question.user.fullName}
                </p>
                <p className='text-sm text-gray-600 flex mt-1'>
                  {question.datetime && (
                    <i>
                      <span>
                        <span id='app.date'>Дата</span>:{" "}
                        {new Date(question.datetime).toISOString().slice(0, 10)}
                      </span>
                      <span>
                        <span id='app.time'> Время</span>:{" "}
                        {new Date(question.datetime)
                          .toISOString()
                          .slice(11, 19)}
                      </span>
                    </i>
                  )}
                </p>
              </div>
              <div>
                <p className='absolute flex right-4 top-2 font-medium rounded-lg text-xs px-1 py-1 cursor-default text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                  {question.category.rusTitle}
                </p>
                <div className='right-4 top-9 absolute flex items-center justify-center'>
                  <p className='font-medium flex items-center rounded-lg text-xs px-1 py-1 cursor-default text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                    <BiGitPullRequest className='dark:text-white mr-1' />
                    ответов: {question.answers}
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-20'>
              <div className='text-gray-900 font-bold text-2xl my-2'>
                {question.title}
              </div>
              <div className='text-gray-700 text-xl text-ellipsis'>
                {question.description}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        {userSession && userSession.role !== "user" ? (<div>
        <textarea
          className="resize-none w-full mt-10 mb-4 h-32 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          style={{ width: "700px" , height: "200px"}}
          rows={4}
            placeholder="Отправьте ответ"
            value={answer}
            onChange={getAnswerHandler}
        />
        <button
          className="flex items-center top-40 right-4 text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-1 mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="button"
            onClick={addAnsw}
        >
        Отправить
        </button>
        </div>) : (<></>)
        }
        
        {question !== null ? (
          answers.map((i) => (
            <>
              <div key={i._id} className='w-full flex items-center justify-center mt-8'>
                <div className='border-2 border-gray-800  w-2/3 h-fit lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal relative'>
                  <div className='flex items-center'>
                    <Image
                      className='rounded-full mr-4'
                      src={`/avatar/defaultAvatar.png`}
                      alt='error'
                      width={50}
                      height={50}
                    />
                    <div className='text-xl'>
                      <p className='text-gray-900 leading-none'>
                        Администрация
                      </p>
                    </div>
                    <div>
                      <p className='absolute flex right-4 top-2 font-medium rounded-lg text-xs px-1 py-1 cursor-default text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                        {question.category.rusTitle}
                      </p>
                    </div>
                  </div>
                  <div className='mb-20'>
                    <div className='text-gray-900 font-bold text-2xl my-2'>
                      Ответ на вопрос
                    </div>
                    <div className='text-gray-700 text-xl text-ellipsis'>
                      {i.answer}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};


export default Id;
