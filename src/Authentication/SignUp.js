import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SmallLoading from '../Components/SmallLoading';
import { AuthContext } from '../Context/AuthProvider';

const SignUp = () => {

    const {createUser, signInWithGoogle, updateUserProfile, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault()
        const form = event.target;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(result =>{
            const user = result.user;
            updateUserProfile(name)
            .then(() =>{
                console.log("user name updated")
                navigate("/")
            })
            .catch(error =>{
               console.log(error)
            })
               console.log(user);
               form.reset();
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result=>{
            const user = result.user;
            console.log(user)
            navigate("/")
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    return (
        <div>
            <div className='my-10 flex justify-center items-center'>
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-sky-500 dark:bg-gray-900">
	<h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>
	<form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
		<div className="space-y-1 text-sm">
			<input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-700 bg-white  focus:dark:border-violet-400" />
		</div>
		<div className="space-y-1 text-sm">
			<input type="email" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 bg-white  focus:dark:border-violet-400" />
		</div>
		<div className="space-y-1 text-sm">
			<input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-700 bg-white focus:dark:border-violet-400" />
		</div>
		<button className="block w-full p-3 text-center rounded-lg dark:text-gray-900 bg-white">
            {loading ? <SmallLoading></SmallLoading> : "Sign Up"}
        </button>
	</form>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
		<p className="px-3 text-sm text-white">Login with social accounts</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
	</div>
	<div className="flex justify-center space-x-4">
		<button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-lg bg-white w-full text-black">
			{loading ? <SmallLoading></SmallLoading> : "Log In With Google"}
		</button> 
	</div>
	<p className="text-xs text-center sm:px-6 text-black dark:text-white">Already have an account?
		<Link to="/signIn" rel="noopener noreferrer" className="underline dark:text-gray-100">Sign In</Link>
	</p>
</div>    
        </div>
        </div>
    );
};

export default SignUp;