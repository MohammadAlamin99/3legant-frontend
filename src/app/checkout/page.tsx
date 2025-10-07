import Announcedbar from "@/components/Announcedbar";
import CheckOut from "@/components/checkout/Checkout";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";

export default function Page() {

    return (
        <>
            <Announcedbar />
            <NavMenu/>
            <CheckOut/>
            <Footer/>
        </>
    );
}

