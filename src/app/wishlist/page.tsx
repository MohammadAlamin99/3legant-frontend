import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import Wishlist from "@/components/profile/Wishlist";
import React from "react";

export default function page() {
  return (
    <div>
      <Announcedbar />
      <NavMenu />
      <Wishlist />
      <Footer />
    </div>
  );
}
