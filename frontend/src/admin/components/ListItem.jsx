import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
	return (
		<button
			className={
				props.isActiveTab ? "admin-nav-active-item" : "admin-nav-inactive-item"
			}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default ListItem;
