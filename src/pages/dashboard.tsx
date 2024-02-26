import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import { mdiInformation } from '@mdi/js';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

import { hasPermission } from '../helpers/userPermissions';
import { useAppSelector } from '../stores/hooks';

const Dashboard = () => {
  const [users, setUsers] = React.useState('Loading...');
  const [appraisal_reports, setAppraisal_reports] =
    React.useState('Loading...');
  const [features, setFeatures] = React.useState('Loading...');
  const [pdf_forms, setPdf_forms] = React.useState('Loading...');
  const [roles, setRoles] = React.useState('Loading...');
  const [permissions, setPermissions] = React.useState('Loading...');

  const { currentUser } = useAppSelector((state) => state.auth);

  async function loadData() {
    const entities = [
      'users',
      'appraisal_reports',
      'features',
      'pdf_forms',
      'roles',
      'permissions',
    ];
    const fns = [
      setUsers,
      setAppraisal_reports,
      setFeatures,
      setPdf_forms,
      setRoles,
      setPermissions,
    ];

    const requests = entities.map((entity, index) => {
      if (hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
        return axios.get(`/${entity.toLowerCase()}/count`);
      } else {
        fns[index](null);
        return Promise.resolve({ data: { count: null } });
      }
    });

    Promise.all(requests)
      .then((res) => res.map((el) => el.data))
      .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  React.useEffect(() => {
    if (!currentUser) return;
    loadData().then();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Overview'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
          {hasPermission(currentUser, 'READ_USERS') && (
            <Link href={'/users/users-list'} className='mr-3'>
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Users
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {users}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_APPRAISAL_REPORTS') && (
            <Link
              href={'/appraisal_reports/appraisal_reports-list'}
              className='mr-3'
            >
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Appraisal_reports
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {appraisal_reports}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}
          
          {hasPermission(currentUser, 'READ_APPRAISAL_SUMMARY') && (
            <Link
              href={'/appraisal_summary/appraisal_summary-list'}
              className='mr-3'
            >
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Appraisal_reports
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {appraisal_reports}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_FEATURES') && (
            <Link href={'/features/features-list'} className='mr-3'>
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Features
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {features}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PDF_FORMS') && (
            <Link href={'/pdf_forms/pdf_forms-list'} className='mr-3'>
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Pdf_forms
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pdf_forms}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ROLES') && (
            <Link href={'/roles/roles-list'} className='mr-3'>
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Roles
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {roles}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PERMISSIONS') && (
            <Link href={'/permissions/permissions-list'} className='mr-3'>
              <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Permissions
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {permissions}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      path={mdiInformation}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
