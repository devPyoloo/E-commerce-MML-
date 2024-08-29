import About from "./About";
import { useRef } from "react";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-evenly mx-20">
        <div className="flex items-center justify-evenly gap-10">
          <section>
            <p className="text-2xl font-light pt-40 text-justify mr-20 mb-10 leading-10">
              Welcome to{" "}
              <span className="text-white before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-satpink relative inline-block">
                <span className="relative text-white font-semibold">MML</span>
              </span>
              , your neighborhood destination for beauty essentials. Explore our
              handpicked selection of cosmetics, skincare, and wellness products
              to enhance your daily routine.
            </p>
            <button className="bg-black px-8 py-3 text-xl text-white rounded-full font-semibold hover:bg-white hover:text-black transition duration-500 ease-in-out">
              Explore
            </button>
          </section>

          <img
            src="/src/assets/image_2.png"
            className="w-80 drop-shadow-2xl transition duration-500 hover:scale-110"
            alt=""
          />
        </div>
      </div>

      {/* About section... */}
      <About />
    </>
  );
}
