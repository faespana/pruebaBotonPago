function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^.{4,}$/;
  /* /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/*/
  if (values.email === "") {
    error.email = "El campo email no debe estar vacío";
  } else if (!email_pattern.test(values.email)) {
    error.email = "El email no coincide";
  } else {
    error.email = "";
  }
  if (values.password === "") {
    error.password = "El campo contraseña no debe estar vacío";
  } else if (!password_pattern.test(values.password)) {
    error.password = "La contraseña no coincide";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
