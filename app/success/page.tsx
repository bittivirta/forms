"use client";
// success page
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import { useSearchParams } from "next/navigation";

export default function Success_page() {
  const searchParams = useSearchParams();
  let reqId = "";
  if (searchParams) {
    reqId = searchParams.get("id")?.toString() as string;
  }

  // validate that UUID is within the correct UUID4 format, if not return 404 page. Validate uuid does only do a regex check, not a full UUID check from database.
  function validateUUID(uuid: string) {
    const regex = new RegExp(
      "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-4[0-9a-fA-F]{3}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$"
    );
    return uuid.match(regex);
  }
  // if UUID is not valid, return 404 page
  if (!validateUUID(reqId)) {
    return (
      <main className="bg-[url('/icon/red-bg.svg/')] bg-cover bg-center">
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
  // if UUID is valid, return success page
  return (
    <main className="bg-[url('/icon/blue-bg.svg/')] bg-cover bg-center">
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            Form submitted successfully!
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-200 mb-4">
            Thank you for your submission! If you have any questions, please
            include your submission ID in your message.
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            Submission ID: {reqId}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
