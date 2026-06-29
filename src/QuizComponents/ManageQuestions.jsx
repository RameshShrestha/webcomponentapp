import { Button, Icon, Input, Select, Option, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Toast, MessageStrip } from '@ui5/webcomponents-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getDumpQuestions, removeDumpQuestion } from "../api/QuizApi";
import './ManageQuestions.css';

function ManageQuestions() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [questionSet, setQuestionSet] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false
    });

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
        const params = {
            page: currentPage,
            limit: itemsPerPage,
            category: categoryFilter !== 'All' ? categoryFilter : undefined,
            questionType: typeFilter !== 'All' ? typeFilter : undefined,
            search: searchTerm || undefined
        };
        
        const response = await getDumpQuestions(null, params);
        if (response.dumpQuestions) {
            setQuestionSet(response.dumpQuestions);
            setPagination(response.pagination);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage, categoryFilter, typeFilter, searchTerm]);

    const getUniqueCategories = () => {
        // This would ideally come from backend, but for now we'll use a static list
        return ['SAP Fiori', 'Build', 'SAP CAPM', 'Python', 'Java', 'General'];
    };

    const clearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('All');
        setTypeFilter('All');
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newLimit) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1);
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
                        <div className="stat-value">{pagination.totalCount}</div>
                        <div className="stat-label">Total Results</div>
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
            {questionSet.length === 0 ? (
                <MessageStrip design="Information" className="no-results">
                    No questions found. {pagination.totalCount > 0 ? 'Try adjusting your filters.' : 'Add your first question to get started.'}
                </MessageStrip>
            ) : (
                <>
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
                            {questionSet.map((question, index) => (
                            <TableRow key={question._id} className="table-row">
                                <TableCell>
                                    <span className="row-number">{(currentPage - 1) * itemsPerPage + index + 1}</span>
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

                {/* Pagination Controls */}
                <div className="pagination-container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    marginTop: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Items per page:</span>
                        <Select
                            value={itemsPerPage.toString()}
                            onChange={(e) => handleItemsPerPageChange(parseInt(e.detail.selectedOption.textContent))}
                            style={{ width: '80px' }}
                        >
                            <Option>5</Option>
                            <Option>10</Option>
                            <Option>20</Option>
                            <Option>50</Option>
                        </Select>
                    </div>

                    <div style={{ fontSize: '14px', color: '#666' }}>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, pagination.totalCount)} of {pagination.totalCount} questions
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Button
                            icon="navigation-left-arrow"
                            design="Transparent"
                            disabled={!pagination.hasPrevPage}
                            onClick={() => handlePageChange(currentPage - 1)}
                            tooltip="Previous Page"
                        />
                        
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(pagination.totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                // Show first page, last page, current page, and pages around current
                                if (
                                    pageNum === 1 ||
                                    pageNum === pagination.totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <Button
                                            key={pageNum}
                                            design={pageNum === currentPage ? "Emphasized" : "Transparent"}
                                            onClick={() => handlePageChange(pageNum)}
                                            style={{ minWidth: '40px' }}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={pageNum} style={{ padding: '0 5px' }}>...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <Button
                            icon="navigation-right-arrow"
                            design="Transparent"
                            disabled={!pagination.hasNextPage}
                            onClick={() => handlePageChange(currentPage + 1)}
                            tooltip="Next Page"
                        />
                    </div>
                </div>
                </>
            )}

            <Toast ref={toast} duration={3000}>Toast</Toast>
        </div>
    );
}

export default ManageQuestions;

// Made with Bob
