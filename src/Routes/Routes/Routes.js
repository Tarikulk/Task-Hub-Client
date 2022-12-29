import { createBrowserRouter } from "react-router-dom";
import SignIn from "../../Authentication/SignIn";
import SignUp from "../../Authentication/SignUp";
import Main from "../../Layout/Main";
import CompletedTaskHome from "../../Pages/CompletedTasks/CompletedTaskHome";
import Home from "../../Pages/Home/Home";
import MyTaskHome from "../../Pages/MyTasks/MyTaskHome";
import UpdateTasks from "../../Pages/MyTasks/UpdateTasks";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/myTask",
                element: <MyTaskHome></MyTaskHome>
            },
            {
                path:"/updateTasks/:id",
                element:<UpdateTasks></UpdateTasks>,
                loader: ({params}) => fetch(`https://tasks-hub-server.vercel.app/tasks/${params.id}`)
            },
            {
                path:"/completedTask",
                element:<CompletedTaskHome></CompletedTaskHome>
            },
            {
                path:"/signIn",
                element:<SignIn></SignIn>
            },
            {
                path:"/signUp",
                element:<SignUp></SignUp>
            },
        ]
    }
])