import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';
import ContextLogin from './ContextLogin';

export default function LoginProvider({ children }) {
  const { onHandleChange, formValues } = useFormInput();

  const values = useMemo(
    () => ({ onHandleChange, formValues }),
    [onHandleChange, formValues],
  );
  return (
    <ContextLogin.Provider value={ values }>
      {children}
    </ContextLogin.Provider>

  );
}
LoginProvider.propTypes = {
  children: PropTypes.oneOfType.isRequired,
};
