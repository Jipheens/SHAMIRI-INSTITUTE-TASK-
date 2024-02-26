import React, { useEffect, useId, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

export const SelectField = ({
  options,
  field,
  form,
  itemRef,
  showField,
  disabled,
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (options?.id && field?.value?.id) {
      setValue({ value: field.value?.id, label: field.value[showField] });
      form.setFieldValue(field.name, field.value?.id);
    }
  }, [options?.id, field?.value?.id]);

  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: data.label,
  });
  const handleChange = (option) => {
    form.setFieldValue(field.name, option.value);
    setValue(option);
  };

  async function callApi() {
    const data = await axios(`/${itemRef}/autocomplete?limit=100`);
    return data.data.map(mapResponseToValuesAndLabels);
  }
  return (
    <AsyncSelect
      classNames={{
        control: () => 'px-1 py-2',
      }}
      instanceId={useId()}
      value={value}
      loadOptions={callApi}
      onChange={handleChange}
      defaultOptions
      isDisabled={disabled}
    />
  );
};
