import PropTypes from "prop-types";

const Button = ({ variant, children, onClick, disabled, ...rest }) => {
  const baseClass =
    "py-2 px-4 rounded-lg font-semibold transition-all duration-300";
  const variantClass =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-gray-500 text-white hover:bg-gray-600";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "opacity-100";

  return (
    <button
      className={`${baseClass} ${variantClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
