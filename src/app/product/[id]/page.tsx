import Announcedbar from "@/components/Announcedbar";
import JustIn from "@/components/JustIn";
import NavMenu from "@/components/NavMenu";
import ProductDetails from "@/components/ProductDetails";
import Review from "@/components/Review";

export default function Page() {
    return (
        <>
            <Announcedbar />
            <NavMenu />
            <ProductDetails />
            <JustIn/>
            <Review/>
        </>
    );
}


