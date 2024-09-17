import { PropTypes } from 'prop-types'

export default function ProductCard({imgSrc, altText, customCss, labelText}) {
 return (
    //  <div className="bg-mutedgray flex flex-col justify-center items-center md:w-72 md:h-72 gap-y-5 rounded-md hover:-translate-y-6 transition-transform duration-500 ease-in-out cursor-pointer">

<div className="bg-mutedgray mb-3 flex flex-col justify-center items-center md:w-72 md:h-72 hover:cursor-pointer hover:shadow-md">
     <img
            src={`/assets/${imgSrc}`}
            alt={`${altText}`}
            className={`drop-shadow-2xl ${customCss}`}
          />
          <label className="text-xl font-poppins">{labelText}</label>

     </div>
 )
}

ProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  customCss: PropTypes.string,
  labelText: PropTypes.string.isRequired
}