import ProductForm from "../_components/Form";
import { MdErrorOutline } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import Modal from "@/components/Modal";

const AddProduct = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
              <button>
          <div className="flex justify-center items-center hover:text-primary px-10 fixed top-1/2 left-6">
            <IoArrowBackOutline />Back
          </div>
            </button>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <ProductForm />
        <Modal
          label={
            " Are you sure you want to delete this product from your account?"
          }
          icon={<MdErrorOutline className="h-20 w-20 text-center" />}
          confirmAction={
                  <button
                  className="text-white bg-secondary box-border border border-transparent hover:bg-secondary/90 focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Yes, I'm sure
                </button>
          }
        />
      </div>
    </section>
  );
};

export default AddProduct;
