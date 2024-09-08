import { PropTypes } from 'prop-types'

export default function ProductCard({imgSrc, altText, customCss, labelText}) {
 return (
     <div className="bg-white flex flex-col items-center p-10 gap-5 rounded-md hover:-translate-y-6 transition-transform duration-500 ease-in-out cursor-pointer">
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