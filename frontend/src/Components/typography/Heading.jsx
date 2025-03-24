import PropTypes from "prop-types";

export const H1 = ({ children, className = "" }) => (
  <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>
);

export const H2 = ({ children, className = "" }) => (
  <h2 className={`text-3xl font-semibold ${className}`}>{children}</h2>
);

export const H3 = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-medium ${className}`}>{children}</h3>
);

export const H4 = ({ children, className = "" }) => (
  <h4 className={`text-xl font-medium ${className}`}>{children}</h4>
);

export const H5 = ({ children, className = "" }) => (
  <h5 className={`text-lg font-normal ${className}`}>{children}</h5>
);

export const H6 = ({ children, className = "" }) => (
  <h6 className={`text-base font-normal ${className}`}>{children}</h6>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

H5.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

H6.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
