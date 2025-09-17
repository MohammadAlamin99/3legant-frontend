import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import HeroBanner from "@/components/Shop/HeroBanner";
import ShopProduct from "@/components/Shop/ShopProduct";

export default function Page() {
    return (
        <>
            <Announcedbar />
            <NavMenu/>
            <HeroBanner/>
            <ShopProduct/>
            <Footer/>
        </>
    );
}

