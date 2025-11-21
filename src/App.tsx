import React, {useState} from "react";
import {type TaskType, TodoListItem} from "./components/TodoListItem";
import {v4} from 'uuid';
export type filterType = "All" | "Active" | "Completed"

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "Redux", isDone: false},
            {id: v4(), title: "PHP", isDone: false},
        ]
    )

    // const tasks2: TaskType[] = [
    //     {id: 1, title: "Guitar", isDone: true},
    //     {id: 2, title: "Combo", isDone: true},
    //     {id: 3, title: "String", isDone: false},
    //     {id: 3, title: "Bag", isDone: false},
    // ];

    const removeTasks = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    const addTask = (task: string) => {
        let newTask: TaskType = {
            id: v4(),
            title: task,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map((t) => t.id === id ? {...t, isDone: isDone} : t))
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
                addTask={addTask}
                filterTasks={filterTasks}
                changeStatus={changeStatus}
                date="11.11.2025"
            />
            {/*<TodoListItem*/}
            {/*    title="What to bye"*/}
            {/*    tasks={tasks2}*/}
            {/*/>*/}
        </div>
    );
};
