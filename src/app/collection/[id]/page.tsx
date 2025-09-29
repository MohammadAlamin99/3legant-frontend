import Announcedbar from "@/components/Announcedbar";
import CollectionProduct from "@/components/collection/CollectionProduct";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";

export default function Page() {
    return (
        <>
          <Announcedbar/>
          <NavMenu/>
          <CollectionProduct/>
          <Footer/>
        </>
    );
}
