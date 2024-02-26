import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import BaseIcon from '../components/BaseIcon';
import { mdiInformation } from '@mdi/js';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import FormCheckRadio from '../components/FormCheckRadio';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import { useRouter } from 'next/router';
import { getPageTitle } from '../config';
import { findMe, loginUser } from '../stores/authSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = (type, msg) => toast(msg, { type });
  const { currentUser, isFetching, errorMessage, token } = useAppSelector(
    (state) => state.auth,
  );
  const [initialValues, setInitialValues] = React.useState({
    email: '',
    password: '',
    remember: true,
  });

  useEffect(() => {
    if (token) {
      dispatch(findMe());
    }
    if (currentUser?.id) {
      router.push('/dashboard');
    }
  }, [currentUser, token, dispatch, router]);
  useEffect(() => {
    if (errorMessage) {
      notify('error', errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = async (value) => {
    const { remember, ...rest } = value;
    await dispatch(loginUser(rest));
  };

  const setLogin = (target) => {
    const email = target?.innerText;
    setInitialValues((prev) => {
      return { ...prev, email, password: 'password' };
    });
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg='violet'>
        <div className='flex items-center flex-col space-y-4 w-full'>

          <CardBox className='w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12'>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <FormField label='Email' help='Please enter your Email'>
                  <Field name='email' />
                </FormField>

                <FormField label='Password' help='Please enter your password'>
                  <Field name='password' type='password' />
                </FormField>

                <div className={'flex justify-between'}>
                  <FormCheckRadio type='checkbox' label='Remember'>
                    <Field type='checkbox' name='remember' />
                  </FormCheckRadio>

                  <Link className={'text-blue-600'} href={'/forgot'}>
                    Forgot password?
                  </Link>
                </div>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton
                    className={'w-full'}
                    type='submit'
                    label={isFetching ? 'Loading...' : 'Login'}
                    color='info'
                    disabled={isFetching}
                  />
                </BaseButtons>
                <br />
                <p className={'text-center text-gray-600'}>
                  Don’t have account yet?{' '}
                  <Link className={'text-blue-600'} href={'/register'}>
                    New Account
                  </Link>
                </p>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionFullScreen>
      <ToastContainer />
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
