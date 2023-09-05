import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";

const prisma = new PrismaClient();

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchItems(params.slug);

  return (
    <>
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
