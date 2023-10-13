"use client";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

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
  error: string;
  submit: string;
}

async function fetchForm(id: string | null): Promise<BivForm> {
  try {
    if (!id) {
      throw new Error("Form ID is missing");
    }
  } catch (error) {
    console.error(error);
    return {
      title: "",
      description: "",
      fields: [],
      error: "No data found",
      submit: "",
    };
  }
  const formurl = "/api/forms?id=" + id;
  const response = await fetch(formurl);
  const json = await response.json();
  // if form contains form.fields submit then return json, if doesnt add submit button
  try {
    if (!json.fields) {
      throw new Error("Form fields are missing");
    }
  } catch (error) {
    console.error(error);
    return {
      title: "",
      description: "",
      fields: [],
      error: "No data found",
      submit: "",
    };
  }
  if (json.fields.find((field: FormField) => field.id === "submit")) {
    return json;
  }

  json.fields.push({
    id: "submit",
    type: "submit",
  });
  return json;
}

export default function Form() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<BivForm | null>(null);
  const reqId = searchParams.get("id");

  useEffect(() => {
    async function loadForm() {
      if (!form) {
        const form = await fetchForm(reqId);
        setForm(form);
      }
    }

    loadForm();
  });

  if (!form) {
    return null;
  }
  //if fetched form contains {"error":"No data found"} then return 404 page
  if (form.error || form.fields.length === 0) {
    return (
      <main className="dark:bg-primary-900">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
              404 - Requested form not found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Please check the URL or if you think this is an error, please
              contact us at on Discord.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  return (
    <main className="dark:bg-primary-900">
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            {form.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200">
            {form.description}
          </p>
        </div>
        <div>
          <form method="post">
            {form.fields.map((field, i) => (
              <div className="p-4" key={i}>
                <label
                  htmlFor={field.id}
                  className="block text-primary-600 dark:text-gray-200"
                >
                  {field.label}
                  <span className="text-red-500">
                    {" "}
                    {field.required ? " *" : ""}
                  </span>
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`w-full p-2 mt-2 rounded-lg bg-primary-200 dark:bg-gray-700 border-gray-300 text-gray-600 border-2 focus:outline-none focus:border-primary-500 dark:focus:border-gray-500`}
                  value={searchParams.get(field.id) || undefined}
                />
              </div>
            ))}
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
