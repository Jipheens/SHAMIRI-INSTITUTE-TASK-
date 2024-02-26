import React, { useEffect, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BaseButton from '../BaseButton';
import CardBoxModal from '../CardBoxModal';
import CardBox from '../CardBox';
import {
  fetch,
  update,
  deleteItem,
  setRefetch,
} from '../../stores/appraisal_summary/appraisal_summarySlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { loadColumns } from './configureAppraisal_summaryCols';
import _ from 'lodash';
import dataFormatter from '../../helpers/dataFormatter';

const perPage = 5;

const TableSampleAppraisal_summary = ({
  filterItems,
  setFilterItems,
  filters,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const notify = (type, msg) => toast(msg, { type, position: 'bottom-center' });

  const pagesList = [];
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterRequest, setFilterRequest] = React.useState('');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [sortModel, setSortModel] = useState([
    {
      field: '',
      sort: 'desc',
    },
  ]);
  const {
    appraisal_summary,
    loading,
    count,
    notify: appraisal_summaryNotify,
    refetch,
  } = useAppSelector((state) => state.appraisal_summary);
  const { currentUser } = useAppSelector((state) => state.auth);

  const numPages =
    Math.floor(count / perPage) === 0 ? 1 : Math.ceil(count / perPage);
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const loadData = async (page = currentPage, request = filterRequest) => {
    if (page !== currentPage) setCurrentPage(page);
    if (request !== filterRequest) setFilterRequest(request);
    const { sort, field } = sortModel[0];

    const query = `?page=${page}&limit=${perPage}${request}&sort=${sort}&field=${field}`;
    dispatch(fetch({ limit: perPage, page, query }));
  };

  useEffect(() => {
    if (appraisal_summaryNotify.showNotification) {
      notify(
        appraisal_summaryNotify.typeNotification,
        appraisal_summaryNotify.textNotification,
      );
    }
  }, [appraisal_summaryNotify.showNotification]);

  useEffect(() => {
    loadData();
  }, [dispatch, sortModel]);

  useEffect(() => {
    if (refetch) {
      loadData(0);
      dispatch(setRefetch(false));
    }
  }, [refetch, dispatch]);

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  const handleEditAction = (id: string) => {
    router.push(`/appraisal_summary/${id}`);
  };

  const handleViewAction = (id: string) => {
    router.push(`/appraisal_summary/appraisal_summary-view/?id=${id}`);
  };

  const handleDeleteModalAction = (id: string) => {
    setId(id);
    setIsModalTrashActive(true);
  };
  const handleDeleteAction = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      console.log('filterRequest', filterRequest);
      await loadData(0);
      setIsModalTrashActive(false);
    }
  };

  const generateFilterRequests = useMemo(() => {
    let request = '&';
    filterItems.forEach((item) => {
      filters.find(
        (filter) =>
          filter.title === item.fields.selectedField &&
          (filter.number || filter.date),
      )
        ? (request += `${item.fields.selectedField}Range=${item.fields.filterValueFrom}&${item.fields.selectedField}Range=${item.fields.filterValueTo}&`)
        : (request += `${item.fields.selectedField}=${item.fields.filterValue}&`);
    });
    return request;
  }, [filterItems, filters]);

  const deleteFilter = (value) => {
    const newItems = filterItems.filter((item) => item.id !== value);
    console.log('newItems', newItems);
    if (newItems.length) {
      setFilterItems(newItems);
    } else {
      loadData(0, '');
      setFilterItems(newItems);
    }
  };

  const handleSubmit = () => {
    loadData(0, generateFilterRequests);
  };

  const handleChange = (id) => (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilterItems(
      filterItems.map((item) =>
        item.id === id
          ? { id, fields: { ...item.fields, [name]: value } }
          : item,
      ),
    );
  };

  const handleReset = () => {
    setFilterItems([]);
    loadData(0, '');
  };

  const onPageChange = (page: number) => {
    loadData(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!currentUser) return;

    loadColumns(
      handleDeleteModalAction,
      handleViewAction,
      handleEditAction,
      currentUser,
    ).then((newCols) => setColumns(newCols));
  }, [currentUser]);

  const handleTableSubmit = async (id: string, data) => {
    if (!_.isEmpty(data)) {
      await dispatch(update({ id, data }))
        .unwrap()
        .then((res) => res)
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  const controlClasses =
    'w-full py-2 px-2 my-2 border-gray-700 rounded dark:placeholder-gray-400 ' +
    'focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none bg-white ' +
    'dark:bg-slate-800 border';
  console.log('appraisal_summary: ', appraisal_summary);

  return (
    <>
      {filterItems && Array.isArray(filterItems) && filterItems.length ? (
        <CardBox>
          <Formik
            initialValues={{
              checkboxes: ['lorem'],
              switches: ['lorem'],
              radio: 'lorem',
            }}
            onSubmit={() => null}
          >
            <Form>
              <>
                {filterItems &&
                  filterItems.map((filterItem) => {
                    return (
                      <div key={filterItem.id} className='flex mb-4'>
                        <div className='flex flex-col w-full mr-3'>
                          <div className='text-gray-500 font-bold'>Filter</div>
                          <Field
                            className={controlClasses}
                            name='selectedField'
                            id='selectedField'
                            component='select'
                            value={filterItem?.fields?.selectedField}
                            onChange={handleChange(filterItem.id)}
                          >
                            {filters.map((selectOption) => (
                              <option
                                key={selectOption.title}
                                value={`${selectOption.title}`}
                              >
                                {selectOption.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {filters.find(
                          (filter) =>
                            filter.title === filterItem?.fields?.selectedField,
                        )?.number ? (
                          <div className='flex flex-row w-full mr-3'>
                            <div className='flex flex-col w-full mr-3'>
                              <div className='text-gray-500 font-bold'>
                                From
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueFrom'
                                placeholder='From'
                                id='filterValueFrom'
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                            <div className='flex flex-col w-full'>
                              <div className='text-gray-500 font-bold'>To</div>
                              <Field
                                className={controlClasses}
                                name='filterValueTo'
                                placeholder='to'
                                id='filterValueTo'
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                          </div>
                        ) : filters.find(
                            (filter) =>
                              filter.title ===
                              filterItem?.fields?.selectedField,
                          )?.date ? (
                          <div className='flex flex-row w-full mr-3'>
                            <div className='flex flex-col w-full mr-3'>
                              <div className='text-gray-500 font-bold'>
                                From
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueFrom'
                                placeholder='From'
                                id='filterValueFrom'
                                type='datetime-local'
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                            <div className='flex flex-col w-full'>
                              <div className='text-gray-500 font-bold'>To</div>
                              <Field
                                className={controlClasses}
                                name='filterValueTo'
                                placeholder='to'
                                id='filterValueTo'
                                type='datetime-local'
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-col w-full mr-3'>
                            <div className='text-gray-500 font-bold'>
                              Contains
                            </div>
                            <Field
                              className={controlClasses}
                              name='filterValue'
                              placeholder='Contained'
                              id='filterValue'
                              onChange={handleChange(filterItem.id)}
                            />
                          </div>
                        )}
                        <div className='flex flex-col'>
                          <div className='text-gray-500 font-bold'>Action</div>
                          <BaseButton
                            className='my-2'
                            type='reset'
                            color='danger'
                            label='Delete'
                            onClick={() => {
                              deleteFilter(filterItem.id);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                <div className='flex'>
                  <BaseButton
                    className='my-2 mr-3'
                    color='success'
                    label='Apply'
                    onClick={handleSubmit}
                  />
                  <BaseButton
                    className='my-2'
                    color='info'
                    label='Cancel'
                    onClick={handleReset}
                  />
                </div>
              </>
            </Form>
          </Formik>
        </CardBox>
      ) : null}
      <CardBoxModal
        title='Please confirm'
        buttonColor='danger'
        buttonLabel={loading ? 'Deleting...' : 'Confirm'}
        isActive={isModalTrashActive}
        onConfirm={handleDeleteAction}
        onCancel={handleModalAction}
      >
        <p>Are you sure you want to delete this item?</p>
      </CardBoxModal>

      <div className='relative overflow-x-auto'>
        <DataGrid
          autoHeight
          className={'datagrid--table'}
          getRowClassName={() => `datagrid--row`}
          rows={appraisal_summary ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
          onProcessRowUpdateError={(params) => {
            console.log('Error', params);
          }}
          processRowUpdate={async (newRow, oldRow) => {
            const data = dataFormatter.dataGridEditFormatter(newRow);

            try {
              await handleTableSubmit(newRow.id, data);
              return newRow;
            } catch {
              return oldRow;
            }
          }}
          sortingMode={'server'}
          onSortModelChange={(params) => {
            params.length
              ? setSortModel(params)
              : setSortModel([{ field: '', sort: 'desc' }]);
          }}
          rowCount={count}
          pageSizeOptions={[5]}
          paginationMode={'server'}
          onPaginationModelChange={(params) => {
            onPageChange(params.page);
          }}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default TableSampleAppraisal_summary;
