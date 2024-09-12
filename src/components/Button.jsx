import PropTypes from 'prop-types'


export default function Button({ children, onClick, buttonType }) {
  return (
    <button onClick={onClick} className={`w-full rounded-full text-xl py-6  ${buttonType === "secondary" ? "flex justify-center items-center gap-4 text-lightgray border-2 border-lighgray hover:border-black" : "bg-mutedblack text-white hover:opacity-90"}`}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  buttonType: PropTypes.string.isRequired
}
