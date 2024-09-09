import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function RenderProducts({
  sortedProducts,
  imageLoaded,
  handleImageLoad,
  ref,
  isFetching,
}) {
  return (
    <div className="flex flex-col">
      <main className="grid gap-x-16 md:grid-cols-4 gap-y-32 cursor-pointer">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <figure className="product-card" key={product.id}>
              <Link to={product.id.toString()}>
                <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56 overflow-hidden">
                  {!imageLoaded[product.id] && (
                    <div className="w-28 h-28 bg-gray-200 animate-pulse"></div>
                  )}
                  <img
                    className={`2xl:w-28 w-20 object-center drop-shadow-lg hover:scale-125 transition-transform duration-300 ease-out ${
                      imageLoaded[product.id] ? "block" : "hidden"
                    }`}
                    src={product.image}
                    alt={product.name}
                    onLoad={() => handleImageLoad(product.id)}
                  />
                </div>

                <div className="relative flex flex-col items-start gap-y-1">
                  <label className="font-semibold truncate w-full">
                    {product.name}
                  </label>
                  <label className="text-gray-700">
                    Stock left: {product.stock}
                  </label>
                  <label className="flex justify-between items-center">
                    $ {product.price}
                  </label>
                </div>
              </Link>
              {/* // Loads the reamining products */}
              <div ref={ref}>{isFetching && <p>Loading...</p>}</div>
            </figure>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
}

RenderProducts.propTypes = {
  sortedProducts: PropTypes.array.isRequired,
  imageLoaded: PropTypes.object.isRequired,
  handleImageLoad: PropTypes.func.isRequired,
  ref: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
