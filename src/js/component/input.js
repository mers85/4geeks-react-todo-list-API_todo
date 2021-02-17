import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Input(props) {
	function onkeydownAddTask(event) {
		//const [task, setTask] = useState("");
		if (event.key === "Enter" && event.target.value !== "") {
			props.onKeyDown(event);
			//setTask(task => (task = "")); //¿pór qué no funciona?
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
