import React from "react";
import PropTypes from "prop-types";

export function Input(props) {
	function onkeydownAddTask(event) {
		if (event.key === "Enter" && event.target.value !== "") {
			props.onKeyDown(event);
			event.target.value = "";
		}
	}

	function showDraft(event) {
		props.onChange(event.target.value);
	}

	return (
		<div className="list-group-item">
			<input
				onKeyDown={onkeydownAddTask}
				onChange={showDraft}
				type="text"
				className="form-control border-0"
				placeholder="Enter your task"></input>
		</div>
	);
}

Input.propTypes = {
	onKeyDown: PropTypes.func,
	onChange: PropTypes.func
};
