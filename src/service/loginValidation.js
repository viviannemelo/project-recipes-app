export default function validateEmail(email) {
  const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // const emailValid = emailValidation.test(email);
  return emailValidation.test(email);
}
export function validatePassword(password) {
  const SIX = 6;

  return password.length > SIX;
}
