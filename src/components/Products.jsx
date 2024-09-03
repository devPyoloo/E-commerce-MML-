import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <div className="bg-lightpurple flex flex-col justify-center items-center p-40 gap-20">
      <section>
        <h1 className="font-russo tracking-wider text-4xl font-extrabold">
          PRODUCTS
        </h1>
      </section>

      <div className="grid grid-cols-4 gap-10">
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
          imgSrc={"bodycare.png"}
          altText={"Bodycare Photo"}
          customCss={"md:w-20 pt-5"}
          labelText={"BODY CARE"}
        />

        <ProductCard
          imgSrc={"supplement.png"}
          altText={"Supplement Photo"}
          customCss={"md:w-24 pt-9"}
          labelText={"SUPPLEMENT"}
        />
      </div>
    </div>
  );
}
