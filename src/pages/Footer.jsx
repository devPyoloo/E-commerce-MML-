import { BsArrowUp } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior:'smooth'})
  }

  
  return (
    <footer className="bg-satpink px-20 pt-20">
      <div className="flex justify-evenly items-center gap-40 pb-20">
        <div className="social flex gap-5">
          <img
            src="/src/assets/twitter_logo.png"
            alt="Twitter Logo"
            aria-label="Twitter"
            className="w-16 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/src/assets/fb_logo.png"
            alt="Facebook Logo"
            aria-label="Facebook"
            className="w-16 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/src/assets/ig_logo.png"
            alt="Instagram Logo"
            aria-label="Instagram"
            className="w-16 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
          <img
            src="/src/assets/tiktok_logo.png"
            alt="Tiktok Logo"
            aria-label="Tiktok"
            className="w-16 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer"
            loading="lazy"
          />
        </div>

        <section className="grid grid-cols-2">
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-2xl text-white">Shop</h1>
            <Link className="text-xl text-white font-light ">Skin care</Link>
            <Link className="text-xl text-white font-light">Hair care</Link>
            <Link className="text-xl text-white font-light">Body care</Link>
            <Link className="text-xl text-white font-light">Supplement</Link>
          </div>
          <div className="">
            <h1 className="font-semibold text-2xl text-white ">Location</h1>
            <p className="text-xl text-white font-light my-5">
              Region II Isabela, San Mateo, Isabela, 3318
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9327646631955!2d121.58532583176859!3d16.879220218672526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x338fffac24e3646f%3A0x97a960f422502093!2sDr.%20Jose%20Rizal%20Park%2C%20Santiago%20-%20Tuguegarao%20Rd%2C%20San%20Mateo%2C%20Isabela!5e0!3m2!1sen!2sph!4v1725083184931!5m2!1sen!2sph"
              width="350"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="drop-shadow-2xl"
            ></iframe>
          </div>
        </section>
      </div>
      
      <div className="flex justify-between pb-1">
      <span className="text-lg text-white font-light tracking-wider">Copyright &copy; MML 2024. Developed by devPyoloo</span>
      <button onClick={scrollToTop} className="flex text-white font-semibold text-xl">Scroll to top <BsArrowUp className="text-2xl ml-2"/></button>
      </div>
      
    </footer>
  );
}
