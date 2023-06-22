import React, { useEffect, useState } from "react";
import { API_URL } from "@/helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/slices/getPosts/getPosts.slice";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const Tape = (categ) => {
  const dispatch = useDispatch();
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    setLoading(true);
    setNextPage(posts.hasNextPage);
    setPrevPage(posts.hasPrevPage);

    if (posts.page === 1) {
      setAllPosts(posts.docs);
    } else if (posts.page === lastPage + 1) {
      setAllPosts((prevAllPosts) => [...prevAllPosts, ...posts.docs]);
      setLastPage(posts.page);
    }

    setLoading(false);
  }, [posts, categ, lastPage]);

  useEffect(() => {
    dispatch(fetchPosts({ category: categ.category, page: 1 }));
  }, [dispatch, categ]);

  const loadNewPosts = () => {
    if (posts.nextPage != null) {
      dispatch(fetchPosts({ category: categ.category, page: posts.nextPage }));
    }
  };

  return (
    <>
      <div className='pt-24 pb-4 px-6 sm:ml-96'>
        {loading ? (
          <Loader />
        ) : (
          allPosts.map((i) => <Card post={i} key={i._id} />)
        )}
        {nextPage ? (
          <button
            type='button'
            className='flex text-white bg-mainColor hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2 mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={loadNewPosts}
          >
            Загрузить еще
          </button>
        ) : (
          <p className='text-right'>Вопросов пока нет ...</p>
        )}
      </div>
    </>
  );
};

export default Tape;
