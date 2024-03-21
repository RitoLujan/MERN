import * as Yup from "yup";

export function initialvalues() {
    return {
        email: "",
        password: "",
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("Campo Obligatorio"),
        password: Yup.string().required("Campo Obligatorio"),
    });
}