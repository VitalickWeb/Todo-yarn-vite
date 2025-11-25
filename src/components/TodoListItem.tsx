import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {type filterType} from "../App";
import {Button} from "./Button/Button";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TodoListItemType = {
    title: string;
    tasks: TaskType[];
    date?: string;
    removeTasks: (id: string) => void
    addTask: (task: string) => void
    filterTasks: (filter: filterType) => void
    changeStatus: (id: string, isDone: boolean) => void
};

export const TodoListItem: FC<TodoListItemType> =
    ({
         title,
         tasks,
         date,
         removeTasks,
         addTask,
         filterTasks,
         changeStatus,
     }) => {

        let [task, setTask] = useState<string>('')
        let [error, setError] = useState<string | null>(null)

        const enterValue = task.length <= 15
            ? ''
            : <span className="checkSymbols">Too many symbols!</span>

        const isButtonDisabled = !task.length || task.length > 15

        const inputClasses = `task_input ${error ? 'error' : ''}`;

        const renderTasks = tasks.length === 0
            ? <span className="empty_task">Enter task!</span>
            : tasks.map(t => {

                const removeTaskHandler = () => {
                    removeTasks(t.id)
                }
                const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                    changeStatus(t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id} className="task">
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onStatusChange}
                        />
                        <span>{t.title}</span>
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
                addTask(trimTitle)
                setTask('')
            } else {
                setError("Title is required")
            }
        }

        const filterTaskHandlerAll = () => {
            filterTasks("All")
        }
        const filterTaskHandlerActive = () => {
            filterTasks("Active")
        }
        const filterTaskHandlerCompleted = () => {
            filterTasks("Completed")
        }

        return (
            <div className="todo_box">
                <h3>{title}</h3>
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
                        className="button_item"
                        onClick={filterTaskHandlerAll}
                        title="All"
                    />
                    <Button
                        className="button_item"
                        onClick={filterTaskHandlerActive}
                        title="Active"
                    />
                    <Button
                        className="button_item"
                        onClick={filterTaskHandlerCompleted}
                        title="Completed"
                    />
                </div>
                {date && <span>{date}</span>}
            </div>
        )
    }
