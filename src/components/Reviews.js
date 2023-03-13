import React from 'react'
import Stars from './Stars'
const Reviews = ({ reviews }) => {
    return (
        <ul>

         {reviews.map(review => (
            <li key={review._id} >
                 <div className='card border-info'>
                     <div className='card-body'>
                         <div className='row justify-content-between'>
                             <div className='col'>
                                 {review.user.username}
                             </div>
                             <div className='col'>
                                 <Stars rating={review.reviewRating} />
                             </div>
                         </div>
                         <div className='row'>
                             {review.createdAt}
                         </div>
                         <div className='row'>
                             {review.reviewComment}
                         </div>
                     </div>

                 </div>
                 <br />
            </li>
            
         ))}
            
        </ul>
    )
}

export default Reviews