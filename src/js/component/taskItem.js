import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export function TaskItem(props) {
	const [text, setText] = useState(props.task.title);
	const [hideButton, setHideButton] = useState("d-none");

	let task = props.task;

	return (
		<li
			className="list-group-item"
			onMouseOver={event => {
				setHideButton("");
			}}
			onMouseLeave={event => {
				setHideButton("d-none");
			}}>
			<div className="input-group">
				<input
					type="text"
					className="form-control border-0"
					defaultValue={text}
					onChange={event => {
						setText(event.target.value);
					}}
					aria-describedby="basic-addon2"
				/>
				<div className={"input-group-append " + hideButton}>
					<button
						type="button"
						id="saveEditItem"
						onClick={event => {
							props.onClickSave(task.id, text);
						}}
						className="btn btn-outline-secondary">
						save
					</button>
					<button
						type="button"
						id="deleteItem"
						onClick={event => {
							props.onClickDelete(task.id);
						}}
						className="btn btn-outline-secondary">
						<span aria-hidden="true">delete</span>
					</button>
				</div>
			</div>
		</li>
	);
}

TaskItem.propTypes = {
	task: PropTypes.object,
	onClickSave: PropTypes.func,
	onClickDelete: PropTypes.func
};
