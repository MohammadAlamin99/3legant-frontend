import { getProductById } from "@/actions/product.action";
import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import JustIn from "@/components/JustIn";
import NavMenu from "@/components/NavMenu";
import ProductDetails from "@/components/ProductDetails";
import Review from "@/components/Review";

interface PageProps {
  params: { id: string };
}
export default async function Page({ params }: PageProps) {
  const { id } = params;
  const product = await getProductById(id);
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <ProductDetails product={product} />
      <JustIn />
      <Review />
      <Footer />
    </>
  );
}