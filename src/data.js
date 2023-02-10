import React from 'react'
import { FaHome, FaUser } from "react-icons/fa"
import { GoDeviceCameraVideo } from "react-icons/go";
import { BiLogIn } from "react-icons/bi";

export const links = [
    {
        id: 1,
        url: '/',
        text: 'Home',
        icon: <FaHome />
    },
    {
        id: 2,
        url: '/movies',
        text: 'Movies',
        icon: <GoDeviceCameraVideo />
    },
    {
        id: 3,
        url: '/login',
        text: 'Login',
        icon: <BiLogIn />
    },
    {
        id: 4,
        url: '/signup',
        text: 'Signup',
        icon: <FaUser />
    },

]

export const movies_url = 'http://localhost:5000/apime/movies'
export const single_movie_url = 'http://localhost:5000/apime/movies/:id'
