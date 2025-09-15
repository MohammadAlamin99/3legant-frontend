import { getProductById } from "@/actions/product.action";
import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import JustIn from "@/components/JustIn";
import NavMenu from "@/components/NavMenu";
import ProductDetails from "@/components/ProductDetails";
import Review from "@/components/Review";

export default async function Page() {
    const product = await getProductById("68c7b80262c1e2ac6d5624a4");
    console.log(product)
    return (
        <>
            <Announcedbar />
            <NavMenu />
            <ProductDetails />
            <JustIn/>
            <Review/>
            <Footer/>
        </>
    );
}


