import { PrismaClient } from "@prisma/client";
import Descriptipn from "./components/Description";
import Images from "./components/Images";
import Ratings from "./components/Ratings";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  images: string[];
  description: string;
  slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      images: true,
      description: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavbar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Ratings />
        <Descriptipn description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>

      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
}