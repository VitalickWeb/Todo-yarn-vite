import React, {useState} from "react";
import {TodoListItem} from "./components/TodoListItem";
import {v4} from 'uuid';

export type filterType = "All" | "Active" | "Completed"

export type todoListsType = {
    id: string
    title: string
    filter: filterType
}

// export type TodoListState = {
//     [key: string]: todoListsType
// }

export const App = () => {
    const todoListId1 = v4()
    const todoListId2 = v4()

    let [todoLists, setTodoLists] = useState<todoListsType[]>([
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ] as todoListsType[])

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "Redux", isDone: false},
            {id: v4(), title: "PHP", isDone: false},
        ],
        [todoListId2]: [
            {id: v4(), title: "Guitar", isDone: true},
            {id: v4(), title: "Combo", isDone: true},
            {id: v4(), title: "String", isDone: false},
            {id: v4(), title: "Bag", isDone: false},
        ]
    })

    const removeTasks = (todoID: string, taskId: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter((t) => t.id !== taskId)})
    }

    const addTask = (task: string) => {
        // let newTask: TaskType = {
        //     id: v4(),
        //     title: task,
        //     isDone: false
        // }
        // setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        // setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const filterTasks = (todoID: string, filter: filterType) => {
        setTodoLists(todoLists.map((filtered) =>
            filtered.id === todoID ? {...filtered, filter: filter} : filtered))
    }

    return (
        <div className="app">
            {todoLists.map((todo) => {
                let filterShow = tasks[todo.id]

                if (todo.filter === "Active") {
                    filterShow = tasks[todo.id].filter(f => !f.isDone)
                } else if (todo.filter === "Completed") {
                    filterShow = tasks[todo.id].filter(f => f.isDone)
                }

                return (
                    <TodoListItem
                        key={todo.id}
                        todoListID={todo.id}
                        title={todo.title}
                        tasks={filterShow}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        filter={todo.filter}
                        filterTasks={filterTasks}
                        changeStatus={changeStatus}
                        date="11.11.2025"
                    />
                )

            })}
        </div>
    );


};
