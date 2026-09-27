import React from 'react'

const Page = () => {
    function move(){

    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
     <div className='bg-neutral-400/40 w-1/3 h-1/4 rounded flex flex-col justify-center p-10 backdrop-blur- z-100'>
        <h1 className='text-white font-bold text-center text-2xl'>Do you want to delete?</h1>
<div className='flex justify-between m-3'>
            <button className="bg-amber-300 px-4  py-2 rounded">Yes</button>
        <button className='bg-blue-500 px-4 py-2 rounded hover:translate-y-20'>cancel</button>
</div>
     </div>
    </div>
  )
}

export default Page
