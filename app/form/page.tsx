"use client";

import Header from "../components/ui/header";
import Footer from "../components/ui/footer";


const form = {
  "title": "Example Form",
  "description": "This is an example form.",
  "fields": [
    // ["id", "type", "label", "placeholder", "required"  ]
    ["name", "text", "Name", "Your name", true],
    ["email", "email", "Email", "Your email", true],
    ["phone", "tel", "Phone", "Your phone number", false],
    ["message", "textarea", "Message", "Your message", true],
    ["submit", "submit", "Submit", "Submit", true]
  ]
}


function ShowForm(json) {
  // parse json and create form with included fields.
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          {json.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {json.description}
        </p>
      </div>
      <div>
        {json.fields.map((field, i) => (
          <form key={i}>
          <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
            <h2 className="text-3xl font-extrabold leading-tight">
              {field[2]}
            </h2>
            <input type={field[1]} placeholder={field[3]} required={field[4]} />
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