import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
  number: Yup.string()
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
});

export default function ContactForm({ onAdd }) {
  const handleAdd = (values, { resetForm }) => {
    onAdd({
      id: Date.now(),
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
