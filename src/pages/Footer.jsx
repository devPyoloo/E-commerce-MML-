export default function Footer() {
  return (
    <footer className="flex justify-evenly items-center bg-satpink p-20 gap-40">
      <div className="social flex gap-5">
        <img
          src="/src/assets/twitter_logo.png"
          alt="Twitter Logo"
          className="w-16 hover:scale-110 transition-all duration-500 ease-in-out"
          loading="lazy"
        />
        <img
          src="/src/assets/fb_logo.png"
          alt="Facebook Logo"
          className="w-16 hover:scale-110 transition-all duration-500 ease-in-out"
          loading="lazy"
        />
        <img
          src="/src/assets/ig_logo.png"
          alt="Instagram Logo"
          className="w-16 hover:scale-110 transition-all duration-500 ease-in-out"
          loading="lazy"
        />
        <img
          src="/src/assets/tiktok_logo.png"
          alt="Tiktok Logo"
          className="w-16 hover:scale-110 transition-all duration-500 ease-in-out"
          loading="lazy"
        />
      </div>

      <section className="grid grid-cols-2">
        <div>
          <h1 className="font-semibold text-2xl text-white">Shop</h1>
          <p className="text-xl text-white font-light my-5">Skin care</p>
          <p className="text-xl text-white font-light my-5">Hair care</p>
          <p className="text-xl text-white font-light my-5">Body care</p>
          <p className="text-xl text-white font-light my-5">Supplement</p>
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
    </footer>
  );
}
