import PropTypes from 'prop-types'

export default function CategoryFilter({ category, handleCategoryChange }) {

  const categories = [
    "All",
    "Skincare",
    "Haircare",
    "Bodycare",
    "Makeup",
    "Fragrance",
    "Supplements",
  ];

  return (
    <>
     <aside className="sticky top-40 mr-20 md:flex flex-col gap-4 md:w-52 hidden">
    {categories.map((cat) => (
      <div className="border-t border-t-lightgray pt-2" key={cat}>
        <button
          className={` ${cat === category ? "font-medium" : ""}`}
          onClick={() => handleCategoryChange(cat)}
        >
          {cat}
        </button>
      </div>
    ))}
  </aside>

<aside className="sticky top-40 mr-20 flex flex-col gap-4 md:w-52 hidden">
{categories.map((cat) => (
  <div className="border-t border-t-lightgray pt-2" key={cat}>
    <button
      className={` ${cat === category ? "font-medium" : ""}`}
      onClick={() => handleCategoryChange(cat)}
    >
      {cat}
    </button>
  </div>
))}
</aside>
    </>
   
  )
}

CategoryFilter.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired
}