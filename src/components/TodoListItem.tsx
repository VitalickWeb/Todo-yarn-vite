import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {type filterType} from "../App";
import {Button} from "./Button/Button";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TodoListItemType = {
    todoListID: string
    title: string;
    tasks: TaskType[];
    date?: string;
    removeTodoList: (todoID: string) => void
    removeTasks: (todoID: string, taskId: string) => void
    addTask: (todoID: string, task: string) => void
    filterTasks: (todoID: string, filter: filterType) => void
    filter: filterType
    changeStatus: (todoID: string, taskId: string, isDone: boolean) => void
};

export const TodoListItem: FC<TodoListItemType> =
    ({
         todoListID, removeTasks, filterTasks,
         title, removeTodoList, filter,
         tasks, addTask, changeStatus,
         date,
     }) => {

        let tasksToShow

            if (filter === "Active") {
                tasksToShow = tasks.filter(f => !f.isDone)
            } else if (filter === "Completed") {
                tasksToShow = tasks.filter(f => f.isDone)
            } else {
                tasksToShow = tasks
            }

        let [task, setTask] = useState<string>('')
        let [error, setError] = useState<string | null>(null)

        const enterValue = task.length <= 15
            ? ''
            : <span className="checkSymbols">Too many symbols!</span>

        const isButtonDisabled = !task.length || task.length > 15

        const inputClasses = `task_input ${error ? 'error' : ''}`;

        const renderTasks = tasksToShow.length === 0
            ? <span className="empty_task">Enter task!</span>
            : tasksToShow.map(t => {

                const removeTaskHandler = () => {
                    removeTasks(todoListID, t.id)
                }

                const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(todoListID, t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onStatusChange}
                        />
                        <span className={t.isDone ? "line_through" : ''}>{t.title}</span>
                        <Button
                            title="×"
                            className="del_task"
                            onClick={removeTaskHandler}
                        />
                    </li>
                )
            })

        const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTask(e.currentTarget.value)
            setError(null)
        }
        const onKeyTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                setTask(e.key)
                onClickAddTaskHandler()
            }
        }

        const onClickAddTaskHandler = () => {
            const trimTitle = task.trim()
            if (trimTitle !== '') {
                addTask(todoListID, trimTitle)
                setTask('')
            } else {
                setError("Title is required")
            }
        }

        const filterTaskHandlerAll = () => {
            filterTasks(todoListID, "All")
        }
        const filterTaskHandlerActive = () => {
            filterTasks(todoListID, "Active")
        }
        const filterTaskHandlerCompleted = () => {
            filterTasks(todoListID, "Completed")
        }

        const onRemoveTodoListHandler = () => {
            removeTodoList(todoListID)
        }

        return (
            <div className="todo_box">

                <div className="title_button_box">
                    <h3>{title}</h3>
                    <Button
                        className="remove_todo"
                        title="×"
                        onClick={onRemoveTodoListHandler}
                    />
                </div>

                <div>
                    <input
                        value={task}
                        className={inputClasses}
                        onChange={onChangeTaskHandler}
                        onKeyDown={onKeyTaskHandler}
                    />
                    <Button
                        className="button_item_add"
                        title="+"
                        onClick={onClickAddTaskHandler}
                        disabled={isButtonDisabled}
                    />
                </div>

                {error && <div className="error_message">{error}</div>}
                {enterValue && <div className="warning_text">{enterValue}</div>}


                <ol className="list_item_tasks">{renderTasks}</ol>
                <div className="button">
                    <Button
                        className={`button_item ${filter === "All" ? "filtered_active" : ""}`}
                        onClick={filterTaskHandlerAll}
                        title="All"
                    />
                    <Button
                        className={`button_item ${filter === "Active" ? "filtered_active" : ""}`}
                        onClick={filterTaskHandlerActive}
                        title="Active"
                    />
                    <Button
                        className={`button_item ${filter === "Completed" ? "filtered_active" : ""}`}
                        onClick={filterTaskHandlerCompleted}
                        title="Completed"
                    />
                </div>
                {date && <span>{date}</span>}
            </div>
        )
    }
