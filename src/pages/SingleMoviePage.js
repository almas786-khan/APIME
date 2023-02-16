import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const single_movie_url = 'http://localhost:3500/apime/movies'

function SingleMoviePage() {


    const { _id } = useParams();

    return (<h1>single page  </h1>)
};



export default SingleMoviePage;