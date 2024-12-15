import { Link, useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useModalStore } from "../../store/useModalStore";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { useAuthStore } from "../../store/useAuthStore";

const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/public/login",
      formData
    );
    console.log("Login response", response);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function LoginForm() {
  const { isToggleModal, toggleModal } = useModalStore();
  const { setAuth } = useAuthStore();
  const [errorMessage, setErroMessage] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    mutate: loginUserMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      setErroMessage(
        error.response?.data?.message || "An error occured, please try again."
      );
    },
    onSuccess: (data) => {
      console.log("Login successfully", data);
      setAuth({
        user: data.username,
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        roles: data.roles,
      });
      toggleModal();
      navigate("/");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUserMutate(formData);
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
                Logging you in...
              </p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white py-16 lg:w-2/6 px-10 rounded-sm grid grid-cols-1 gap-y-5 shadow-lg"
          >
            <MdCancel
              onClick={() => navigate("/")}
              className="text-2xl fill-mutedblack cursor-pointer -mt-10 -ml-5"
            />
            <h1 className="font-bold text-4xl -mb-5">Welcome back</h1>
            <h3 className="text-lightgray font-light">
              Please enter your details
            </h3>

            <input
              className="bg-extraLightGray px-3 py-2 outline-none placeholder:text-sm"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              type="text"
              name="username"
            />

            <input
              className="bg-extraLightGray px-3 py-2 outline-none placeholder:text-sm"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
            />

            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                <p>*{errorMessage}</p>
              </div>
            )}

            <div className="flex justify-between">
              <button className="bg-mutedblack text-white w-full py-2 rounded-md hover:bg-opacity-90">
                Sign in
              </button>
            </div>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-80 h-px my-4 bg-gray-500 border-0"></hr>
              <span className="absolute px-3 text-lightgray -translate-x-1/2 left-1/2 bg-white z-0">
                or
              </span>
            </div>
            <p>
              Don't have an account?
              <Link
                className="ml-2 font-semibold underline text-blue-500"
                to={"/register"}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
