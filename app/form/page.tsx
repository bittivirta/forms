"use client";
import { useState, useEffect } from "react";

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

async function fetchForm(): Promise<BivForm> {
  const response = await fetch("/api/forms?id=1");
  const json = await response.json();
  return json;
}

export default function Form() {
  const [form, setForm] = useState<BivForm | null>(null);

  useEffect(() => {
    async function loadForm() {
      const form = await fetchForm();
      setForm(form);
    }

    loadForm();
  }, []);

  if (!form) {
    return null;
  }
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            {form.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {form.description}
          </p>
        </div>
        <div>
          {form.fields.map((field, i) => (
            <form key={i}>
              <div className="p-4">
                <label
                  htmlFor={field.id}
                  className="block text-primary-600 dark:text-primary-300"
                >
                  {field.label}
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full p-2 mt-2 rounded-lg bg-primary-200 dark:bg-primary-300 text-gray-600 border-2 border-indigo-300 dark:bg-primary-800 dark:text-dark-300"
                />
              </div>
            </form>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
