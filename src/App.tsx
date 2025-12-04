import React, {useState} from "react";
import {type TaskType, TodoListItem} from "./components/TodoListItem";
import {v4} from 'uuid';

export type filterType = "All" | "Active" | "Completed"

export type TodoListsType = {
    id: string
    title: string
    filter: filterType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const todoListId1 = v4()
    const todoListId2 = v4()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ] as TodoListsType[])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const addTask = (todoID: string, task: string) => {
        let newTask: TaskType = {id: v4(), title: task, isDone: false}
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }

    const changeStatus = (todoID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    const filterTasks = (todoID: string, filter: filterType) => {
        setTodoLists(todoLists.map((filtered) =>
            filtered.id === todoID ? {...filtered, filter: filter} : filtered))
    }

    return (
        <div className="app">
            {todoLists.map((todo) => {

                return (
                    <TodoListItem
                        key={todo.id}
                        todoListID={todo.id}
                        title={todo.title}
                        filter={todo.filter}
                        tasks={tasks[todo.id]}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        filterTasks={filterTasks}
                        changeStatus={changeStatus}
                        date="11.11.2025"
                    />
                )
            })}
        </div>
    );
};
