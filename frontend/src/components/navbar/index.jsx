import PropTypes from "prop-types";

const Navbar = (props) => {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{props.navbarHeader}</h1>
        <ul className="flex space-x-4">
          {props.tabs.map((tab) => {
            return (
              <li
                key={tab.name}
                className={`cursor-pointer ${
                  props.activeTab === tab.name ? "font-semibold underline" : ""
                }`}
                onClick={() =>
                  !props.activeTab !== tab.name &&
                  props.onTabClickHandler(tab.name)
                }
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  navbarHeader: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClickHandler: PropTypes.func.isRequired,
};

export default Navbar;
