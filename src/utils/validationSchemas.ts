import * as yup from 'yup';

export const agricultorSchema = yup.object().shape({
  email: yup.string().email().required(),
  nombre: yup.string().required(),
  apellido: yup.string().required(),
});

export const clienteSchema = yup.object().shape({
  email: yup.string().email().required(),
  nombre: yup.string().required(),
  apellido: yup.string().required(),
});

export const campoSchema = yup.object().shape({
  nombre: yup.string().required(),
  ubicacion: yup.string().required(),
});

export const frutaSchema = yup.object().shape({
  nombre: yup.string().required(),
});

export const variedadSchema = yup.object().shape({
  fruta_id: yup.number().required(),
  nombre: yup.string().required(),
});

export const cosechaSchema = yup.object().shape({
  campo_id: yup.number().required(),
  variedad_id: yup.number().required(),
  agricultor_id: yup.number().required(),
  cliente_id: yup.number().required(),
});
