import React from 'react';
import { toast } from 'react-hot-toast';

const AllCompleteTasks = ({completeTask, undoCompletedTasks, deleteTask}) => {

 
    const {image, title, details, _id, email} = completeTask;

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const comments = form.comments.value;
        const userComments = {
            comments, 
            email,
            title,
            details,
            image, 
        }

        fetch("https://tasks-hub-server.vercel.app/comments", {
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(userComments)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toast.success("comment added")
            form.reset()
        })
        .catch(error => {
            console.log(error)
        })

    }

    return (
             <div className="mt-14 mb-32 mx-20">
      <div className="bg-sky-500 dark:bg-gray-900 h-80 w-64 rounded-md">
        <div className="flex justify-center items-center leading-none">
          <img
            src={image}
            className="h-40 w-56 rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
            alt=''
          />
        </div>
        <div className="p-3">
          <p className="block mb-1 dark:text-white">{title}</p>
          <p className="text-xs dark:text-white">
            {details}
          </p>
        </div>
        <div className="flex justify-between items-center p-2"> 
              
             <button onClick={()=>undoCompletedTasks(_id)} className='btn bg-white rounded-sm text-black px-1 hover:bg-sky-200 transition duration-500'>Undo</button>
             <button  onClick={()=>deleteTask(_id)} className='btn bg-white rounded-sm text-black px-1 hover:bg-sky-200 transition duration-500'>Delete</button>
        </div>
            <form onSubmit={handleSubmit}>
            <textarea id="bio" placeholder="Add Comments" name='comments' className="mt-10 md:mt-1 lg:mt-1 p-2 h-20 w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"></textarea>
             <button type='submit' className='w-full btn bg-sky-500 dark:bg-gray-900 dark:text-white rounded-lg text-black px-1 py-2 hover:bg-sky-200 transition duration-500 mt-1 bottom-0'>Add Your Comment</button>
            </form>
      </div>
    </div>
    );
};

export default AllCompleteTasks;