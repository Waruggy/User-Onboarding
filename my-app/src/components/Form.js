import React from 'react'; 
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({values, errors, touched, isSubmitting}) {
    return (
    <Form>
        <div>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type ="name" name="name" placeholder="Name" />
        </div>
        <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password" />
        </div>
        <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms of Service
        </label>
        <Field component="select" name="member">
            <option value="elite">Elite</option>
            <option value="novice">Novice</option>
            <option value="rookie">Rookie</option>
        </Field>
        <button disabled={isSubmitting}>Submit</button>
    </Form>
    );
}

const formikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos, member }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            member: member || "novice"
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least three characters long"),
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least eight characters long")
            .required("Password is required"),
    }),
    
    handleSubmit(values, { resetForm, setErrors, setSubmitting }){
        if (values.email ==="alreadytaken") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log(res);
                    resetForm();
                    setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
        }
    }   
})(LoginForm);

export default formikLoginForm;