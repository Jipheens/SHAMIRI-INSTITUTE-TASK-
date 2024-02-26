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

import { update, fetch } from '../../stores/pdf_forms/pdf_formsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditPdf_forms = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    ['form_name']: '',

    appraiser: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { pdf_forms } = useAppSelector((state) => state.pdf_forms);

  const { pdf_formsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: pdf_formsId }));
  }, [pdf_formsId]);

  useEffect(() => {
    if (typeof pdf_forms === 'object') {
      setInitialValues(pdf_forms);
    }
  }, [pdf_forms]);

  useEffect(() => {
    if (typeof pdf_forms === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = pdf_forms[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [pdf_forms]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: pdf_formsId, data }));
    await router.push('/pdf_forms/pdf_forms-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pdf_forms')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit pdf_forms'}
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
              <FormField label='FormName'>
                <Field name='form_name' placeholder='Your FormName' />
              </FormField>

              <FormField label='Appraiser' labelFor='appraiser'>
                <Field
                  name='appraiser'
                  id='appraiser'
                  component={SelectField}
                  options={initialValues.appraiser}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  onClick={() => router.push('/pdf_forms/pdf_forms-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPdf_forms.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PDF_FORMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPdf_forms;
