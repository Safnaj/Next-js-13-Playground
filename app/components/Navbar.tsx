"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='' className='font-bold text-gray-700 text-xl'>
        OpenTable
      </Link>

      <div>
        {loading ? null : (
          <div className='flex'>
            {data ? (
              <button
                className='bg-blue-400 text-white border p-1 px-4 rounded'
                onClick={signout}
              >
                Sign out
              </button>
            ) : (
              <>
                <AuthModal isSignIn />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
