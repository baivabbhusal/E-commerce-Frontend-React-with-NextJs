"use client"
import { deleteProduct } from '@/api/products';
import Modal from '@/components/Modal';
import Model from '@/components/Modal';
import { refreshList } from '@/redux/product/productSlice';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const DeleteProductButton = ({id}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch=useDispatch();
    function confirmDelete(){
       deleteProduct(id).then(()=>{
        dispatch(refreshList());
        toast.success("Product Deleted Sucessfully.",{
            autoClose:1000,
        })}
    )
       .catch((error)=>toast.error(error))
       .finally(()=>{
        setShowModal(false)
    });

    }
  return (
    <>
        
    <button className="text-red-300 hover:text-red-600"
    onClick={()=>setShowModal(true)}
    >
        <FaTrash />
    </button>
             <Modal
     setShowModal={setShowModal}
     showModal={showModal} 
     label="Are you sure you want to delete this product?"
          
          icon={<MdErrorOutline className="h-20 w-20 text-center text-primary" />}
          confirmAction={
                  <button
                  className="text-white bg-secondary box-border border border-transparent hover:bg-secondary/90 focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  onClick={confirmDelete}
                >
                  Yes, I'm sure
                </button>
          }
        />
    </>

  )
}

export default DeleteProductButton
