/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Imię może zawierać tylko litery")
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
  number: Yup.string()
    .matches(/^\d+(-\d+){0,2}$/, "Number moze zawierac tylko cyfry i myslniki")
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
});

export default function ContactForm({ onAdd }) {
  const handleAdd = (values, { resetForm }) => {
    onAdd({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactFormSchema}
      onSubmit={handleAdd}
    >
      {() => (
        <div className={css.formContainer}>
          <Form>
            <div className={css.formGroup}>
              <label>
                Name
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </label>
            </div>
            <div className={css.formGroup}>
              <label>
                Number
                <Field type="tel" name="number" />
                <ErrorMessage name="number" component="div" />
              </label>
            </div>
            <div className={css.buttonContainer}>
              <button type="submit" className={css.button}>
                Add contact
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
