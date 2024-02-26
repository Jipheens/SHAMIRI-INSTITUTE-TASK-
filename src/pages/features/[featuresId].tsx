import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/features/featuresSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditFeatures = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    ['feature_name']: '',

    pdf_form: '',

    comparable_properties: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { features } = useAppSelector((state) => state.features);

  const { featuresId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: featuresId }));
  }, [featuresId]);

  useEffect(() => {
    if (typeof features === 'object') {
      setInitialValues(features);
    }
  }, [features]);

  useEffect(() => {
    if (typeof features === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = features[el]));

      setInitialValues(newInitialVal);
    }
  }, [features]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: featuresId, data }));
    await router.push('/features/features-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit features')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit features'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='FeatureName'>
                <Field name='feature_name' placeholder='Your FeatureName' />
              </FormField>

              <FormField label='PDFForm' labelFor='pdf_form'>
                <Field
                  name='pdf_form'
                  id='pdf_form'
                  component={SelectField}
                  options={initialValues.pdf_form}
                  itemRef={'pdf_forms'}
                  showField={'form_name'}
                ></Field>
              </FormField>

              <FormField
                label='ComparableProperties'
                labelFor='comparable_properties'
              >
                <Field
                  name='comparable_properties'
                  id='comparable_properties'
                  component={SelectFieldMany}
                  options={initialValues.comparable_properties}
                  itemRef={'features'}
                  showField={'feature_name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/features/features-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditFeatures.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_FEATURES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditFeatures;
