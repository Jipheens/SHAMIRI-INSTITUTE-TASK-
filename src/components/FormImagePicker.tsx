import { useState, useEffect } from 'react';
import { ColorButtonKey } from '../interfaces';
import BaseButton from './BaseButton';
import ImagesUploader from './Uploaders/ImagesUploader';
import FileUploader from './Uploaders/UploadService';

type Props = {
  label?: string;
  icon?: string;
  accept?: string;
  color: ColorButtonKey;
  isRoundIcon?: boolean;
  path: string;
  schema: object;
  field: any;
  form: any;
};

const FormImagePicker = ({
  label,
  icon,
  accept,
  color,
  isRoundIcon,
  path,
  schema,
  form,
  field,
}: Props) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (field.value) {
      setFile(field.value[0]);
    }
  }, [field.value]);
  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    setFile(file);

    FileUploader.validate(file, schema);
    const remoteFile = await FileUploader.upload(path, file, schema);

    form.setFieldValue(field.name, [{ ...remoteFile }]);
  };

  const showFilename = !isRoundIcon && file;

  return (
    <div className='flex items-stretch justify-start relative'>
      <label className='inline-flex'>
        <BaseButton
          className={`${isRoundIcon ? 'w-12 h-12' : ''} ${
            showFilename ? 'rounded-r-none' : ''
          }`}
          iconSize={isRoundIcon ? 24 : undefined}
          label={isRoundIcon ? null : label}
          icon={icon}
          color={color}
          roundedFull={isRoundIcon}
          asAnchor
        />
        <input
          type='file'
          className='absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1'
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
      {showFilename && (
        <div className='px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r'>
          <span className='text-ellipsis max-w-full line-clamp-1'>
            {file.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default FormImagePicker;
