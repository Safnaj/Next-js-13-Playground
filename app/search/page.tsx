import Header from "./components/Header";
import RestaturantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";

export default function Search() {
  return (
    <>
      <div className='bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2'>
        <Header />
      </div>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <Sidebar />
        <div className='w-5/6'>
          <RestaturantCard />
        </div>
      </div>
    </>
  );
}
