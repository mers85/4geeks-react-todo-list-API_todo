import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function DraftTaskItem(props) {
	return (
		<li className={"list-group-item" + " " + props.show}>
			{props.taskText}
		</li>
	);
}

DraftTaskItem.propTypes = {
	taskText: PropTypes.string,
	show: PropTypes.string
};
