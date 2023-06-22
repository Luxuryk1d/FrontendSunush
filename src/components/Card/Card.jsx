import React from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader/Loader";
import { BiGitPullRequest } from "react-icons/bi";
import { MdReadMore } from "react-icons/md";

const Card = ({ post }) => {
  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <div
          className='max-w-sm w-full lg:max-w-full lg:flex pb-5'
          key={post._id}
        >
          <div className='border-2 border-gray-800 w-full h-52 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal relative'>
            <div className='flex items-center'>
              <Image
                className='rounded-full mr-4'
                src={
                  post.user.image === undefined
                    ? "/avatar/defaultAvatar.png"
                    : `${API_URL}/uploads/${post.user.image}`
                }
                alt='error'
                width={50}
                height={50}
              />
              <div className='text-sm'>
                <p className='text-gray-900 leading-none'>
                  {post.user.fullName}
                </p>
                <p className='text-sm text-gray-600 flex mt-1'>
                  {post.datetime && (
                    <i>
                      <span>
                        <span id='app.date'>Дата</span>:{" "}
                        {new Date(post.datetime).toISOString().slice(0, 10)}
                      </span>
                      <span>
                        <span id='app.time'> Время</span>:{" "}
                        {new Date(post.datetime).toISOString().slice(11, 19)}
                      </span>
                    </i>
                  )}
                </p>
              </div>
              <div>
                <p className='absolute flex right-4 top-2 font-medium rounded-lg text-xs px-1 py-1 cursor-default text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                  {post.category.rusTitle}
                </p>
                <div className='right-4 top-9 absolute flex items-center justify-center'>
                  <p className='font-medium flex items-center rounded-lg text-xs px-1 py-1 cursor-default text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                    <BiGitPullRequest className='dark:text-white mr-1' />
                    ответов: {post.answers}
                  </p>
                </div>
              </div>
            </div>
            <div className='mb-16'>
              <div className='text-gray-900 font-bold text-xl my-2'>
                {post.title}
              </div>
              <div className='text-gray-700 text-base overflow-hidden overflow-ellipsis'>
                {post.description.slice(0, 150)}...
              </div>
            </div>
            <Link
              href={`/questions/${post._id}`}
              className='absolute flex items-center top-40 right-4 text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-1 mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
              Подробнее
              <MdReadMore className='ml-2' />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
