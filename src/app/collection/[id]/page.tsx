import Announcedbar from "@/components/Announcedbar";
import CollectionProduct from "@/components/collection/CollectionProduct";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import Banner from "@/components/Shop/HeroBanner";

export default function Page() {
    return (
        <>
          <Announcedbar/>
          <NavMenu/>
          <Banner/>
          <CollectionProduct/>
          <Footer/>
        </>
    );
}
