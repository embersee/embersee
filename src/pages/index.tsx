import React from "react";
import { ASCII } from "@/components/ascii";
import { Nav } from "@/components/ui/nav";
import Landing from "@/components/sections/landing";
import { useGui } from "@/lib/store";
import ContactForm from "@/components/sections/contact-form";
import { cn } from "@/components/utils/classnames";

function Index() {
  const { loading } = useGui();

  return (
    <>
      <ASCII />

      <div className={cn("", loading && "hidden")}>
        <Nav />
        <Landing />
        <ContactForm />
      </div>
    </>
  );
}

export default Index;
