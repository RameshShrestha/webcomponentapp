import { Button, Form, FormItem, Input, TextArea, Title } from "@ui5/webcomponents-react";
import TodoActivity from "./TodoActivity";
import { useState } from "react";
import { useToDoContext } from "../Data/ContextHandler/ToDoListContext";
import styles from "./TodoComponents.module.css";

function ToDoMainPage({ user }) {
    const { todoList, addToDo, removeToDo, updateToDo } = useToDoContext();
    const [newTodoItem, setNewTodoItem] = useState({
        id: "",
        username: user,
        title: "",
        content: "",
        status: "New",
        complitionPercent: 0,
        targetCompletionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    });

    const handleAddTodo = async () => {
        if (!newTodoItem.title.trim() || !newTodoItem.content.trim()) {
            alert("Please fill in both title and content");
            return;
        }
        await addToDo(newTodoItem);
        setNewTodoItem({
            ...newTodoItem,
            title: "",
            content: "",
            targetCompletionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        });
    };

    return (
        <div className={styles.todoContainer}>
            <h1 className={styles.todoHeader}>📝 To Do Activity List</h1>

            <div className={styles.formCard}>
                <Title level="H3" className={styles.formTitle}>
                    ✨ Create New Task
                </Title>
                <Form
                    backgroundDesign="Transparent"
                    columnsL={1}
                    columnsM={1}
                    columnsS={1}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={3}
                    labelSpanS={12}
                    labelSpanXL={4}
                    style={{ alignItems: 'center' }}
                >
                    <FormItem label="📌 Title">
                        <Input
                            placeholder="Enter task title"
                            name="title"
                            value={newTodoItem.title}
                            onChange={(e) => {
                                setNewTodoItem({ ...newTodoItem, title: e.target.value });
                            }}
                            style={{ width: "100%" }}
                        />
                    </FormItem>
                    <FormItem label="📝 Content">
                        <TextArea
                            value={newTodoItem.content}
                            maxlength="300"
                            placeholder="Describe your task in detail..."
                            rows="3"
                            name="content"
                            onChange={(e) => {
                                setNewTodoItem({ ...newTodoItem, content: e.target.value });
                            }}
                            style={{ width: "100%" }}
                        />
                    </FormItem>
                    <FormItem label="📅 Target Date">
                        {/* <DatePicker name="targetCompletionDate" value={newTodoItem.targetCompletionDate} onChange={(e) => {
                            setNewTodoItem({ ...newTodoItem, targetCompletionDate: e.target.value });
                        }} /> */}
                    </FormItem>

                    <FormItem>
                        <Button
                            icon="add"
                            design="Emphasized"
                            onClick={handleAddTodo}
                            style={{ minWidth: "120px" }}
                        >
                            Add Task
                        </Button>
                    </FormItem>
                </Form>
            </div>

            <div className={styles.todoListContainer}>
                {todoList.map((todoItem) => {
                    return <TodoActivity key={todoItem._id} todoData={todoItem} removeToDo={removeToDo} updateToDo={updateToDo} />
                })}
                {todoList.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>📋</div>
                        <div>No tasks yet. Create your first task above!</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToDoMainPage;