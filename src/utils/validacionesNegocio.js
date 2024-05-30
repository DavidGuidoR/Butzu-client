import * as yup from 'yup';

const businessValidationSchema = yup.object().shape({
    business_name: yup.string().required('Se requiere el nombre del negocio'),
    description: yup.string().required('Se requiere una descripción'),
    tag: yup.string().required('Se requiere una etiqueta'),
    color_top: yup.string().optional().matches(/^#[0-9A-F]{6}$/i, 'Color hexadecimal inválido'),
    tag_color: yup.string().optional().matches(/^#[0-9A-F]{6}$/i, 'Color hexadecimal inválido'),
    tag_font: yup.string().optional(),
    item_font: yup.string().optional(),
    num_int: yup.string().required('Se requiere el número interior'),
    num_ext: yup.string().optional(),
    city: yup.string().optional(),
    street: yup.string().required('Se requiere la calle'),
    zip_code: yup.string().optional(),
    state: yup.string().required('Se requiere el estado'),
    country: yup.string().required('Se requiere el país'),
  });

export default businessValidationSchema;