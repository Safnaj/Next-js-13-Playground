import Link from "next/link";
import AuthModal from "./AuthModal";

export default function Navbar() {
  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='' className='font-bold text-gray-700 text-xl'>
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        <div className='flex'>
          <AuthModal isSignIn />
          <AuthModal isSignIn={false} />
        </div>
      </div>
    </nav>
  );
}
