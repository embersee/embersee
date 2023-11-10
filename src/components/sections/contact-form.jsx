import { Page } from "@/components/ui/page";
import Button from "@/components/ui/button";
import { BackToTop, EnableExperimentation } from "../utils/scroll-buttons";

import { useState } from "react";
import Container from "../ui/container";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState();
  const [loadingState, setLoading] = useState(false);

  const url = import.meta.env.VITE_PUBLIC_URL;

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const htmlFormData = new FormData(e.target);

    await fetch(url, {
      mode: "no-cors",
      method: "POST",
      body: htmlFormData,
    });

    setLoading(false);
    setResponseMessage("Message sent!");
  }

  return (
    <Page className="grid items-center">
      <section className="py-10 sm:py-20">
        <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
            <Container>
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
                  <h3 className="text-xl sm:text-2xl">Find me here:</h3>
                  <div className="flex items-center space-x-2 text-lg">
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
            </Container>
            <form onSubmit={submit} className="my-4 flex flex-col gap-y-6">
              <div className="space-y-2">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full appearance-none rounded-lg bg-primary-50/70 px-4 py-4 text-lg ring-2 ring-primary-400/40 transition placeholder:uppercase placeholder:text-primary-950/60 hover:ring-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:bg-primary-950/70 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
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
                  className="block w-full appearance-none rounded-lg bg-primary-50/70 px-4 py-4 text-lg ring-2 ring-primary-400/40 transition placeholder:uppercase placeholder:text-primary-950/60 hover:ring-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:bg-primary-950/70 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
                  placeholder="Type here"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  className="block w-full appearance-none rounded-lg bg-primary-50/70 px-4 py-4 text-lg ring-2 ring-primary-400/40 transition placeholder:uppercase placeholder:text-primary-950/60 hover:ring-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:bg-primary-950/70 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
                  placeholder="Type here"
                ></textarea>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-transparent bg-background px-5 py-3 text-lg text-emerald shadow outline outline-2 outline-emerald transition placeholder:uppercase hover:bg-emerald hover:text-background hover:shadow-emerald focus-visible:outline-emerald active:translate-y-1 disabled:active:translate-y-0 dark:text-emerald "
                  type="submit"
                  disabled={loadingState}
                >
                  Submit
                </button>
                <p className="text-xl text-emerald">{responseMessage}</p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="mt-10 flex w-full items-center justify-center space-x-4">
        <BackToTop />
        <EnableExperimentation />
      </div>
    </Page>
  );
}
