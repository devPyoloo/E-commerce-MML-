import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone } from "react-dropzone";

export default function AddProduct() {
  const [isToggle, setIsToggle] = useState(false);
  const [preview, setPreview] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    if(acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }

    console.log(acceptedFiles)
    // Upload to backend
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="mb-20">
      <hr className="h-px my-8 bg-gray-200 border" />
      <section className="mx-20 flex flex-col">
        <form action="" className="">
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
                    placeholder="Name of product"
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Description
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    placeholder="Description of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5 w-full">
                  Brand
                  <input
                    className="bg-mutedgray rounded-lg py-3 px-3 w-full"
                    type="text"
                    placeholder="Brand"
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Ingredients
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    placeholder="Ingredients of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Usage
                  <textarea
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="text"
                    placeholder="Usage of the product..."
                  />
                </label>

                <label className="flex flex-col gap-y-2 mb-5">
                  Expiration Date
                  <input
                    className="bg-mutedgray rounded-lg py-3 px-3"
                    type="date"
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
                      placeholder="Price"
                    />
                  </label>

                  <label className="flex flex-col gap-y-2 w-full">
                    Stock
                    <input
                      className="bg-mutedgray rounded-lg py-3 px-3"
                      type="number"
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
                    <span className="font-semibold">Click to upload</span>{" "}
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

      <div className="flex flex-col justify-center mb-5 w-full">
        <select name="" id="">
          <option value="">Skincare</option>
        </select>
        <span
          onClick={() => setIsToggle(true)} // Ensure setIsToggle is defined in your component
          className="py-3 px-4 text-sm bg-mutedblack text-mutedgray rounded-full cursor-pointer"
        >
          Add Category
        </span>
      </div>
    </aside>
    </div>
        </form>

        {isToggle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              action=""
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
                  name=""
                />
              </label>

              <div className="float-end">
                <button className="flex items-center gap-x-3 bg-green-400 text-sm text-stone-900 font-medium py-2 px-3 rounded-full">
                  <FaCheck /> Add Category
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
