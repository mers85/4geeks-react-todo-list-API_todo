import React from "react";
import { useState, useEffect } from "react";
import { ItemsRemain } from "./itemsRemain.js";
import { Input } from "./input.js";
import { TaskItem } from "./taskItem.js";
import { DraftTaskItem } from "./draftTaskItem.js";
import { Error } from "./error.js";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export function Home() {
	const [tasks, setTasks] = useState([]);
	const [draftTask, setDraftTask] = useState("");
	const [draftTaskShow, setDraftTaskShow] = useState("d-none");
	const [error, setError] = useState("");

	useEffect(() => {
		fetch(BASE_URL + "todos/?userId=1", {
			method: "get",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					setError(response.statusText);
				}
			})
			.then(json => {
				if (json) {
					setTasks(json);
				}
			})
			.catch(error => {
				setError(error);
			});
	}, []);

	function createTask(taskTitle) {
		fetch(BASE_URL + "todos/", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				title: taskTitle,
				userId: 1
			})
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(json => {
				setDraftTask("");
				setDraftTaskShow("d-none");

				setTasks([...tasks, { title: json.title }]);
			});
	}

	function showDraft(value) {
		setDraftTask(value);
		setDraftTaskShow("");
	}

	function editTask(id, taskTitle) {
		let fetchOption = {
			method: "PUT",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				id: id,
				title: taskTitle,
				userId: 1
			})
		};
		fetch(BASE_URL + "todos/" + id, fetchOption)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(json => {
				let newTasks = [...tasks];
				let taskIndex = newTasks.findIndex(task => task.id === id);
				if (taskIndex > -1) {
					newTasks[taskIndex].title = json.title;
				}

				setTasks([...newTasks]);
			});
	}

	function deleteTask(id) {
		fetch(BASE_URL + "todos/" + id, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.ok) {
				let newTasks = [...tasks];
				let positionToDelete = newTasks.findIndex(task => {
					if (task.id === id) {
						return true;
					}
				});
				newTasks.splice(positionToDelete, 1);
				setTasks(newTasks);
			} else {
				console.log("OMG!!!");
			}
		});
	}

	return (
		<div className="container mt-5">
			<div className="row">
				{error ? (
					<Error textError={error} />
				) : (
					<div className="col-10 bg-light p-3 rounded">
						<h4 className="text-muted pb-2">
							{"Todo's List User One: Leanne Graham"}
						</h4>
						<div className="card">
							<ul className="list-group list-group-flush">
								<Input
									onKeyDown={createTask}
									onChange={showDraft}
								/>
								<DraftTaskItem
									taskText={draftTask}
									show={draftTaskShow}
								/>
								{/* se ha usado el index porque los task.id se muestran como no estable dandonos error*/}
								{tasks.map(task => {
									return (
										<TaskItem
											key={task.id}
											task={task}
											onClickSave={editTask}
											onClickDelete={deleteTask}
										/>
									);
								})}

								<ItemsRemain itemsRemain={tasks.length} />
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
