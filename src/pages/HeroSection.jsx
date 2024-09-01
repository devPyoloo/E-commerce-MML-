export default function HeroSection() {
  return (
    <>
      <div className="flex items-center justify-evenly mx-20 mb-36">
        <div className="flex items-center justify-evenly gap-10">
          <section>
            <h1 className="font-bold text-7xl font-lora mb-5 mt-10">
              Elevate Your Beauty Routine with{" "}
              <span className="text-white before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-satpink relative inline-block">
                <span className="relative text-white font-semibold">MML</span>
              </span>
            </h1>
            <p className="text-2xl font-light text-justify mr-20 mb-10 leading-10">
              Discover curated cosmetics, skincare, and wellness products to
              enhance your glow. Explore and find your new essentials.
            </p>
            <button className="bg-black px-8 py-4 text-xl text-white rounded-full font-semibold hover:bg-white hover:text-black transition duration-500 ease-in-out">
              Shop Now
            </button>
          </section>

          <img
            src="/src/assets/img_1.png"
            className="w-80 drop-shadow-2xl"
            alt="Perfume Photo"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
