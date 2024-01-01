import { Review } from "@prisma/client";
import { displayTimeObject } from "../data";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  );
};

export type Time = keyof typeof displayTimeObject;

export const convertToDisplayTime = (time: Time) => {
  return displayTimeObject[time];
};
