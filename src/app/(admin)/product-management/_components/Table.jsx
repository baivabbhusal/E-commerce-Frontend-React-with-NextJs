"use client";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "@/api/products";
import { useEffect, useState } from "react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleLeft,
  FaAngleRight,
  FaArrowDown,
  FaArrowUp,
  FaCog,
  FaPencilAlt,
  FaPlus,
  FaUpload,
} from "react-icons/fa";
import { format } from "date-fns";
import { GrUpdate } from "react-icons/gr";
import emptyImage from "@/assets/images/products/imagePlaceholder.png";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_MANAGEMENT_ROUTE, CATEGORY_MANAGEMENT_ROUTE } from "@/constants/routes";
import DeleteProductButton from "./DeleteProductButton";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import Spinner from "@/components/Spinner";

const columns = [
  {
    label: "S.N",
    key: "id",
    sortable: false,
  },
  {
    label: "Product",
    key: "name",
    sortable: true,
  },
  {
    label: "Brand",
    key: "brand",
    sortable: true,
  },
  {
    label: "Category",
    key: "category",
    sortable: true,
  },
  {
    label: "Price",
    key: "price",
    sortable: true,
  },
  {
    label: "Stock",
    key: "stock",
    sortable: true,
  },
  {
    label: "Created At",
    key: "createdAt",
    sortable: true,
  },
];
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);
  const { refresh } = useSelector((state) => state.product);
  useEffect(() => {
    setLoading(true);
    const query ={};
    if (sortBy) query.sort=JSON.stringify({ [sortBy]: sortOrder })
    getProducts(query)
      .then((response) => setProducts(response.data))
      .finally(() => {
        setLoading(false);
      });
  }, [refresh, sortBy, sortOrder]);

  return (
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
        <div className="flex items-center flex-1 space-x-4">
          <h5>
            <span className="text-gray-500">All Products: </span>
            <span className="dark:text-white">123456</span>
          </h5>
          <h5>
            <span className="text-gray-500">Total sales: </span>
            <span className="dark:text-white">$88.4k</span>
          </h5>
        </div>
        <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
          <Link
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary dark:bg-primary/90 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary"
            href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}
          >
            <FaPlus className="h-2.5 w-2.5 mr-2" />
            Add new product
          </Link>
          <Link
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-white border border-primary/30 rounded-lg hover:bg-primary/5 dark:bg-gray-800 dark:border-gray-700 dark:text-zinc-200"
            href={CATEGORY_MANAGEMENT_ROUTE}
          >
            Manage Categories
          </Link>
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <GrUpdate className="w-4 h-4 mr-2" />
            Update stocks 1/250
          </button>
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <FaUpload className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ?? (
          <div className="px-8 w-full text-center">
            <Spinner />{" "}
          </div>
        )}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th
                  scope="col"
                  key={index}
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => {
                    if (!column.sortable) return;
                    setSortBy(column.key);
                    setSortOrder(sortOrder == 1 ? -1 : 1);
                  }}
                >
                  <div className="flex gap-0.5 justify-start items-center">
                    {column.label}
                    {column.sortable ? (
                      column.key == sortBy ? (
                        sortOrder == 1 ? (
                          <FaAngleDoubleUp />
                        ) : (
                          <FaAngleDoubleDown />
                        )
                      ) : (
                        <HiMiniChevronUpDown />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
              <th scope="col" className="px-4 py-3">
                <FaCog />
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-gray-300">
                  {index + 1}.
                </td>
                <th
                  scope="row"
                  className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    height={32}
                    width={32}
                    src={product.imageUrls[0] ?? emptyImage}
                    alt={`This is image of ${product.name}`}
                    className="w-8 h-8 mr-3 object-cover"
                  />
                  {product.name}
                </th>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.brand}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-secondary/20 text-primary rounded-2xl">
                      {product.category}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Rs. {product.price}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.stock > 10 ? (
                    <div className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full" />
                  ) : product.stock > 5 ? (
                    <div className="inline-block w-4 h-4 mr-2 bg-yellow-500 rounded-full" />
                  ) : (
                    <div className="inline-block w-4 h-4 mr-2 bg-red-500 rounded-full" />
                  )}
                  {product.stock ?? 1}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {format(product.createdAt, "dd MMM,yyyy")}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex gap-2">
                    <Link
                      href={`${PRODUCT_MANAGEMENT_ROUTE}/update/${product._id}`}
                      className="text-blue-600"
                    >
                      <FaPencilAlt />
                    </Link>
                    <DeleteProductButton id={product._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>
          of
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <a
              href="#"
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <FaAngleLeft />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary/90 bg-primary/10 border-primary hover:bg-primary/30 hover:text-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              100
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <FaAngleRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductTable;
