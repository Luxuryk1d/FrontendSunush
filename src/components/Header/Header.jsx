import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { API_URL, localStorageCheck } from "@/helpers/constants";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/login/login.slice";
import Link from "next/link";
import { MdAddComment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import ThemeToggle from "../Theme/ThemeToggle";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userSession, setUserSession] = useState();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorageCheck) {
      const storedTheme = localStorage.getItem("color-theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(prefersDarkMode ? "dark" : "light");
      }
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (localStorageCheck) {
      localStorage.setItem("color-theme", newTheme);
    }

    router.reload();
  };

  const handleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = useCallback(() => {
    setIsOpen(false);
    dispatch(logoutUser());
    router.push("/");
    return;
  }, [router, dispatch]);

  useEffect(() => {
    if (localStorageCheck) {
      setUserSession(JSON.parse(localStorage.getItem("user")));
    }
  }, [handleLogout]);

  return (
    // <ThemeToggle>
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3 h-20 flex items-center justify-between'>
        <div className='flex items-center justify-start'>
          <button
            data-drawer-target='logo-sidebar'
            data-drawer-toggle='logo-sidebar'
            aria-controls='logo-sidebar'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            onClick={handleBurgerMenu}
          >
            <span className='sr-only'>Open sidebar</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                clipRule='evenodd'
                fillRule='evenodd'
                d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
              ></path>
            </svg>
          </button>
          <Link href={"/"} className='flex ml-2 md:mr-24'>
            <span className='self-center text-2xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
              SUNUSH
            </span>
          </Link>
        </div>
        <button
          id='theme-toggle'
          type='button'
          class='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
        >
          <svg
            id='theme-toggle-dark-icon'
            className='hidden w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
          </svg>
          <svg
            id='theme-toggle-light-icon'
            className='hidden w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex items-center'>
          <div className='flex items-center ml-3'>
            <div>
              {userSession?.token ? (
                <>
                  <div className='flex items-center'>
                    {userSession.role !== "user" ? (
                      userSession.role === "admin" ? (
                        <>
                          <Link
                            href={"/admin"}
                            className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            <div className='flex items-center'>
                              <RiAdminLine className='text-gray-800 mr-2 dark:text-white' />
                              Панель администратора
                            </div>
                          </Link>

                          <Link
                            href={"/applications/onReview"}
                            className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Заявки
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={"/applications/onReview"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Заявки
                        </Link>
                      )
                    ) : (
                      <>
                        <Link
                          href={"/applications/add_application"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          <div className='flex items-center'>
                            <MdAddComment className='block text-gray-800 dark:text-white mr-2' />
                            Задать вопрос
                          </div>
                        </Link>{" "}
                        <Link
                          href={"/account/my_questions"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          onClick={() => setIsOpen(false)}
                        >
                          Мои вопросы
                        </Link>
                      </>
                    )}
                    <p className='text-sm text-gray-900 dark:text-white cursor-default mx-4'>
                      {userSession.fullName}
                    </p>
                    <Image
                      className='w-8 h-8 rounded-full cursor-pointer mx-4'
                      src={
                        userSession.image === undefined
                          ? `/avatar/defaultAvatar.png`
                          : `${API_URL}/uploads/${userSession.image}`
                      }
                      alt='err'
                      height={30}
                      width={30}
                      onClick={handleToggle}
                    />
                  </div>
                  {isOpen && (
                    <div className='z-50 absolute right-0 my-5 text-base list-none bg-white text-white divide-y divide-gray-100 rounded shadow dark:bg-gray-800 dark:divide-gray-600'>
                      <ul className='py-1'>
                        <li>
                          <Link
                            href={`/account/${userSession._id}`}
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                            onClick={() => setIsOpen(false)}
                          >
                            Личный кабинет
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/`}
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                            onClick={handleThemeToggle}
                          >
                            Изменить тему
                          </Link>
                        </li>
                        <li></li>
                        <li>
                          <p
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                          >
                            Выйти
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <ul className='flex'>
                    <li>
                      <Link
                        className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        href={"/account/register"}
                      >
                        Регистрация
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        href={"/account/login"}
                      >
                        Вход
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    // {/* </ThemeToggle> */}
  );
};

export default Header;
