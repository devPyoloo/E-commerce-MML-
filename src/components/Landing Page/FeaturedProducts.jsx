import SlideShow from "./SlideShow";

export default function Products() {
  return (
    <div className="flex flex-col justify-center items-center py-40 px-20 gap-20">
      <section>
        <h1 className="font-poppins text-2xl md:text-4xl font-extrabold">
          PRODUCTS
        </h1>
      </section>

        <SlideShow />
    </div>
  );
}
