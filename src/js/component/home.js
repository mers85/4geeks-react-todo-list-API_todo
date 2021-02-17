import React from "react";
import { useState } from "react";
import { ItemsRemain } from "./itemsRemain.js";
import { Input } from "./input.js";
import { TaskItem } from "./taskItem.js";
import { DraftTaskItem } from "./draftTaskItem.js";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [tasks, setTasks] = useState([]);
	const [draftTask, setDraftTask] = useState("");
	const [draftTaskShow, setDraftTaskShow] = useState("d-none");

	function AddTask(event) {
		setDraftTask(draftTask => (draftTask = ""));
		setDraftTaskShow(draftTaskShow => (draftTaskShow = "d-none"));
		setTasks([...tasks, { id: tasks.length, text: event.target.value }]);
	}

	function showDraft(value) {
		setDraftTask(draftTask => (draftTask = value));
		setDraftTaskShow(draftTaskShow => (draftTaskShow = ""));
	}

	function deleteTask(event, task_id) {
		setTasks(tasks.filter(task => task.id !== task_id));
	}

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-10 bg-light p-3 rounded">
					<h3 className="text-muted">{"Todo's List"}</h3>
					<div className="card">
						<ul className="list-group list-group-flush">
							<Input onKeyDown={AddTask} onChange={showDraft} />
							<DraftTaskItem
								taskText={draftTask}
								show={draftTaskShow}
							/>

							{tasks.map((task, index) => {
								return (
									<TaskItem
										key={task.id}
										taskId={task.id}
										taskText={task.text}
										onClickDelete={deleteTask}
									/>
								);
							})}

							<ItemsRemain itemsRemain={tasks.length} />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
