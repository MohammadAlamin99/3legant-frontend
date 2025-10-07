import Announcedbar from "@/components/Announcedbar";
import CartDetails from "@/components/cart/CartDetails";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";

export default function Page() {
    return (
        <>
            <Announcedbar />
            <NavMenu />
            <CartDetails />
            <Footer/>
        </>
    );
}

