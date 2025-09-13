import Announcedbar from "@/components/Announcedbar";
import Category from "@/components/Category";
import Collection from "@/components/Collection";
import HeroBanner from "@/components/HeroBanner";
import NavMenu from "@/components/NavMenu";
import JustIn from "@/components/JustIn";
import BestSeller from "@/components/BestSeller";
import PromotionBanner from "@/components/PromotionBanner";
import PromotionVideo from "@/components/PromotionVideo";
import Blog from "@/components/Blog";
import InstaFeed from "@/components/InstaFeed";
import Support from "@/components/Support";
import Footer from "@/components/Footer";
export default function Page() {
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <HeroBanner />
      <JustIn/>
      <Category/>
      <Collection />
      <BestSeller/>
      <PromotionBanner/>
      <PromotionVideo/>
      <Blog/>
      <InstaFeed/>
      <Support/>
      <Footer/>
    </>
  );
}
