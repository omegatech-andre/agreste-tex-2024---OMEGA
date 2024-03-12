import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .lowercase()
    .required('Obrigatório'),
  telephone: yup
    .string()
    .matches(/^[0-9]*$/, 'Obrigatório, apenas número')
    .required('Obrigatório'),
  email: yup
    .string()
    .lowercase()
    .required('Obrigatório')
})