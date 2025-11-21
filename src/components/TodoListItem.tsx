import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
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
};

export const TodoListItem: FC<TodoListItemType> =
    ({
         title,
         tasks,
         date,
         removeTasks,
         addTask,
         filterTasks,
     }) => {

        let [task, setTask] = useState<string>('')

        const enterInput = task.length <= 15
            ? ''
            : <span className="checkSymbols">Too many symbols!</span>

        const isButtonDisabled = !task.length || task.length > 15

        const renderTasks = tasks.length === 0
            ? <span className="empty_task">Enter task!</span>
            : tasks.map(t => {

                const removeTaskHandler = () => {
                    removeTasks(t.id)
                }

                return (
                    <li key={t.id} className="task">
                        <input type="checkbox" checked={t.isDone}/>
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
        }
        const onKeyTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                setTask(e.key)
                onClickAddTaskHandler()
            }
        }

        const onClickAddTaskHandler = () => {
            if (task.trim() !== '') {
                addTask(task)
                setTask('')
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
                        id="task_input"
                        onChange={onChangeTaskHandler}
                        onKeyDown={onKeyTaskHandler}
                    />
                    <Button
                        className="button_item"
                        title="+"
                        onClick={onClickAddTaskHandler}
                        disabled={isButtonDisabled}
                    />
                </div>

                <div className="warning_text">{enterInput}</div>

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
