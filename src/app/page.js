import { Button } from "@heroui/react";
import Image from "next/image";
import HeroBanner from "../Components/HeroBanner";
import FeaturedBooks from "../Components/FeaturedBooks";

export default function Home() {
  return (
    <div >
      <HeroBanner/>
      <FeaturedBooks/>
    </div>
  );
}
