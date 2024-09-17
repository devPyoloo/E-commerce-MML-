import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

export default function SlideShow() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2560 },
      items: 6, // Adjust for very large screens
    },
    desktop: {
      breakpoint: { max: 2560, min: 1024 },
      items: 4, // Adjust for standard desktops
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2, // Adjust for tablets
    },
    mobile: {
      breakpoint: { max: 768, min: 320 },
      items: 1, // Adjust for mobile devices
    },
  };

  return (
    <div className="w-full gap-x-20">
      <Carousel responsive={responsive} infinite={true} autoPlay={false}>
        <ProductCard
          imgSrc={"skincare.png"}
          altText={"Skincare Photo"}
          customCss={"md:w-16 pt-5"}
          labelText={"SKIN CARE"}
        />
        <ProductCard
          imgSrc={"haircare.png"}
          altText={"Haircare Photo"}
          customCss={"md:w-44 pt-12"}
          labelText={"HAIR CARE"}
        />
        <ProductCard
          imgSrc={"makeup.png"}
          altText={"Makeup Photo"}
          customCss={"md:w-32 pt-12"}
          labelText={"MAKEUP"}
        />
        <ProductCard
          imgSrc={"bodycare.png"}
          altText={"Bodycare Photo"}
          customCss={"md:w-20 pt-5"}
          labelText={"BODY CARE"}
        />
        <ProductCard
          imgSrc={"fragrance.png"}
          altText={"Fragrance Photo"}
          customCss={"md:w-28 pt-12"}
          labelText={"FRAGRANCE"}
        />
        <ProductCard
          imgSrc={"supplement.png"}
          altText={"Supplement Photo"}
          customCss={"md:w-24 pt-9"}
          labelText={"SUPPLEMENT"}
        />
      </Carousel>
    </div>
  );
}
