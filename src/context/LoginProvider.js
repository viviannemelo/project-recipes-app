import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';
import ContextLogin from './ContextLogin';

export default function LoginProvider({ children }) {
  const { onHandleChange, formValues, isButtonDisable } = useFormInput();

  const values = useMemo(
    () => ({ onHandleChange, formValues, isButtonDisable }),
    [onHandleChange, formValues, isButtonDisable],
  );
  return (
    <ContextLogin.Provider value={ values }>
      {children}
    </ContextLogin.Provider>

  );
}
LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
