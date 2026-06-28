import { Button, Icon, Input, Select, Option, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Toast, MessageStrip } from '@ui5/webcomponents-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getDumpQuestions, removeDumpQuestion } from "../api/QuizApi";
import './ManageQuestions.css';

function ManageQuestions() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [questionSet, setQuestionSet] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.open = true;
    };

    const EditItem = async (oEvent) => {
        const id = oEvent.currentTarget.dataset.link_id;
        navigate(`/displayquestion/${id}`, { state: { questionId: id, mode: "Edit" } });
    };

    const ViewItem = async (oEvent) => {
        const id = oEvent.currentTarget.dataset.link_id;
        navigate(`/displayquestion/${id}`, { state: { questionId: id, mode: "Display" } });
    };

    const DeleteItem = async (oEvent) => {
        const id = oEvent.currentTarget.dataset.link_id;
        if (window.confirm('Are you sure you want to delete this question?')) {
            const result = await removeDumpQuestion(id);
            if (result.message === "Deleted Successfully") {
                showToast('✓ Question deleted successfully');
                fetchData();
            } else {
                showToast('✗ Failed to delete question');
            }
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const response = await getDumpQuestions();
        if (response.dumpQuestions) {
            setQuestionSet(response.dumpQuestions);
            setFilteredQuestions(response.dumpQuestions);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter questions based on search and filters
    useEffect(() => {
        let filtered = [...questionSet];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(q =>
                q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(q => q.category === categoryFilter);
        }

        // Apply type filter
        if (typeFilter !== 'All') {
            filtered = filtered.filter(q => q.questionType === typeFilter);
        }

        setFilteredQuestions(filtered);
    }, [searchTerm, categoryFilter, typeFilter, questionSet]);

    const getUniqueCategories = () => {
        const categories = [...new Set(questionSet.map(q => q.category))];
        return categories;
    };

    const clearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('All');
        setTypeFilter('All');
    };

    if (isLoading) {
        return (
            <div className="manage-questions-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading Questions...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="manage-questions-container">
            {/* Header Section */}
            <div className="manage-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Icon name="list" className="title-icon" />
                        Manage Questions
                    </h1>
                    <p className="page-subtitle">
                        View, edit, and organize your quiz questions
                    </p>
                </div>
                <div className="header-actions">
                    <Button
                        icon='upload'
                        design="Default"
                        className="upload-button"
                        onClick={() => navigate("/bulkupload")}
                    >
                        Bulk Upload
                    </Button>
                    <Button
                        icon='add'
                        design="Emphasized"
                        className="add-button"
                        onClick={() => navigate("/addquestion")}
                    >
                        Add New Question
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-cards">
                <div className="stat-card">
                    <Icon name="question-mark" className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-value">{questionSet.length}</div>
                        <div className="stat-label">Total Questions</div>
                    </div>
                </div>
                <div className="stat-card">
                    <Icon name="filter" className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-value">{filteredQuestions.length}</div>
                        <div className="stat-label">Filtered Results</div>
                    </div>
                </div>
                <div className="stat-card">
                    <Icon name="group" className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-value">{getUniqueCategories().length}</div>
                        <div className="stat-label">Categories</div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="filter-group">
                    <label className="filter-label">
                        <Icon name="search" />
                        Search
                    </label>
                    <Input
                        placeholder="Search questions..."
                        value={searchTerm}
                        onInput={(e) => setSearchTerm(e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">
                        <Icon name="tag" />
                        Category
                    </label>
                    <Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.detail.selectedOption.textContent)}
                        className="filter-select"
                    >
                        <Option>All</Option>
                        {getUniqueCategories().map(cat => (
                            <Option key={cat}>{cat}</Option>
                        ))}
                    </Select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">
                        <Icon name="form" />
                        Type
                    </label>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.detail.selectedOption.textContent)}
                        className="filter-select"
                    >
                        <Option>All</Option>
                        <Option>SingleSelect</Option>
                        <Option>MultiSelect</Option>
                    </Select>
                </div>

                {(searchTerm || categoryFilter !== 'All' || typeFilter !== 'All') && (
                    <Button
                        icon="clear-filter"
                        design="Transparent"
                        onClick={clearFilters}
                        className="clear-filters-btn"
                    >
                        Clear Filters
                    </Button>
                )}
            </div>

            {/* Questions Table */}
            {filteredQuestions.length === 0 ? (
                <MessageStrip design="Information" className="no-results">
                    No questions found. {questionSet.length > 0 ? 'Try adjusting your filters.' : 'Add your first question to get started.'}
                </MessageStrip>
            ) : (
                <div className="table-container">
                    <Table
                        className="questions-table"
                        headerRow={
                            <TableHeaderRow sticky>
                                <TableHeaderCell width="60px">
                                    <span className="header-text">#</span>
                                </TableHeaderCell>
                                <TableHeaderCell width="120px">
                                    <span className="header-text">Category</span>
                                </TableHeaderCell>
                                <TableHeaderCell width="130px">
                                    <span className="header-text">Type</span>
                                </TableHeaderCell>
                                <TableHeaderCell width="180px">
                                    <span className="header-text">Created At</span>
                                </TableHeaderCell>
                                <TableHeaderCell minWidth="300px">
                                    <span className="header-text">Question</span>
                                </TableHeaderCell>
                                <TableHeaderCell width="180px">
                                    <span className="header-text">Actions</span>
                                </TableHeaderCell>
                            </TableHeaderRow>
                        }
                    >
                        {filteredQuestions.map((question, index) => (
                            <TableRow key={question._id} className="table-row">
                                <TableCell>
                                    <span className="row-number">{index + 1}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="category-badge">{question.category}</span>
                                </TableCell>
                                <TableCell>
                                    <span className={`type-badge ${question.questionType === 'MultiSelect' ? 'multi' : 'single'}`}>
                                        {question.questionType === 'MultiSelect' ? 'Multiple' : 'Single'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="date-text">
                                        {new Date(question.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="question-preview">
                                        {question.questionText.length > 100
                                            ? question.questionText.substring(0, 100) + '...'
                                            : question.questionText}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="action-buttons">
                                        <Button
                                            design="Transparent"
                                            icon='show'
                                            data-link_id={question._id}
                                            onClick={ViewItem}
                                            tooltip='View'
                                            className="action-btn view-btn"
                                        />
                                        <Button
                                            design="Transparent"
                                            icon='edit'
                                            data-link_id={question._id}
                                            onClick={EditItem}
                                            tooltip='Edit'
                                            className="action-btn edit-btn"
                                        />
                                        <Button
                                            design="Transparent"
                                            icon='delete'
                                            data-link_id={question._id}
                                            onClick={DeleteItem}
                                            tooltip='Delete'
                                            className="action-btn delete-btn"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            )}

            <Toast ref={toast} duration={3000}>Toast</Toast>
        </div>
    );
}

export default ManageQuestions;

// Made with Bob
