import React from "react";
import PropTypes from "prop-types";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function ItemsRemain(props) {
	return (
		<div className="list-group-item text-muted">
			{props.itemsRemain
				? props.itemsRemain + " items left"
				: "No tasks, add a task"}
		</div>
	);
}

ItemsRemain.propTypes = {
	itemsRemain: PropTypes.number
};
