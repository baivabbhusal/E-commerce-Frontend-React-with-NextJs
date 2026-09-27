"use client";
import React, { useState } from "react";
import { GiCrossMark } from "react-icons/gi";


const Modal = ({showModal,setShowModal,label,icon,confirmAction}) => {
  function closeModal(){
    setShowModal(false);
  }
  return (
    <div className={showModal ? "" : "hidden"}>
      <div className=" fixed top-0 right-0 left-0 z-50 flex  justify-center items-center  md:inset-0 h-[calc(100%-1rem)]">
        <div className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 opacity-25 "></div>
          <div className="relative z-50 bg-white dark:bg-slate-800 border border-gray-400 rounded-base shadow-sm p-4 md:p-6 rounded-xl">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-red-600 hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
             <GiCrossMark onClick={closeModal} className="text-primary"/>
              <span className="sr-only">Close modal</span>
            </button>
            <div className=" flex flex-col items-center justify-center p-4 md:p-5 text-center">
                {icon}

              <h3 className="mb-6 text-body">
               {label}
              </h3>
              <div className="flex items-center space-x-4 justify-center">
                {confirmAction}
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-slate-200 dark:hover:bg-slate-500 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                onClick={closeModal}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Modal;
