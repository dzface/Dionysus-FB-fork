import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ ratingProps, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    onRate(index + 1);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            {starValue <= (hoverRating || ratingProps) ? (
              <FaStar color="gold" />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;