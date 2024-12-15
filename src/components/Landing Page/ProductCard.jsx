import { PropTypes } from 'prop-types'

export default function ProductCard({imgSrc, altText, customCss, labelText}) {
 return (
     <div className="bg-mutedgray flex justify-center items-center h-80 gap-y-5 rounded-md hover:-translate-y-6 transition-transform duration-500 ease-in-out cursor-pointer w-72 md:h-72">
      <div className="flex flex-col justify-center items-center gap-y-3">
      <img
            src={`https://res.cloudinary.com/du1mw6ozf/image/upload/v1733220598/${imgSrc}`}
            alt={`${altText}`}
            className={`drop-shadow-sm lg:drop-shadow-2xl ${customCss} -ml-6`}
          />
          <label className="text-center text-xl font-poppins -ml-6">{labelText}</label>
      </div>
     

     </div>
 )
}

ProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  customCss: PropTypes.string,
  labelText: PropTypes.string.isRequired
}