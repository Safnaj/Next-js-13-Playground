import Descriptipn from "./components/Description";
import Images from "./components/Images";
import Ratings from "./components/Ratings";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export default function RestaurantDetails() {
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavbar />
        <Title />
        <Ratings />
        <Descriptipn />
        <Images />
        <Reviews />
      </div>

      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
}
