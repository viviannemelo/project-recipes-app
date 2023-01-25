import { useState } from 'react';
import validateEmail, { validatePassword } from '../service/loginValidation';

export default function useFormInput() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisable, setButtonState] = useState(false);

  const validateButton = (values) => {
    console.log('Validando');
    const { email, password } = values;
    console.log(values);
    const checkEmail = validateEmail(email);
    const checkPass = validatePassword(password);
    return (checkEmail && checkPass)
      ? setButtonState(true) : setButtonState(false);
    // const SIX = 6;
    // const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // const emailValid = emailValidation.test(email);
    // setButtonState(emailValid && password.length > SIX);
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    const values = { ...formValues, [name]: value };
    setFormValues(values);

    validateButton(values);
  };

  return ({
    formValues,
    onHandleChange,
    isButtonDisable,
  });
}
