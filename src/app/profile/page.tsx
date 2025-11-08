import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import Profile from "@/components/profile/MyAccount";
import React from "react";

export default function page() {
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <Profile />
      <Footer />
    </>
  );
}
