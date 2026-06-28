import { Icon, Select, Option, Button, TextArea, Slider, Label } from "@ui5/webcomponents-react";
import { useState } from "react";
import styles from "./TodoComponents.module.css";

function TodoActivity({ todoData, removeToDo, updateToDo }) {
    const [editMode, setEditMode] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(todoData);

    // Status color mapping
    const getStatusColor = (status) => {
        switch (status) {
            case "New":
                return "#0070f3";
            case "In Progress":
                return "#f5a623";
            case "Done":
                return "#10b981";
            default:
                return "#6b7280";
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "New":
                return styles.statusNew;
            case "In Progress":
                return styles.statusInProgress;
            case "Done":
                return styles.statusDone;
            default:
                return "";
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "New":
                return "#e3f2fd";
            case "In Progress":
                return "#fff3e0";
            case "Done":
                return "#e8f5e9";
            default:
                return "#f5f5f5";
        }
    };

    const handleSave = (e) => {
        e.stopPropagation();
        updateToDo(updatedContent);
        setEditMode(false);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setUpdatedContent(todoData);
        setEditMode(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this task?")) {
            removeToDo(todoData._id);
        }
    };

    return (
        <div className={styles.todoCard}>
            <div className={`${styles.todoHeader} ${getStatusClass(todoData.status)}`} style={{ background: getStatusColor(todoData.status) }}>
                <h3 className={styles.todoTitle}>{todoData.title}</h3>
                <div className={styles.iconContainer}>
                    <span style={{
                        padding: "6px 12px",
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        fontWeight: "600"
                    }}>
                        {todoData.complitionPercent}% Complete
                    </span>
                    <Icon
                        interactive
                        name="edit"
                        showTooltip
                        accessibleName="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditMode(true);
                        }}
                        className={styles.actionIcon}
                    />
                    <Icon
                        interactive
                        name="decline"
                        showTooltip
                        accessibleName="Delete"
                        onClick={handleDelete}
                        className={styles.actionIcon}
                    />
                </div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.mainContent}>
                    <div className={styles.contentText}>
                        {editMode ? (
                            <TextArea
                                rows={4}
                                value={updatedContent.content}
                                onChange={(e) => {
                                    setUpdatedContent({ ...updatedContent, "content": e.target.value });
                                }}
                                style={{ width: "100%" }}
                            />
                        ) : (
                            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{todoData.content}</p>
                        )}
                    </div>

                    <div className={styles.progressContainer}>
                        <span className={styles.progressLabel}>Progress:</span>
                        <Slider
                            style={{ flex: 1, minWidth: "150px" }}
                            min={0}
                            max={100}
                            showTooltip
                            value={editMode ? updatedContent.complitionPercent : todoData.complitionPercent}
                            showTickmarks={false}
                            onChange={(e) => {
                                setUpdatedContent({ ...updatedContent, "complitionPercent": e.target.value });
                            }}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>📅 Created On:</span>
                        <span>{new Date(todoData.createdAt).toLocaleString()}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>🎯 Status:</span>
                        {editMode ? (
                            <Select
                                value={updatedContent.status}
                                style={{ width: "100%", marginTop: "4px" }}
                                onChange={(e) => {
                                    setUpdatedContent({ ...updatedContent, "status": e.target.value });
                                }}
                            >
                                <Option key="New">New</Option>
                                <Option key="In Progress">In Progress</Option>
                                <Option key="Done">Done</Option>
                            </Select>
                        ) : (
                            <span style={{
                                display: "inline-block",
                                padding: "4px 12px",
                                background: getStatusBadgeColor(todoData.status),
                                color: getStatusColor(todoData.status),
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                marginTop: "4px"
                            }}>
                                {todoData.status}
                            </span>
                        )}
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>⏰ Target Date:</span>
                        <span>{new Date(todoData.targetCompletionDate).toLocaleDateString()}</span>
                    </div>

                    {editMode && (
                        <div className={styles.buttonGroup}>
                            <Button
                                icon="save"
                                design="Emphasized"
                                onClick={handleSave}
                                style={{ flex: 1 }}
                            >
                                Save
                            </Button>
                            <Button
                                icon="decline"
                                design="Transparent"
                                onClick={handleCancel}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoActivity;