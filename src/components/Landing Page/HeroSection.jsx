import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      <div className="flex items-center justify-evenly mx-10 md:mx-20 mb-36">
        <div className="flex items-center justify-evenly gap-10">
          <section>
            <h1 className="font-bold text-4xl md:text-7xl font-lora mb-5 mt-10">
              Elevate Your Beauty Routine with{" "}
              <span className="text-white before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-satpink relative inline-block">
                <span className="relative text-white font-semibold">MML</span>
              </span>
            </h1>
            <p className="text-lg lg:text-2xl font-light text-justify md:mr-20 mb-10 md:leading-10">
              Discover curated cosmetics, skincare, and wellness products to
              enhance your glow. Explore and find your new essentials.
            </p> 
            <Link to={"products/All"}>
            <button className="bg-black px-8 py-4 text-xl text-white rounded-full font-semibold hover:bg-white hover:text-black transition duration-500 ease-in-out">
              Shop Now
            </button>
            </Link>
           
          </section>

          <img
            src="/assets/landing_img.png"
            className="md:w-80 md:block drop-shadow-2xl hidden"
            alt="Perfume Photo"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
