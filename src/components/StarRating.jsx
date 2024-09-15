import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


export default function StarRating({ rating, maxRating = 5 }) {

  const stars = [];

  for (let index = 1; index <= maxRating; index++) {
     if(index <= rating) {
      stars.push(<FaStar key={index} className='text-yellow-400' />)
     } else if(index  - 0.5 <= rating){
      stars.push(<FaStarHalfAlt key={index} className='text-yellow-400' />)
     } else {
      stars.push(<FaRegStar key={index} />)
     }
    
  }

  return (
    <div className='flex'>{stars}</div>
  )
}

