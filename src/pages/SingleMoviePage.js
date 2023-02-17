import { useParams, Link } from 'react-router-dom';


const SingleMoviePage = () => {
    console.log(useParams());

    const { _id } = useParams();

    return (
        <section>
            <h1>
                Single movie page {_id}
            </h1>

            <Link to='/movies'>back to movies</Link>
        </section>

    )
};



export default SingleMoviePage;