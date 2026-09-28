"use client"
import Image from 'next/image';
import manWear from "@/assets/images/loginDesign/manWear.jpg"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HOME_ROUTE } from '@/constants/routes';

const AuthLayout = ({children}) => {
const {user}=useSelector((state)=>state.auth);
const router=useRouter();
  useEffect(()=>{
if(user) router.push(HOME_ROUTE);
  },[user,router]);

  return (
<section className='flex py-10 md:items-center justify-center bg-slate-100 dark:bg-slate-900'>
 <div className='container mx-auto px-4 rounded-3xl dark:bg-slate-700'>
  <div className='flex justify-center  '>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center bg-white dark:bg-slate-700'>
    <div className='hidden md:flex flex-col justify-evenly p-3 h-full'>
      <Image 
      alt="This is image"
      src={manWear}
      className='rounded-4xl'
      ></Image>
    </div>
      <div>{children}</div>

  </div>

  </div>

 </div>
</section>
    
  )
}

export default AuthLayout;