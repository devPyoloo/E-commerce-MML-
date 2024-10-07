import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch data
const fetchCategories = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/category/all");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // re-throw to allow react-query to handle it
  }
};

// PostInsert Data
const insertNewProduct = async (formData) => {
  await axios.post("http://localhost:8080/api/product/add-product", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Add new category
const addCategory = async (newCategory) => {
  await axios.post(
    "http://localhost:8080/api/category/add-category",
    { category: newCategory },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default function AddProduct() {
  const [isToggle, setIsToggle] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description:'',
    stock: '',
    brand: '',
    rating: '',
    reviewCount: '',
    ingredients: '',
    usageInstructions: '',
    expirationDate: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Accepts single file only
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setImage(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Fetch data
  const {
    data: categories,
    isLoading: fetchLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
    staleTime: 10000,
  });

  // Add Category
  const {
    mutate: addCategoryMutate,
    isLoading: mutationLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: addCategory,
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries(["category"]);
      const previousData = queryClient.getQueryData(["category"]);

      queryClient.setQueryData(["category"], (oldData) => {
        return [...oldData, newCategory];
      });

      return { previousData };
    },
    onError: (error, _newCategory, context) => {
      queryClient.setQueryData(["category"], context.previousData);
      mutationError(error.message || "An error occured while adding category");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const { mutation: addProduct, isLoading }

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategoryMutate(newCategory);
      setNewCategory("");
      setIsToggle(false);
    } else {
      alert("Category name cannot be empty.");
    }
  };



  const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }


  const handleProductForm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
    
    if(image) {
      formData.append("image", image[0]);
    };


   // Log all key-value pairs in formData
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`Key: ${key}, Value: Name: ${value.name}, Size: ${value.size}, Type: ${value.type}`);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  }
      
    
    })
  }

  if (isLoading) return <div>Loading Category...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;


  return (
    <div className="mb-20">
      <hr className="h-px my-8 bg-gray-200 border" />
      <section className="mx-20 flex flex-col">
        <form onSubmit={handleProductForm} className="">
          <header className="flex justify-between items-center sticky bg-offwhite top-0 py-3 z-10 mb-10">
            <h1 className="font-semibold text-2xl">Add New Product</h1>
            <button
              type="submit"
              className="flex items-center gap-x-3 font-medium bg-green-400 text-xl text-stone-900 py-3 px-5 rounded-full"
            >
              <FaCheck /> Add Product
            </button>
          </header>

          <div className="flex gap-x-5">
            {/* Product Details Form */}
            <main className="flex flex-col lg:w-3/5 gap-y-5">
              <div className="p-5 rounded-md bg-extraLightGray">
                <h1 className="text-xl font-semibold mb-5">
                  General Information
                </h1>
                <label className="flex flex-col gap-y-2 mb-5">
                  Name Product
                  <input
                    className="bg-mutedgray rounded-lg py-3 px-3 outline-none"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name of product"
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Description
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    placeholder="Description of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5 w-full">
                  Brand
                  <input
                    className="bg-mutedgray rounded-lg py-3 px-3 w-full"
                    type="text"
                    name="brand"
                    onChange={handleChange}
                    placeholder="Brand"
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Ingredients
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    name="ingredients"
                    onChange={handleChange}
                    placeholder="Ingredients of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Usage
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    name="usageInstructions"
                    onChange={handleChange}
                    placeholder="Usage of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Expiration Date
                  <input
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="date"
                    onChange={handleChange}
                    name="expirationDate"
                  />
                </label>
              </div>

              {/* Pricing and Stock Details */}
              <div className="p-5 rounded-md bg-extraLightGray">
                <h1 className="text-xl font-semibold mb-5">
                  Pricing and Stock
                </h1>

                <div className="flex gap-x-5">
                  <label className="flex flex-col gap-y-2 mb-5 w-full">
                    Base Pricing
                    <input
                      className="bg-mutedgray rounded-lg py-3 px-3"
                      type="number"
                      name="price"
                      onChange={handleChange}
                      placeholder="Price"
                    />
                  </label>

                  <label className="flex flex-col gap-y-2 w-full">
                    Stock
                    <input
                      className="bg-mutedgray rounded-lg py-3 px-3"
                      type="number"
                      name="stock"
                      onChange={handleChange}
                      placeholder="Stock"
                    />
                  </label>
                </div>
              </div>
            </main>

            <aside className="lg:w-1/3">
              <figure className="p-5 rounded-md bg-extraLightGray">
                <h1 className="text-xl font-medium mb-5">Upload Image</h1>
                <label
                  {...getRootProps()}
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-mutedgray"
                >
                  <input {...getInputProps()} />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-fit w-4/5 h-auto rounded-md"
                    />
                  ) : (
                    <>
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <TbCloudUpload className="text-4xl stroke-lightgray" />
                          <p className="mb-2 text-sm text-lightgray">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-lightgray">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </label>
              </figure>

              <div className="flex justify-center gap-x-6 w-full mt-5">
                <select className="w-full bg-extraLightGray border border-gray-300 text-sm rounded-lg p-2.5" defaultValue="Select category" name="category" onChange={handleChange} >
                  <option value="Select category" disabled>
                    Select category
                  </option>
                  {categories?.map((category) => (
                    <option
                      value={category.category}
                      key={`${category.id} - ${category.category}`}
                    >
                      {category.category}
                    </option>
                  ))}
                </select>

                <span
                  onClick={() => setIsToggle(true)} // Ensure setIsToggle is defined in your component
                  className="w-72 py-3 px-4 text-sm bg-mutedblack text-mutedgray text-center rounded-full cursor-pointer"
                >
                  Add Category
                </span>
              </div>
            </aside>
          </div>
        </form>

        {/* Adding new category */}
        {isToggle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleCategorySubmit}
              className="bg-white rounded-lg p-6 w-4/5 md:w-96 shadow-lg"
            >
              <div className="flex justify-between mb-10">
                <h1 className="font-semibold text-lg">Add Category</h1>
                <MdCancel
                  onClick={() => setIsToggle(false)}
                  className="text-xl fill-mutedblack cursor-pointer"
                />
              </div>

              <label className="flex flex-col gap-y-3 mb-10 text-sm">
                Category Name
                <input
                  className="bg-mutedgray py-2 px-4 rounded-lg outline-none"
                  type="text"
                  value={newCategory}
                  name="newCategory"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </label>

              <div className="float-end">
                <button className="flex items-center gap-x-3 bg-green-400 text-sm text-stone-900 font-medium py-2 px-3 rounded-full">
                  <FaCheck /> Add Category
                </button>

                {mutationLoading && <p>Adding category...</p>}
                {mutationError && <p>Error: {mutationError.message}</p>}
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
