"use client";

import Header from "./components/ui/header";
import Footer from "./components/ui/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <article>
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Bittivirta Boilerplate 23</h1>
              <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 lg:mb-12 lg:text-xl">
                The default <span className="font-medium text-gray-900 dark:text-white">Next.js</span> app
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-5">
              <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <h2 className="text-3xl font-extrabold leading-tight">Next.js</h2>
                <span className="text-primary-500 dark:text-primary-400">As the base</span>
              </div>
              <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <h2 className="text-3xl font-extrabold leading-tight">TypeScript</h2>
                <span className="text-primary-500 dark:text-primary-400">As the language</span>
              </div>
              <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <h2 className="text-3xl font-extrabold leading-tight">Tailwind</h2>
                <span className="text-primary-500 dark:text-primary-400">As the CSS framework</span>
              </div>
              <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <h2 className="text-3xl font-extrabold leading-tight">Flowbyte</h2>
                <span className="text-primary-500 dark:text-primary-400">As the components</span>
              </div>
              <div className="rounded-lg bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <h2 className="text-3xl font-extrabold leading-tight">SCSS</h2>
                <span className="text-primary-500 dark:text-primary-400">As the CSS preprocessor</span>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </article>
    </main>
  );
}
