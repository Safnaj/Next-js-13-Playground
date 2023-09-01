import Header from "./components/Header/Header";
import RestaturantCard from "./components/RestaurantCard/RestaurantCard";

export default function Home() {
  return (
    <>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        <RestaturantCard />
      </div>
    </>
  );
}
