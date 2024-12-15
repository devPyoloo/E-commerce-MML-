import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { useModalStore } from "../../store/useModalStore";

const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/public/register",
      formData
    );
    console.log("Registered new user response", response);
    return response.data;
  } catch (error) {
    console.error("Error registering new user", error);
    throw error;
  }
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErroMessage] = useState();
  const { isToggleModal, toggleModal } = useModalStore();
  const navigate = useNavigate();

  const {
    mutate: registerNewUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      setErroMessage(
        error.response?.data || "An error occured. Please try again."
      );
    },
    onSuccess: () => {
      navigate("/login");
      console.log("Registration successful! Redirecting to login...");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username && formData.email && formData.password) {
      registerNewUser(formData);
    }
  };
  return (
    <>
      {isToggleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {isPending && (
            <div
              className="fixed inset-0 bg-black bg-opacity-35 flex items-center justify-center z-60"
              aria-live="polite"
              aria-busy="true"
            >
              <p className="flex items-center gap-x-3 text-2xl text-extraLightGray">
                <CgSpinner className="animate-spin text-4xl" />
                Just a moment, we're signing you up...
              </p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white py-16 lg:w-2/6 px-10 rounded-sm grid grid-cols-1 gap-y-5 shadow-lg"
          >
            <MdCancel
              onClick={() => toggleModal()}
              className="text-2xl fill-mutedblack cursor-pointer -mt-10 -ml-5"
            />
            <h1 className="font-bold text-4xl -mb-5">Registration</h1>
            <h3 className="text-lightgray font-light">
              Please enter your details
            </h3>

            <input
              className="bg-extraLightGray px-3 py-2 outline-none placeholder:text-sm"
              placeholder="Username"
              value={formData.username}
              type="text"
              name="username"
              onChange={handleChange}
            />

            <input
              className="bg-extraLightGray px-3 py-2 outline-none placeholder:text-sm"
              placeholder="Email"
              value={formData.email}
              type="email"
              name="email"
              onChange={handleChange}
            />

            <input
              className="bg-extraLightGray px-3 py-2 outline-none placeholder:text-sm"
              value={formData.password}
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />

            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                <p>*{errorMessage}</p>
              </div>
            )}

<div className="flex justify-between">
<button
                disabled={isPending}
                className={`bg-mutedblack text-white w-full py-2 rounded-md ${
                  isPending ? "cursor-progress" : ""
                }`}
              >
                Sign up
              </button>
            </div>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-80 h-px my-4 bg-gray-500 border-0"></hr>
              <span className="absolute px-3 text-lightgray -translate-x-1/2 left-1/2 bg-white z-0">
                or
              </span>
            </div>
            <p>
              Already have an account?
              <Link
                className="ml-2 font-semibold underline text-blue-500"
                to={"/login"}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
