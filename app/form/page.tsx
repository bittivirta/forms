"use client";

import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface BivForm {
  title: string;
  description: string;
  fields: FormField[];
}

const form: BivForm = {
  title: 'Example Form',
  description: 'This is an example form.',
  fields: [
    { id: 'name', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Your email', required: true },
    { id: 'phone', type: 'tel', label: 'Phone', placeholder: 'Your phone number', required: false },
    { id: 'message', type: 'textarea', label: 'Message', placeholder: 'Your message', required: true },
    { id: 'submit', type: 'submit', label: 'Submit', placeholder: 'Submit', required: true }
  ]
};
function ShowForm(jsonval: BivForm) {
  // parse json and create form with included fields.
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          {jsonval.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {jsonval.description}
        </p>
      </div>
      <div>
        {jsonval.fields.map((field, i) => (
          <form key={i}>
          <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
            <h2 className="text-3xl font-extrabold leading-tight">
              {field.label}
            </h2>
            <input type={field.type} placeholder={field.placeholder} required={field.required} />

          </div></form>
        ))}
      </div>
    </div>
  );

}
export default function forms() {
  return (
    <main>
      <Header />
      <section className="bg-white dark:bg-gray-900">
      {ShowForm(form)}
      </section>
      <Footer />
    </main>
    );
}