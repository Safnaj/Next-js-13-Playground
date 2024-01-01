import React from "react";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const reviewRating = rating || calculateReviewRatingAverage(reviews); //If rating is not exiting calculateRatings

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      // Calculate the 'difference' as a decimal number with one decimal place.
      const difference = parseFloat((reviewRating - i).toFixed(1));
      // If the difference is 1 or greater, add a full star.
      if (difference >= 1) stars.push(fullStar);
      // If the difference is less than 1 and greater than 0, it means a fractional star is needed.
      else if (difference < 1 && difference > 0) {
        // If the difference is less than or equal to 0.2, add an empty star.
        if (difference <= 0.2) stars.push(emptyStar);
        // If the difference is greater than 0.2 but less than or equal to 0.6, add a half star.
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        // If the difference is greater than 0.6, add a full star.
        else stars.push(fullStar);
      }
      // If the difference is 0 or negative, add an empty star.
      else stars.push(emptyStar);
    }
    return stars.map((star) => (
      <Image src={star} alt='' className='w-4 h-4 mr-1' />
    ));
  };
  return <div className='flex items-center'>{renderStars()}</div>;
}
