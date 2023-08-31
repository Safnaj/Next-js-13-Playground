import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import RestaturantCard from "./components/RestaurantCard/RestaurantCard";

export default function Home() {
  return (
    <main className='bg-gray-100 min-h-screen w-screen text-black'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        <Navbar />
        <main>
          <Header />
          <div className='py-3 px-36 mt-10 flex flex-wrap'>
            <RestaturantCard />
          </div>
        </main>
      </main>
    </main>
  );
}
