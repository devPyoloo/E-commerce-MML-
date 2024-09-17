export default function About() {
  return (
    <div className="about-section flex flex-col justify-center items-center md:p-40 mx-10">
      <section className="flex flex-col gap-y-10 md:gap-y-20">
        <h1 className="font-extrabold text-2xl md:text-4xl text-center font-poppins">
          ABOUT US
        </h1>

        <p className="font-light md:text-2xl text-justify md:leading-normal">
          At MML, we believe that beauty is more than skin deep. Founded with a
          passion for enhancing natural beauty, we are dedicated to curating a
          collection of high-quality cosmetics, skincare, and wellness products.
          Our mission is to provide a personalized shopping experience where
          each customer feels valued and empowered.
        </p>
      </section>
    </div>
  );
}
