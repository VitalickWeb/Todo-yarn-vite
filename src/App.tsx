import React, {useState} from "react";
import {type TaskType, TodoListItem} from "./components/TodoListItem";
import {v4} from 'uuid';
export type filterType = "All" | "Active" | "Completed"

export type todoListsType = {
    id: string
    title: string
    filter: string
}

// export type TodoListState = {
//     [key: string]: todoListsType
// }

export const App = () => {
    // const todoListId1 = v4()
    // const todoListId2 = v4()

    let [todoLists, setTodoLists] = useState<todoListsType[]>([
    {id: v4(), title: "What to learn", filter: "tasks"},
    {id: v4(), title: "What to buy", filter: "purchases"},
])

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "Redux", isDone: false},
            {id: v4(), title: "PHP", isDone: false},
        ]
    )

    let [purchases, setPurchases] = useState<TaskType[]>([
        {id: v4(), title: "Guitar", isDone: true},
        {id: v4(), title: "Combo", isDone: true},
        {id: v4(), title: "String", isDone: false},
        {id: v4(), title: "Bag", isDone: false},
    ])

    const removeTasks = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    const addTask = (task: string) => {
        let newTask: TaskType = {
            id: v4(),
            title: task,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
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
                filter={filter}
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
