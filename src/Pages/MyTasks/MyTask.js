import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../Components/Loading';
import { AuthContext } from '../../Context/AuthProvider';
import MyAllTask from './MyAllTask';

const MyTask = () => {

    const {user} = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true)
        fetch(`https://tasks-hub-server.vercel.app/tasks?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setTasks(data)
            setLoading(false)
        })
    }, [user?.email])

    const handleDeleteTask = (id) =>{
        const proceed = window.confirm("Are you sure, you want to delete this task?")
        if(proceed){
            fetch(`https://tasks-hub-server.vercel.app/tasks/${id}`, {
                method:"DELETE",
            })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    const remainingTasks = tasks.filter(task => task._id !== id);
                    setTasks(remainingTasks); 
                    toast.success("Task Deleted Successfully")
                }
            })
        }
    };

 

    return (
       <div className='h-full'>
        {
            loading ? <Loading></Loading> : <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                 tasks.map(task => <MyAllTask
                 key={task._id}
                 task={task}
                 handleDeleteTask={handleDeleteTask}
                 ></MyAllTask>)
             }
            </div>
        }
       
       </div>
    );
};

export default MyTask;