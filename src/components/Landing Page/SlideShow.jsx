import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function SlideShow() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2560 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 2560, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 320 },
      items: 1,
    },
  };

  return (
    <div className="w-full gap-x-20">
      <Carousel responsive={responsive}>
        <Link to={"/products/Skincare"}>
          <ProductCard
            imgSrc={"The_Ordinary.png"}
            altText={"Skincare Photo"}
            customCss={"w-24 md:pt-5"}
            labelText={"SKIN CARE"}
          />
        </Link>

        <Link to={"/products/Haircare"}>
          <ProductCard
            imgSrc={"haircare.png"}
            altText={"Haircare Photo"}
            customCss={"w-44 pt-12"}
            labelText={"HAIR CARE"}
          />
        </Link>

        <Link to={"/products/Makeup"}>
          <ProductCard
            imgSrc={"makeup.png"}
            altText={"Makeup Photo"}
            customCss={"w-24 pt-3"}
            labelText={"MAKEUP"}
          />
        </Link>

        <Link to={"/products/Bodycare"}>
          <ProductCard
            imgSrc={"bodycare.png"}
            altText={"Bodycare Photo"}
            customCss={"w-20 pt-5"}
            labelText={"BODY CARE"}
          />
        </Link>

        <Link to={"/products/Fragrance"}>
          <ProductCard
            imgSrc={"fragrance.png"}
            altText={"Fragrance Photo"}
            customCss={"w-28 pt-2"}
            labelText={"FRAGRANCE"}
          />
        </Link>

        <Link to={"/products/Supplements"}>
          <ProductCard
            imgSrc={"supplement.png"}
            altText={"Supplement Photo"}
            customCss={"w-24 pt-9"}
            labelText={"SUPPLEMENT"}
          />
        </Link>
      </Carousel>
    </div>
  );
}
