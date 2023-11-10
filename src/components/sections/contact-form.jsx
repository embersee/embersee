import { Page } from "@/components/ui/page";
import Button from "@/components/ui/button";
import { BackToTop, EnableExperimentation } from "../utils/scroll-buttons";

import { useState } from "react";
import CrossContainer from "@/components/ui/cross-container";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const url = import.meta.env.VITE_PUBLIC_URL;

  async function submit(e) {
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);
    const htmlFormData = new FormData(e.target);

    if (!isFormDataComplete(htmlFormData)) {
      setResponseMessage("Fill out all the fields.");
      setLoading(false);
      return;
    }

    await fetch(url, {
      mode: "no-cors",
      method: "POST",
      body: htmlFormData,
    });

    setLoading(false);
    setComplete(true);
    setResponseMessage("Message sent!");
  }

  return (
    <Page className="grid items-center">
      <section className="py-10 sm:py-20">
        <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <CrossContainer className="p-1 sm:p-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-3xl font-medium tracking-tighter sm:text-6xl">
                  Let's talk
                </h2>

                <div className="w-full max-w-md text-base">
                  <p>
                    Whether you have a project in mind, need a digital solution,
                    or just want to say hi, I'm all ears.
                  </p>
                  <div className="hidden sm:block">
                    <p>Drop me a message if you're looking for:</p>
                    <ul className="my-4 list-inside list-disc">
                      <li>
                        Eye-catching 3D visuals to make your web presence pop.
                      </li>
                      <li>Smart automation to streamline your workflows.</li>
                    </ul>
                    <p>
                      Or, if you have any questions or just want to connect,
                      that's great too.
                    </p>
                  </div>
                </div>

                <div className="mt-auto hidden sm:block">
                  <h3 className="mb-4 text-xl sm:text-2xl">Find me here:</h3>
                  <div className="flex items-center space-x-4 text-lg">
                    <Button href="https://github.com/embersee" blank>
                      Github
                    </Button>
                    <Button href="https://t.me/embersee" blank>
                      Telegram
                    </Button>
                    <Button href="mailto:embersee@proton.me">Email</Button>
                  </div>
                </div>
              </div>

              <form onSubmit={submit} className="my-4 flex flex-col gap-y-6">
                <div className="space-y-2">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="input-field"
                    placeholder="Type here"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="input-field"
                    placeholder="Type here"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={3}
                    className="input-field"
                    placeholder="Type here"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    className="submit-button"
                    type="submit"
                    disabled={loadingState || complete}
                  >
                    Submit
                  </button>
                  <p className="text-accent text-xl">{responseMessage}</p>
                </div>
              </form>
            </div>
          </CrossContainer>
        </div>
      </section>
      <div className="my-4 mt-auto flex w-full items-center justify-center space-x-4">
        <BackToTop />
        <EnableExperimentation />
      </div>
    </Page>
  );
}

function isFormDataComplete(formData) {
  for (let [key, value] of formData.entries()) {
    if (!value || value.trim() === "") {
      return false; // Found an empty field
    }
  }
  return true; // All fields are filled
}
