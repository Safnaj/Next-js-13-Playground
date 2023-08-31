import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='' className='font-bold text-gray-700 text-xl'>
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        <div className='flex'>
          <button className='bg-blue-400 text-white border p-2 mx-2 rounded'>
            Sign In
          </button>
          <button className='border p-1 px-4 rounded text-black'>
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
