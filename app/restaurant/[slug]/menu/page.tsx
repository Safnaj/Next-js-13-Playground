import Menu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";

export default function RestaurantMenu() {
  return (
    <>
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar />
        <Menu />
      </div>
    </>
  );
}
