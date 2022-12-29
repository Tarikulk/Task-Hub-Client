import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTasks = () => {

    const storedTasks = useLoaderData();
    const {title, details} = storedTasks;
    const navigate = useNavigate()

    const handleUpdateTasks = (event) =>{
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const details = form.details.value;

        const allUpdateTask = {
            title, 
            details
        }

        fetch(`https://tasks-hub-server.vercel.app/updateTasks/${storedTasks._id}`, {
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(allUpdateTask)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success("user tasks updated successfully")
                form.reset()
                navigate("/myTask")
            }
        })

    }

    return (
        <div>
            <div className='my-20 mx-10'>
            <section className="p-6 bg-sky-300 dark:bg-gray-700 dark:text-gray-50 rounded-lg">
	<form onSubmit={handleUpdateTasks} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"> 
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-sky-500">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Update Your Tasks</p>
				<p className="text-xs">Update Your Tasks And Complete It....</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"> 
				<div className="col-span-full"> 
					<input id="username" type="text" name='title' placeholder="Title" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" defaultValue={title} />
				</div> 
				<div className="block md:flex lg:flex justify-center items-center col-span-full"> 
                    <div className="w-full">
					<textarea id="bio" placeholder="Tasks Details" name='details' className="mt-10 md:mt-1 lg:mt-1 p-2 h-40 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" defaultValue={details}></textarea>
				</div>
				</div>
                <div className='w-full flex justify-center items-center'>
                <button type="submit" className="mt-10 md:mt-1 lg:mt-1 px-5 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 bg-white">Update Task</button>
                </div>
			</div>
		</fieldset>
	</form>
</section>
        </div>
        </div>
    );
};

export default UpdateTasks;