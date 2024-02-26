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
  
  import {
    update,
    fetch,
  } from '../../stores/appraisal_summary/appraisal_summarySlice';
  import { useAppDispatch, useAppSelector } from '../../stores/hooks';
  import { useRouter } from 'next/router';
  import { saveFile } from '../../helpers/fileSaver';
  import dataFormatter from '../../helpers/dataFormatter';
  import ImageField from '../../components/ImageField';
  
  const EditAppraisal_summary = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const initVals = {
      ['report_number']: '',
  
      date_created: new Date(),
  
      appraiser: '',
    };
    const [initialValues, setInitialValues] = useState(initVals);
  
    const { appraisal_summary } = useAppSelector(
      (state) => state.appraisal_summary,
    );
  
    const { appraisal_summaryId } = router.query;
  
    useEffect(() => {
      dispatch(fetch({ id: appraisal_summaryId }));
    }, [appraisal_summaryId]);
  
    useEffect(() => {
      if (typeof appraisal_summary === 'object') {
        setInitialValues(appraisal_summary);
      }
    }, [appraisal_summary]);
  
    useEffect(() => {
      if (typeof appraisal_summary === 'object') {
        const newInitialVal = { ...initVals };
  
        Object.keys(initVals).forEach(
          (el) => (newInitialVal[el] = appraisal_summary[el]),
        );
  
        setInitialValues(newInitialVal);
      }
    }, [appraisal_summary]);
  
    const handleSubmit = async (data) => {
      await dispatch(update({ id: appraisal_summaryId, data }));
      await router.push('/appraisal_summary/appraisal_summary-list');
    };
  
    return (
      <>
        <Head>
          <title>{getPageTitle('Edit appraisal_summary')}</title>
        </Head>
        <SectionMain>
          <SectionTitleLineWithButton
            icon={mdiChartTimelineVariant}
            title={'Edit appraisal_summary'}
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
                <FormField label='ReportNumber'>
                  <Field name='report_number' placeholder='Your ReportNumber' />
                </FormField>
  
                <FormField label='DateCreated'>
                  <DatePicker
                    dateFormat='yyyy-MM-dd hh:mm'
                    showTimeSelect
                    selected={
                      initialValues.date_created
                        ? new Date(
                            dayjs(initialValues.date_created).format(
                              'YYYY-MM-DD hh:mm',
                            ),
                          )
                        : null
                    }
                    onChange={(date) =>
                      setInitialValues({ ...initialValues, date_created: date })
                    }
                  />
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
                    onClick={() =>
                      router.push('/appraisal_summary/appraisal_summary-list')
                    }
                  />
                </BaseButtons>
              </Form>
            </Formik>
          </CardBox>
        </SectionMain>
      </>
    );
  };
  
  EditAppraisal_summary.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated permission={'UPDATE_appraisal_summary'}>
        {page}
      </LayoutAuthenticated>
    );
  };
  
  export default EditAppraisal_summary;
  