import HeroSection from "../components/HeroSection";
import FeaturesBar from "../components/FeaturesBar";
import CategorySection from "../components/CategorySection";
import BannerSection from "../components/BannerSection";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";
import GlobalRating from "../components/GlobalRating";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesBar />
      <CategorySection />
      <BannerSection />
      <PopularProducts />
      <Newsletter />
      <GlobalRating />
    </>
  );
}