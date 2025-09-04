'use client';

import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div 
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer"
    >
      <div className="flex items-center gap-1">
        <AiFillHome size={24} className="text-rose-500" />
        <span className="text-xl font-bold text-rose-500">Airbnb</span>
      </div>
    </div>
   );
}

export default Logo; 