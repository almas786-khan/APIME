import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components'



const SingleMoviePage = () => {
    const [movie, setMovies] = useState([])
    const { _id } = useParams();


    const url = `/apime/movies/${_id}`;
    const fetchData = async () => {
        try {

            const { data: { movie } } = await axios.get(url)
            setMovies(movie)
            console.log(movie)


        }
        catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Wrapper className='section'>
                <div className='title'>
                    <h2>Single Movie page</h2>
                    <div className='underline'></div>
                    <Link to='/movies'>back to movies</Link></div>
                <div className='section section-center page'>

                    <div className='product-center'>
                        {[movie].map(mv => (
                            <ul key={mv._id}>
                                <section className='content'>
                                    <h2>{mv.title}</h2>

                                    <p>{mv.category}</p>
                                    <p>{mv.director}</p>
                                    <p>{mv.yearReleased}</p>
                                    <img src={mv.image}></img>
                                </section>
                            </ul>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </>


    )
};

const Wrapper = styled.section`
  background: var(--clr-primary-00);
 .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .title{
    color :var(--clr-primary-01)
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`

export default SingleMoviePage;