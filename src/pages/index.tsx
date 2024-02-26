import React, { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import Image from 'next/image';
import { getPageTitle } from '../config';
import Link from 'next/link';
import styles from '../styles/Starter.module.css';

export default function Starter() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800'>
      <nav
        className='w-full py-1 sm:py-1 lg:py-1 bg-blue-500 dark:bg-blue-800 shadow'
        id='custom-navbar'
      >
        <div className='container px-4 md:px-6 mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-4 mt-2'>
            <Image
              src='/ABIE.png'
              width={80}
              height={60}
              alt='ABIE Logo'
              className={`w-16 sm:w-32 ${styles.customImageHeight}`}
            />
          </div>
          <div className='sm:hidden flex items-center'>
            <button
              className='text-white dark:text-gray-200 text-2xl focus:outline-none'
              aria-label='Open Mobile Menu'
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
          </div>
          <div className='hidden sm:flex items-center space-x-4'>
            <a href='#' className='text-lg text-white dark:text-gray-200'>
              Home
            </a>
            <a href='#' className='text-lg text-white dark:text-gray-200'>
              About
            </a>
            <a href='#' className='text-lg text-white dark:text-gray-200'>
              Contact
            </a>
            <Link 
              href='/login'
              className='block text-white dark:text-gray-200'
            >
              Login
            </Link>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className='sm:hidden bg-blue-500 absolute top-0 right-0 w-64'
          >
            <button
              onClick={closeMobileMenu}
              className='block py-2 px-4 text-white dark:text-gray-200'>

              <span
                aria-label='Close Menu'
                className='text-white dark:text-gray-200 text-3xl focus:outline-none'
              >
                &#215;
              </span>
            </button>
            <a
              href='#'
              className='block py-2 px-4 text-white dark:text-gray-200'
            >
              Home
            </a>
            <a
              href='#'
              className='block py-2 px-4 text-white dark:text-gray-200'
            >
              About
            </a>
            <a
              href='#'
              className='block py-2 px-4 text-white dark:text-gray-200'
            >
              Contact
            </a>
            <Link 
              href='/login'
              className='block py-2 px-4 text-white dark:text-gray-200'
            >
              login
            </Link>
          </div>
        )}
      </nav>
      
      <section className='pt-4 lg:pt-0 flex-1'>
        <div className='container px-4 md:px-6 mx-auto mt-0 flex flex-col lg:flex-row items-center justify-between'>
          <div className='flex flex-col items-start space-y-6 text-left w-full lg:w-1/2'>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-blue-500 dark:text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500'>
                The First viable and scalable Appraisal Bias screen tool.
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400'>
                Unmask Appraisal Bias, Audit functionality, Identify Bad Actors.
              </p>
            </div>
            <div className='w-full max-w-sm space-y-4'>
              <form className='space-y-4 sm:space-y-0 sm:flex sm:space-x-2 sm:flex-wrap'>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1'
                  placeholder='Enter your email'
                  type='email'
                />
                <button
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
                  type='submit'
                >
                  Sign Up
                </button>
              </form>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                Sign up to get notified when we launch.
                <a
                  className='underline underline-offset-2 text-blue-500 dark:text-blue-400'
                  href='#'
                >
                  Terms &amp; Conditions
                </a>
              </p>
            </div>
          </div>

          <div className='w-full lg:w-1/2 mt-0 lg:mt-0 flex flex-col items-center'>
            <div >
              <Image
                src='/ABIE.png'
                width={300}
                height={300}
                alt='Additional Image'
              />
            </div>
            <div className='relative aspect-ratio-square grid grid-cols-2 grid-rows-2 gap-2 p-2'>
              <div className={`${styles.imageOne} ${styles.roundedImage}`}>
                <Image
                  src='/1.png'
                  width={500}
                  height={500}
                  alt='Picture of the author'
                  className={`${styles.roundedFull}`}
                />
              </div>
              <div className={`${styles.imageTwo} ${styles.roundedImage}`}>
                <Image
                  src='/4.png'
                  width={500}
                  height={500}
                  alt='Picture of the author'
                  className={`${styles.roundedFull}`}
                />
              </div>
              <div className={`${styles.imageThree} ${styles.roundedImage}`}>
                <Image
                  src='/3.png'
                  width={500}
                  height={500}
                  alt='Picture of the author'
                  className={`${styles.roundedFull}`}
                />
              </div>
              <div className={`${styles.imageFour} ${styles.roundedImage}`}>
                <Image
                  src='/2.png'
                  width={500}
                  height={500}
                  alt='Picture of the author'
                  className={`${styles.roundedFull}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Starter.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
