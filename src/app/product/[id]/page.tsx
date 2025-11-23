import { getProductById } from "@/actions/product.action";
import { getReviewByProductId } from "@/actions/review.action";
import Announcedbar from "@/components/Announcedbar";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import Review from "@/components/Review";

interface PageProps {
  params: { id: string };
}
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <ProductDetails product={product} />
      <Review id={id} />
      <Footer />
    </>
  );
}
