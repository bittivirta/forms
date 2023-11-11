"use client";
// FORM PAGE
import { useState, useEffect, FormEvent } from "react";

import { useSearchParams } from "next/navigation";

import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import Link from "next/link";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  value?: string;
  min?: string;
  max?: string;
  pattern?: string;
  step?: string;
  error?: string;
  hidden?: boolean;
  tc?: boolean;
  link: string;
}

interface BivForm {
  code?: string;
  title?: string;
  description?: string;
  fields: FormField[];
  error?: string;
  submit?: string;
  expires?: number;
}
async function fetchForm(id: string | null): Promise<BivForm> {
  try {
    if (!id) {
      throw new Error("Form ID is missing");
    }
  } catch (error) {
    return {
      error:
        "Please check the URL or if you think this is an error, please contact us.",
      fields: [],
    };
  }
  const formurl = "/api/forms?id=" + id;
  const response = await fetch(formurl);
  const json = await response.json();
  // if form contains form.fields submit then return json, if doesnt add submit button
  try {
    if (!json.fields || json.fields.error) {
      throw new Error(json.error);
    }
  } catch (error) {
    return {
      error: json.error,
      code: json.code,
      fields: [],
    };
  }
  return json;
}

export default function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const [form, setForm] = useState<BivForm | null>(null);
  let reqId = "";
  if (searchParams) {
    reqId = searchParams.get("id")?.toString() as string;
  }
  let starttime = Date.now();
  // generate random uuid
  const inputId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (starttime + Math.random() * 16) % 16 | 0;
      let z = Math.floor(starttime / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  useEffect(() => {
    async function loadForm() {
      if (!form) {
        const form = await fetchForm(reqId);
        setForm(form);
      }
    }

    loadForm();
  });
  // if form is not fetched yet, return loading page
  if (!form) {
    return (
      <main className="dark:bg-primary-900">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
              Loading...
            </h1>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      // convert formdata to json and get input values
      const object: { [key: string]: string } = {};
      formData.forEach(function (value, key) {
        object[key] = value.toString();
      });

      const userInput = object;
      const formid = reqId;
      let timestamp = Date.now();
      const formdata = { inputId, formid, starttime, timestamp, userInput };
      const response = await fetch("/api/formhandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();

      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      const errorMessage = error.message as string;
      setError(errorMessage);
      console.error(error);
    } finally {
      setTimeout(() => {
        if (reqId) {
          window.location.href = `/success?id=${inputId}`;
        }
      }, 150);
    }
  }

  //if fetched form contains {"error":"No data found"} then return 404 page
  if (form.error || form.fields.length === 0) {
    return (
      <main className="bg-[url('/icon/red-bg.svg/')] bg-cover bg-center">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
              {form.code || "404"}
            </h1>
            <p className="text-3xl text-gray-600 dark:text-gray-200">
              {form.error ||
                "Please check the URL or if you think this is an error, please contact us."}
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
        <div className="w-full">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            {form.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200">
            {form.description}
          </p>
          <p className="text-l text-red-900 dark:text-gray-200 py-4">
            {form.expires
              ? `This form is scheduled to close down at ` +
                new Date(form.expires * 1000).toUTCString() +
                "."
              : ""}
          </p>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-2">
              {form.fields.map((field, i) => (
                // if field.hidden is true then add hidden class
                <div className={field.hidden ? "hidden" : ""} key={i}>
                  <label
                    htmlFor={field.id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.label + " "}
                    {field.tc ? (
                      <Link
                        href={field.link ? field.link : "#"}
                        target="_blank"
                        className="text-blue-500"
                      >
                        {field.placeholder}
                      </Link>
                    ) : (
                      ""
                    )}
                    <span className="text-red-500">
                      {" "}
                      {field.required ? " *" : ""}
                    </span>
                  </label>

                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    name={field.id}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block border-2 p-4 mt-4 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={
                      searchParams?.get(field.id) || field.value || undefined
                    }
                    min={field.min}
                    max={field.max}
                    pattern={field.pattern}
                    step={field.step}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="p-4 auto-cols-max mt-4 rounded-lg bg-primary-200 dark:bg-gray-700 border-gray-300 text-gray-600 border-2 focus:outline-none focus:border-primary-500 dark:focus:border-gray-500 dark:placeholder-white dark:text-white"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
