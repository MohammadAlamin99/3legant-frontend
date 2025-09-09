import { getProduct } from "@/actions/product";
import Announcedbar from "@/components/Announcedbar";
import HeroBanner from "@/components/HeroBanner";
import NavMenu from "@/components/NavMenu";
import Slider from "@/components/Slider";
export default async function Page() {
  const products = await getProduct();

  return (
    <>
      <Announcedbar />
      <NavMenu />
      <HeroBanner />
      <Slider products={products} />
    </>
  );
}
