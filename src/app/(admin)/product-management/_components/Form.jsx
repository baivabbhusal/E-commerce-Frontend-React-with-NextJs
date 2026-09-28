"use client";
import { createProduct, updateProduct } from "@/api/products";
import { categoryApi } from "@/services/api";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductForm = ({product,isUpdating}) => {
  const [loading, setLoading] = useState(false);
  const [localImageUrls,setLocalImageUrls]=useState([]);
  const [productImages,setProductImages]=useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm( 
    {
      values:product,
    }
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const catList = await categoryApi.getAll();
        setCategories(Array.isArray(catList) ? catList : []);
      } catch (e) {
        console.error("Failed to load categories in form:", e);
      }
    }
    fetchCategories();
  }, []);

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      setSavingCategory(true);
      const created = await categoryApi.create({ name: newCategoryName.trim() });
      setCategories((prev) => [created, ...prev]);
      setValue("category", created.name, { shouldValidate: true });
      toast.success(`Category "${created.name}" created and selected!`);
      setNewCategoryName("");
      setIsCreatingCategory(false);
    } catch (err) {
      toast.error("Failed to create category");
    } finally {
      setSavingCategory(false);
    }
  };
  function prepareData(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock >> 1);

    if (data.description) formData.append("description", data.description);

    if(productImages.length>0){
      productImages.map((image)=>{
        formData.append("images",image)
      });
    }

    return formData;
  }
  async function submitForm(data) {
    
    setLoading(true);
    const input = prepareData(data);
    try {
      if (isUpdating){
        await updateProduct(product._id,input);
        toast.success("product Updated successfully.", {
        autoClose: 1000,
      });
            }
      else{
      await createProduct(input);
      reset();
      toast.success("product created successfully.", {
        autoClose: 1000,
      });
    }
    } 
    catch (error) {
      toast.error(error.response?.data, {
        autoClose: 1000,
      });
    }
    finally{
      setLoading(false);
      setLocalImageUrls([]);
      setProductImages([]);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              {...register("name", {
                required: "Product name is required.",
              })}
            />
            <p className="text-red-500 mt-2">{errors.name?.message}</p>
          </div>
          <div className="w-full">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Product brand"
              {...register("brand", {
                required: "Enter a brand name.",
              })}
            />
            <p className="text-red-500 mt-2">{errors.brand?.message}</p>
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="2999"
              {...register("price", {
                required: "Please enter a price.",
              })}
            />
            <p className="text-red-500 mt-2">{errors.price?.message}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingCategory(!isCreatingCategory)}
                className="text-xs font-semibold text-primary hover:underline dark:text-emerald-400"
              >
                {isCreatingCategory ? "Select from list" : "+ Add New Category"}
              </button>
            </div>

            {isCreatingCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <button
                  type="button"
                  disabled={savingCategory}
                  onClick={handleAddNewCategory}
                  className="px-3 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/80 disabled:opacity-50"
                >
                  {savingCategory ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...register("category", {
                  required: "Product category is required.",
                })}
              >
                <option value="">Select category</option>
                {/* Dynamically list all categories */}
                {categories.map((c) => {
                  const val = c.name || c;
                  return (
                    <option key={c.id || val} value={val}>
                      {val}
                    </option>
                  );
                })}
                {/* Fallback default options if categories still loading or not in list */}
                {product?.category && !categories.some((c) => (c.name || c) === product.category) && (
                  <option value={product.category}>{product.category}</option>
                )}
              </select>
            )}
            <p className="text-red-500 mt-2">{errors.category?.message}</p>
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={200}
              {...register("stock")}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"
              {...register("description")}
            />
          </div>

          <div className="sm:col-span-2 pb-2">
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Images
            </label>
            <div className="flex items-center justify-center w-full ">
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-40 
                bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 border-solid rounded-xl rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
              >
                <div className="flex flex-col items-center justify-center text-body pt-5 ">
                  <svg
                    className="w-8 h-8 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs">
                     PNG, JPG or JPEG
                  </p>
                </div>
                <input id="images" type="file" className="hidden"
                multiple
                accept=".png,.jpeg,.jpg"
                onChange={(event)=>{
                  const files=[];
                  const urls=[];

                  Array.from(event.target.files).map((file)=>{
                    files.push(file);
                    urls.push(URL.createObjectURL(file));
                  });
                   setLocalImageUrls(urls);
                  setProductImages(files);
                 
                }} />
              </label>
            </div>
          </div>
          {localImageUrls.length>0 && (
            <div className="flex items-center gap-3 py-3">
              {localImageUrls.map((url,index)=>(
              <Image key={index} height={50} width={50} alt="This is selected image" src={url} className="h-16 w-16 object-cover" />)

              )}
            </div>
          )}
        </div>
        <Button
          type="submit"
          label={isUpdating ? "Update Product":"Add Product"}
          loading={loading}
          className="items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary/70"
        />
      </form>
    </div>
  );
};
export default ProductForm;
