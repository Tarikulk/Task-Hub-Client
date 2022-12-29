import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const AddTasks = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const title = form.title.value;
        const date = form.date.value;
        const details = form.details.value;
        const image = form.image.files[0];
        
        const formData = new FormData();
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=e8b14febb369d80ce9e343791ec92636`
        fetch(url, {
            method:"POST",
            body:formData
        })
        .then(res => res.json())
        .then( imgData =>{
            if(imgData.success){
                const tasks = {
                    email,
                    title,
                    date,
                    details,
                    image: imgData.data.display_url,
                }
                fetch("https://tasks-hub-server.vercel.app/tasks", {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(tasks)
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    toast.success("task added successfully")
                    navigate("/myTask")
                    form.reset()
                })
                .catch(error =>{
                    console.log(error)
                })
            }
        })
        
    }

    return (
        <div className='my-20 mx-10 '>
            <section className="p-6 dark:bg-gray-700 bg-sky-300 dark:text-gray-50 rounded-lg">
	<form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"> 
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-sky-500">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add Your Tasks</p>
				<p className="text-xs">Add Your Tasks And Complete It....</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full">
					 <input type="text" name='email' className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75  dark:border-gray-700 dark:text-gray-900" defaultValue={user?.email} readOnly />
				</div>
				<div className="col-span-full sm:col-span-3"> 
					<input id="username" type="text" name='title' placeholder="Title" className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75  dark:border-gray-700 dark:text-gray-900" required />
				</div>
				<div className="col-span-full sm:col-span-3"> 
					<input id="website" type="date" name='date' className="p-2 w-full rounded-md focus:ring text-sm focus:ring-opacity-75  dark:border-gray-700 dark:text-gray-900" required />
				</div>
				<div className="block md:flex lg:flex justify-center items-center col-span-full">
                    <div className="w-full pr-5">
                    <div className="flex">
                        <input type="file" name="image" id="files" className="px-16 py-16 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-white" required />
                    </div>
                    </div>
                    <div className="w-full">
					<textarea id="bio" placeholder="Tasks Details" name='details' className="mt-10 md:mt-1 lg:mt-1 p-2 h-40 w-full rounded-md focus:ring focus:ring-opacity-75  dark:border-gray-700 dark:text-gray-900" required></textarea>
				</div>
				</div>
                <div className='w-full flex justify-center items-center'>
                <button type="submit" className="mt-10 md:mt-1 lg:mt-1 px-8 py-3 font-semibold rounded bg-white dark:text-gray-800">
                    Add Task
                </button>
                </div>
			</div>
		</fieldset>
	</form>
</section>
        </div>
    );
};

export default AddTasks;