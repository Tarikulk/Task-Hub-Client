import React from 'react';

const CommentsTableData = ({comment, refetch}) => {

    const {comments, image, title, email} = comment;

    return (
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="p-4 w-4"> 
    </td>
    <th scope="row" className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img className="w-10 h-10 rounded-full" src={image} alt=""/>
        <div className="pl-3">
            <div className="text-base font-semibold mb-2">{title}</div>
        </div>
    </th>
    <td className="py-4 px-6">
        {email}
    </td> 
    <td className="py-4 px-6">
            {comments}
    </td>
</tr>
    );
};

export default CommentsTableData;

