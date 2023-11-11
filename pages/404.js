import "/app/scss/global.scss";

import { Ubuntu } from "next/font/google";
import Header from "/app/components/ui/header";
import Footer from "/app/components/ui/footer";
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export default function Custom404() {
  return (
    <main
      className={`bg-[url('/icon/red-bg.svg/')] bg-cover bg-center ${ubuntu.className}`}
    >
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            404
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-200 mb-4">
            Please check the URL or if you think this is an error, please
            contact us.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
