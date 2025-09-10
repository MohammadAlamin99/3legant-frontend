import { getCollection } from "@/actions/collection.action";
import { getProduct } from "@/actions/product.action";
import Announcedbar from "@/components/Announcedbar";
import Category from "@/components/Category";
import Collection from "@/components/Collection";
import HeroBanner from "@/components/HeroBanner";
import NavMenu from "@/components/NavMenu";
import Slider from "@/components/Slider";
export default async function Page() {
  const products = await getProduct();
  const section = "shop_by_category";
  const collection = await getCollection(section);
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <HeroBanner />
      <Slider products={products} />
      <Category collection={collection}/>
      <Collection/>
    </>
  );
}
