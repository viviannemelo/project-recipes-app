import { useState } from 'react';

export default function useFormInput() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return ({
    formValues,
    onHandleChange,
  });
}
