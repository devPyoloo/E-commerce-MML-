import { BsArrowUp } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior:'smooth'})
  }

  
  return (
    <footer className="bg-mutedblack text-offwhite pt-10 px-10 md:px-20 md:pt-20">
      <div className="flex-col-reverse md:flex-row flex md:justify-evenly items-center gap-24 md:gap-40 pb-20">
        <figure className="social flex flex-col gap-5">
          <h1 className="text-center text-xl font-medium md:text-2xl">Social Media</h1>
          <div className="flex gap-x-5">
          <img
            src="https://res.cloudinary.com/du1mw6ozf/image/upload/v1733220626/twitter_logo_fhhhhr.png"
            alt="Twitter Logo"
            aria-label="Twitter"
            className="w-11 h-11 md:w-16 md:h-auto hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/assets/fb_logo.png"
            alt="Facebook Logo"
            aria-label="Facebook"
            className="w-11 h-11 md:w-16 md:h-auto hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/assets/ig_logo.png"
            alt="Instagram Logo"
            aria-label="Instagram"
            className="w-11 h-11 md:w-16 md:h-auto hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/assets/tiktok_logo.png"
            alt="Tiktok Logo"
            aria-label="Tiktok"
            className="w-11 h-11 md:w-16 md:h-auto hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          </div>
          
        </figure>

        <section className="grid grid-cols-2 pt-10">
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-xl md:text-2xl text-white">Shop</h1>
            <Link to={"/products/Skincare"} className="md:text-xl text-white font-light ">Skincare</Link>
            <Link to={"/products/Haircare"} className="md:text-xl text-white font-light">Haircare</Link>
            <Link to={"/products/Fragrance"} className="md:text-xl text-white font-light">Fragrance</Link>
            <Link to={"/products/Makeup"} className="md:text-xl text-white font-light">Makeup</Link>
            <Link to={"/products/Bodycare"} className="md:text-xl text-white font-light">Bodycare</Link>
            <Link to={"/products/Supplements"} className="md:text-xl text-white font-light">Supplements</Link>
          </div>
          <div className="">
            <h1 className="font-semibold text-xl md:text-2xl text-white ">Location</h1>
            <p className="md:text-xl text-white font-light my-5">
              Tuen Mun, New Territories, Hong Kong 999077
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27753236.830687936!2d92.4351123!3d31.8835959!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403fb3b950dba4f%3A0xf6e98875cffa2a82!2sTuen%20Mun%2C%20Hong%20Kong!5e0!3m2!1sen!2sph!4v1733220301316!5m2!1sen!2sph"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="md:w-96 md:h-auto w-40 h-auto"
            ></iframe>
          </div>
        </section>
      </div>
      
      <div className=" relative md:flex justify-between items-center pb-1">
      <span className="text-xs md:text-lg text-white font-light md:tracking-wider">Copyright &copy; MML 2024. Developed by devPyoloo</span>
      <button onClick={scrollToTop} className="md:flex text-white font-semibold md:text-xl hidden ">Scroll to top <BsArrowUp className="md:text-2xl ml-2"/></button>

      <BsArrowUp onClick={scrollToTop} className="absolute -right-5 -top-7 bg-offwhite p-2 text-mutedblack rounded-full text-5xl md:hidden"/>
      </div>
      
    </footer>
  );
}
