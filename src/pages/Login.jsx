import React from 'react';

export default function Login() {
  return (
    <div>
      <form action="">
        <input
          data-testid="email-input"
          placeholder="insira seu e-mail"
          type="email"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="insira sua senha"
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
        >
          Submit

        </button>
      </form>
    </div>
  );
}
