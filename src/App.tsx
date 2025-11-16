import React, {useState} from "react";
import {type TaskType, TodoListItem} from "./components/TodoListItem";

export type filterType = "All" | "Active" | "Completed"

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false},
            {id: 5, title: "PHP", isDone: false},
        ]
    )

    // const tasks2: TaskType[] = [
    //     {id: 1, title: "Guitar", isDone: true},
    //     {id: 2, title: "Combo", isDone: true},
    //     {id: 3, title: "String", isDone: false},
    //     {id: 3, title: "Bag", isDone: false},
    // ];

    const removeTasks = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    const [filter, setFilter] = useState<filterType>("All")

    const filterTasks = (filter: filterType) => {
        setFilter(filter)
    }

    let filterShow = tasks

    if (filter === "Active") {
        filterShow = tasks.filter(f => !f.isDone)
    } else if (filter === "Completed") {
        filterShow = tasks.filter(f => f.isDone)
    }

    return (
        <div className="app">
            <TodoListItem
                title="What to Learn"
                tasks={filterShow}
                removeTasks={removeTasks}
                filterTasks={filterTasks}
                date="11.11.2025"
            />
            {/*<TodoListItem*/}
            {/*    title="What to bye"*/}
            {/*    tasks={tasks2}*/}
            {/*/>*/}
        </div>
    );
};
