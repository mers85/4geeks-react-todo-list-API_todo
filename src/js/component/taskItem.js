import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function TaskItem(props) {
	function onClickDelete() {
		props.onClickDelete(event, props.taskId);
	}

	function hideButton(event) {
		event.target.lastChild.classList.add("d-none");
	}
	function showButton(e) {
		event.target.lastChild.classList.remove("d-none");
	}
	return (
		<li
			className="list-group-item"
			id={props.taskId}
			onMouseOver={showButton}
			onMouseLeave={hideButton}>
			{props.taskText}
			<button
				type="button"
				onClick={onClickDelete}
				className="close d-none">
				<span aria-hidden="true">&times;</span>
			</button>
		</li>
	);
}

TaskItem.propTypes = {
	taskId: PropTypes.number,
	taskText: PropTypes.string,
	onClickDelete: PropTypes.func
};
