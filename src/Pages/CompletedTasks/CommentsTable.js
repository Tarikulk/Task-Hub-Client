import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CommentsTableData from './CommentsTableData';

const CommentsTable = () => { 
 
    const [comments, setComments] = useState([]);
    useEffect(() =>{
        fetch("https://tasks-hub-server.vercel.app/comments")
        .then(res => res.json())
        .then(data =>{
            const newData = [comments, ...data];
            setComments(newData);
        })
    }, [comments])


    return (
        <div className='my-20 mx-20'> 
           <div className='mx-20'> 
            <div className="overflow-x-auto relative shadow-md rounded-lg">
                <div className="w-full flex justify-center items-center text-center px-4 pb-4 bg-sky-500 dark:bg-gray-900"> 
                    <label htmlFor="table-search" className="sr-only">Search</label>
                     <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="mt-5 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search-users" className="mt-4 block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users"/>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4"> 
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th> 
                            <th scope="col" className="py-3 px-6">
                                Comments
                            </th>
                        </tr>
                    </thead>
                <tbody> 
                    {
                comments.map(comment => <CommentsTableData
                key={comment._id}
                comment={comment}
                ></CommentsTableData>)
                }
                </tbody>
                </table>
            </div>
            
                    </div>

        </div>
        
    );
};

export default CommentsTable;