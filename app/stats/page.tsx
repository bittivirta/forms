"use client";
// STATS PAGE
import { useState, useEffect, FormEvent } from "react";

import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faPaperPlane } from "@fortawesome/pro-solid-svg-icons";

import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

interface BivForm {
  general?: {
    title: string;
    description: string;
    fields: [];
    response_amount: number;
    avg_duration: number;
    duration_available: number;
  };
  responses: [];
  error?: string;
}

// call api to get form data or search specific form data with uuid
async function fetchFormStats(id: string | null): Promise<BivForm> {
  try {
    if (!id) {
      throw new Error("Form ID is missing");
    }
  } catch (error) {
    console.error(error);
    return {
      error:
        "Please check the URL or if you think this is an error, please contact us.",
      responses: [],
    };
  }
  const formurl = "/api/formstats?id=" + id;
  const response = await fetch(formurl);
  const json = await response.json();
  // if form contains form.fields submit then return json, if doesnt add submit button
  try {
    if (!json.general || !json.responses) {
      throw new Error("Form fields are missing");
    }
  } catch (error) {
    console.error(error);
    return {
      error:
        "Please check the URL or if you think this is an error, please contact us.",
      responses: [],
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

  useEffect(() => {
    async function loadForm() {
      if (!form) {
        const form = await fetchFormStats(reqId);
        setForm(form);
      }
    }

    loadForm();
  });
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
  const responseData = form.responses;
  //if fetched form contains {"error":"No data found"} then return 404 page
  if (form.error || !form.general) {
    return (
      <main className="bg-[url('/icon/red-bg.svg/')] bg-cover bg-center">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
              404
            </h1>
            <p className="text-3xl text-gray-600 dark:text-gray-200">
              Please check the URL or if you think this is an error, please
              contact us.
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
            {form.general.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200">
            {form.general.description}
          </p>
          <hr className="p-4 mt-4" />
          <div className="flex flex-row">
            <div className="w-1/2">
              <p className="text-xl text-gray-600 dark:text-gray-200 w-full">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  fixedWidth
                  className="mr-2"
                />
                {form.general.response_amount}{" "}
                {form.general.response_amount > 1 ? "responses" : "response"}{" "}
              </p>
            </div>
            <div className="w-1/2">
              <p className="text-xl text-gray-600 dark:text-gray-200 w-full">
                <FontAwesomeIcon
                  icon={faStopwatch}
                  fixedWidth
                  className="mr-2"
                />
                Average form submission time {form.general.avg_duration}{" "}
                {form.general.duration_available !== 0
                  ? "seconds"
                  : "not availablex"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
