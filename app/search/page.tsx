import { PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaturantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";

const prisma = new PrismaClient();

const fetRestaturantsByCity = (city: string | undefined) => {
  // Select Type | Fields
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string };
}) {
  const restaurants = await fetRestaturantsByCity(searchParams.city);
  return (
    <>
      <div className='bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2'>
        <Header />
      </div>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <Sidebar />
        <div className='w-5/6'>
          {restaurants.length ? (
            <RestaturantCard />
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
