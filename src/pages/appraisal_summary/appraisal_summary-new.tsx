import {
    mdiAccount,
    mdiChartTimelineVariant,
    mdiMail,
    mdiUpload,
  } from '@mdi/js';
  import Head from 'next/head';
  import React, { ReactElement,useState } from 'react';
  import 'react-toastify/dist/ReactToastify.min.css';
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
  import { SwitchField } from '../../components/SwitchField';
  
  import { SelectField } from '../../components/SelectField';
  import { SelectFieldMany } from '../../components/SelectFieldMany';
  import { RichTextField } from '../../components/RichTextField';
  
  import { create } from '../../stores/appraisal_summary/appraisal_summarySlice';
  import { useAppDispatch } from '../../stores/hooks';
  import { useRouter } from 'next/router';
import {Card,CardContent,CardHeader} from '@mui/material';
import axios from 'axios';

  
  
  const TablesPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [extractedData,setExtractedData]=useState(null);
    const[isFilePicked,setisFilePicked]=useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
  
    const handleSubmit = async (data) => {
      await dispatch(create(data));
      setisFilePicked(true);
      const formData=new FormData();
      formData.append('file',file);
      
      try {
        const response = await axios.post('http://localhost:8080//appraisal_summary/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Adjust the content-type if needed
          },
        });
      
        const result = response.data;
        setExtractedData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error uploading file', error);
      }   
      // await router.push('/appraisal_summary/appraisal_summary-list');
    };

    const handleFileChange =async(event) => {
      setFile(event.target.files[0]);
    
    };
    

    return (
      <>
        <Head>
          <title>{getPageTitle('Upload PDF')}</title>
        </Head>
        <SectionMain>
          <SectionTitleLineWithButton
            icon={mdiChartTimelineVariant}
            title='Upload PDF'
            main
          >
            Breadcrumbs
          </SectionTitleLineWithButton>
          <CardBox>
            <Formik
              initialValues={{
  
                upload_file: '',
              }}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
              
                <Card id="main" sx={{ width:"100%",paddingTop:"10px",paddingBottom:"10px", border:"2px dashed black" }}>
                  
                        <CardHeader
                        title="  Drag and Drop a PDF file here"
                        titleTypographyProps={{
                            sx: {
                            textAlign: "center !important",
                            fontSize: "2.5rem !important",
                            fontWeight: "700 !important",
                            lineHeight: "2rem !important",
                            letterSpacing: "0.15px !important",
                            paddingTop:"5px !important",
                            lineHeightStep:"5px",
                            paddingBottom:"5px !important",
                            alignItems:"center",
                           
                            }
                        }}
                        sx={{ justifyContent:"center",alignContent:"center",textAlign:"center" }}
                        >
                  
                        </CardHeader>
                       
                        <CardContent>
                        <FormField label='UploadFile'>
                          <Field
                          sx={{display:"none !important"}}
                          type='file'
                          name='upload_file' 
                          placeholder='Upload PDF' 
                          onChange={(event)=>handleFileChange(event)}
                        
                          />
                        </FormField>


                        <FormField label='Extracted Text(JSON)' hasTextareaHeight>
                        <Field
                        name='extracted_text'
                        as='textarea'
                        placeholder='extracted text here'
                        value={isFilePicked? JSON.stringify(extractedData,null,2):''}
                        />
                        </FormField>
    
                        </CardContent>
                    </Card>
  
                
  
                {/* <FormField label='Appraiser' labelFor='appraiser'>
                  <Field
                    name='appraiser'
                    id='appraiser'
                    component={SelectField}
                    options={[]}
                    itemRef={'users'}
                  ></Field>
                </FormField> */}
  
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
  
  TablesPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated permission={'CREATE_APPRAISAL_SUMMARY'}>
        {page}
      </LayoutAuthenticated>
    );
  };
  
  export default TablesPage;
  