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
} from '../../stores/appraisal_reports/appraisal_reportsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAppraisal_reports = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    ['report_number']: '',

    date_created: new Date(),

    appraiser: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { appraisal_reports } = useAppSelector(
    (state) => state.appraisal_reports,
  );

  const { appraisal_reportsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: appraisal_reportsId }));
  }, [appraisal_reportsId]);

  useEffect(() => {
    if (typeof appraisal_reports === 'object') {
      setInitialValues(appraisal_reports);
    }
  }, [appraisal_reports]);

  useEffect(() => {
    if (typeof appraisal_reports === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = appraisal_reports[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [appraisal_reports]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: appraisal_reportsId, data }));
    await router.push('/appraisal_reports/appraisal_reports-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit appraisal_reports')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit appraisal_reports'}
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
                    router.push('/appraisal_reports/appraisal_reports-list')
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

EditAppraisal_reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APPRAISAL_REPORTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAppraisal_reports;
