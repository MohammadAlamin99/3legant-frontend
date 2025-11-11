import Announcedbar from "@/components/Announcedbar";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import React from "react";

export default function page() {
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <Contact />
      <Footer />
    </>
  );
}
