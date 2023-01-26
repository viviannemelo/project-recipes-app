import React, { useContext } from 'react';
import ContextLogin from '../context/ContextLogin';

export default function Login() {
  const { onHandleChange, formValues, isButtonDisable } = useContext(ContextLogin);
  
  function savedLocalStorage() {
    return localStorage.setItem('user', JSON.stringify({ email: formValues.email }));
  }
  
  return (
    <div>
      <form action="">
        <input
          data-testid="email-input"
          values={ formValues.email }
          placeholder="insira seu e-mail"
          type="email"
          name="email"
          onChange={ onHandleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="insira sua senha"
          name="password"
          value={ formValues.password }
          onChange={ onHandleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !isButtonDisable }
          onClick={ savedLocalStorage }
        >
          Submit

        </button>
      </form>
    </div>
  );
}
