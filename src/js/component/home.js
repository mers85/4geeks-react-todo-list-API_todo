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
		fetch(BASE_URL + "sss/?userId=1", {
			method: "get",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				if (response.ok) {
					return response.json();
				} else if (response.status !== 200) {
					setError(response.statusText);
				}
			})
			.then(json => {
				setTasks(json);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);

	function CreateTask(event) {
		fetch(BASE_URL + "todos/", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				title: event.target.value,
				userId: 1
			})
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(json => {
				setDraftTask(draftTask => (draftTask = ""));
				setDraftTaskShow(draftTaskShow => (draftTaskShow = "d-none"));

				setTasks([...tasks, { title: json.title }]);
			});
	}

	function showDraft(value) {
		setDraftTask(draftTask => (draftTask = value));
		setDraftTaskShow(draftTaskShow => (draftTaskShow = ""));
	}

	function EditTask(id, taskTitle) {
		fetch(BASE_URL + "todos/" + id, {
			method: "PUT",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				id: id,
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
				setTasks([...tasks, { title: json.title }]);
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
									onKeyDown={CreateTask}
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
											onClickSave={EditTask}
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
