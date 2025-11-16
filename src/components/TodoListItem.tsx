import React, {FC} from "react";
import {type filterType} from "../App";
import {Button} from "./Button/Button";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

export type TodoListItemType = {
    title: string;
    tasks: TaskType[];
    date?: string;
    removeTasks: (id: number) => void
    filterTasks: (filter: filterType) => void
};

export const TodoListItem: FC<TodoListItemType> =
    ({
         title,
         tasks,
         date,
         removeTasks,
         filterTasks,
     }) => {

        const renderTasks = tasks.length === 0
            ? <span className="empty_task">Enter task!</span>
            : tasks.map(t => {

                const removeTaskHandler = () => {
                    removeTasks(t.id)
                }

                return (
                    <li key={t.id} className="task">
                        <input type="checkbox" checked={t.isDone} />
                        <span>{t.title}</span>
                        <Button
                            title="×"
                            className="del_task"
                            onClick={removeTaskHandler}
                        />
                    </li>
                )
            })

        const filterTaskHandlerAll = () => {filterTasks("All")}
        const filterTaskHandlerActive = () => {filterTasks("Active")}
        const filterTaskHandlerCompleted = () => {filterTasks("Completed")}

        return (
            <div className="todo_box">
                <h3>{title}</h3>
                <div>
                    <input
                        type="text"
                        id="task_input"
                    />
                    <Button
                        className="button_item"
                        title="+"
                    />
                </div>
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
