export default function About() {
  return (
    <div className="flex flex-col justify-center items-center bg-offpink p-32">
      <section className="">
      <h1 className="font-extrabold text-4xl text-center font-russo tracking-wider">ABOUT US</h1>
      <div className="line w-full h-1 bg-black"></div>

      {/* <img 
        src="/src/assets/line.png" 
        alt="Line"
        className="drop-shadow-xl w-80" /> */}
      </section>
      <p className="font-light text-2xl text-justify leading-normal">At MML, we believe that beauty is more than skin deep. Founded with a passion for enhancing natural beauty, we are dedicated to curating a collection of high-quality cosmetics, skincare, and wellness products. Our mission is to provide a personalized shopping experience where each customer feels valued and empowered.</p>
    </div>
  )
}