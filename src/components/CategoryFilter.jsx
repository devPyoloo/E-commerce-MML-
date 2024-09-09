import PropTypes from 'prop-types'

export default function CategoryFilter({ category, setCategory }) {

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
    <aside className="sticky top-40 mr-20 flex flex-col gap-4 w-64">
    {categories.map((cat) => (
      <div className="border-t border-t-lightblack pt-2" key={cat}>
        <button
          className={` ${cat === category ? "font-medium" : ""}`}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      </div>
    ))}
  </aside>
  )
}

CategoryFilter.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.string.isRequired
}