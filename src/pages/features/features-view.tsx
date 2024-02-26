import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/features/featuresSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const FeaturesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { features } = useAppSelector((state) => state.features);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View features')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View features'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FeatureName</p>
            <p>{features?.feature_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PDFForm</p>

            <p>{features?.pdf_form?.form_name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>ComparableProperties</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>FeatureName</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.comparable_properties &&
                      Array.isArray(features.comparable_properties) &&
                      features.comparable_properties.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/features/features-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='feature_name'>{item.feature_name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!features?.comparable_properties?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/features/features-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

FeaturesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_FEATURES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default FeaturesView;
