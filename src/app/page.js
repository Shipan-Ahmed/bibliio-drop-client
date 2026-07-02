export const dynamic = 'force-dynamic';
import HeroBanner from "../Components/HeroBanner";
import FeaturedBooks from "../Components/FeaturedBooks";
import TopLibrarians from "../Components/TopLibrarians";
import PopularCategories from "../Components/PopularCategories";

export default function Home() {
  return (
    <div >
        <HeroBanner/>
        <FeaturedBooks/>
       <TopLibrarians />
       <PopularCategories/>
    </div>
  );
}
