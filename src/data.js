import React from 'react'
import { FaHome, FaUser } from "react-icons/fa"
import { GoDeviceCameraVideo, GoBook } from "react-icons/go";

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
        url: '/documentation',
        text: 'Documentation',
        icon: <GoBook />
    },
    {
        id: 4,
        url: '/login',
        text: 'Login',
        icon: <BiLogIn />
    },
    {
        id: 5,
        url: '/Register',
        text: 'Register',
        icon: <FaUser />
    },



]

export const movies_url = 'http://localhost:3500/apime/movies'
export const single_movie_url = 'http://localhost:3500/apime/movies/:id'
