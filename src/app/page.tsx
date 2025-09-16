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
import { Suspense } from "react";
import BestSellerSkeleton from "@/components/Loading/BestSellerSkeleton";
import CategorySkeleton from "@/components/Loading/CategorySkeleton";
import CollectionSkeleton from "@/components/Loading/CollectionSkeleton";
import BlogSkeleton from "@/components/Loading/BlogSkeleton";
export default function Page() {
  return (
    <>
      <Announcedbar />
      <NavMenu />
      <HeroBanner />
      <JustIn />
      <Suspense fallback={<CategorySkeleton />}>
        <Category />
      </Suspense>
      <Suspense fallback={<CollectionSkeleton />}>
        <Collection />
      </Suspense>
      <Suspense fallback={<BestSellerSkeleton />}>
        <BestSeller />
      </Suspense>
      <PromotionBanner />
      <PromotionVideo />
      <Suspense fallback={<BlogSkeleton />}>
        <Blog />
      </Suspense>
      <InstaFeed />
      <Support />
      <Footer />
    </>
  );
}
