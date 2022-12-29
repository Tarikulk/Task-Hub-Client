import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const MyAllTask = ({task, handleDeleteTask}) => {

    const {title, details, image, _id, date, email} = task;
    const navigate = useNavigate();

    const completeTask = () =>{
      const completeTask = {
        title, 
        details,
        image, 
        date,
        email,
        tasksId: _id
      }
      fetch(`https://tasks-hub-server.vercel.app/completeTasks`, {
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(completeTask)
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        toast.success("task completed")
        navigate("/completedTask")
      })
      .catch(error =>{
        console.log(error)
      })
      
    }

    return (
        <div>
             <div className='my-20 mx-20'>
            <div className='text-white'>
      <div className="bg-sky-500 dark:bg-gray-900 h-80 w-64 rounded-md">
        <div className="flex justify-center items-center leading-none">
          <img
            src={image}
            className="h-40 w-56 rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
            alt=''
          />
        </div>
        <div className="p-3">
          <p className="block mb-1">{title}</p>
          <p className="text-xs">
            {details}
          </p>
        </div>
        <div className="flex justify-between items-center p-2"> 
             <Link to={`/updateTasks/${_id}`} className='btn bg-white rounded-sm text-black px-1 hover:bg-sky-200 transition duration-500'>Update</Link>
             <button onClick={()=>handleDeleteTask(_id)} className='btn bg-white rounded-sm text-black px-1 hover:bg-sky-200 transition duration-500'>Delete</button>
             <button onClick={completeTask} className='btn bg-white rounded-sm text-black px-1 hover:bg-sky-200 transition duration-500'>Complete</button>
        </div>
      </div>
    </div>
        </div>
        </div>
    );
};

export default MyAllTask;