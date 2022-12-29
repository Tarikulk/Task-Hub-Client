import { useQuery } from '@tanstack/react-query';
import React, { useContext} from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../Components/Loading';
import { AuthContext } from '../../Context/AuthProvider';
import AllCompleteTasks from './AllCompleteTasks';

const CompletedTask = () => {

    const {user} = useContext(AuthContext); 

    const {data : completeTasks = [], refetch, isLoading} = useQuery({
        queryKey: ["completedTasks", user?.email],
        queryFn: async() =>{
            const res = await fetch(`https://tasks-hub-server.vercel.app/completeTasks?email=${user?.email}`)
            const data = await res.json()
            return data;
        } 
    });


    if(isLoading){
        return <Loading></Loading>
    };


    const undoCompletedTasks = (id) =>{
        const proceed = window.confirm("Are you sure, You Want To Delete This Task?")
        if(proceed){
            fetch(`https://tasks-hub-server.vercel.app/completeTasks/${id}`, {
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    refetch()
                    toast.success("Mark As Uncompleted.")
                }
            })
        }
    }

    const deleteTask = (id) =>{
        const proceed = window.confirm("Are You sure, You Want To Delete This Task?")
        if(proceed){
            fetch(`https://tasks-hub-server.vercel.app/deleteTask/${id}`, {
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    refetch()
                    toast.success("Task Deleted.")
                }
            })
        }
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                completeTasks?.map(completeTask => <AllCompleteTasks
                key={completeTask._id}
                completeTask={completeTask}
                undoCompletedTasks={undoCompletedTasks}
                deleteTask={deleteTask}
                ></AllCompleteTasks>)
            }            
        </div>
    );
};

export default CompletedTask;