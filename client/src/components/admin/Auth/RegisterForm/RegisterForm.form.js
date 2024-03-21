import * as Yup from "yup";

export function initialValues() {
    return{
        email: "",
        password: "",
        repeatPassword: "",
        contidionsAccepted: false,
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("Campo Obligatorio"),
        password: Yup.string().required("Campo Obligatorio"),
        repeatPassword: Yup.string().required("Campo Obligatorio").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        contidionsAccepted: Yup.bool().isTrue(true),
    })
}