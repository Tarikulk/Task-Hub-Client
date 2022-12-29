import React from 'react';
import CommentsTable from './CommentsTable';
import CompletedTask from './CompletedTask';

const CompletedTaskHome = () => {
    return (
        <div>
            <CompletedTask></CompletedTask> 
            <CommentsTable></CommentsTable>
        </div>
    );
};

export default CompletedTaskHome;