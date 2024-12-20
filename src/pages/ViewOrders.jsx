import { Link } from "react-router-dom";
import api from "../utils/apiInterceptors";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button";

const fetchCheckout = async () => {
  try {
    const { data } = await api.get(
      "http://localhost:8080/api/v1/user/view-checkout"
    );
    console.log("Response data", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw Error;
  }
};

export default function Vieworders() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchCheckout,
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching orders. Please try again later.</p>;
  }

  if (!orders?.cartItems || orders.cartItems.length === 0) {
    return <p>No ordersed items.</p>;
  }

  console.log(orders.city);

  return (
    <>
      <h1>View orders</h1>
      <p>
        <strong>City:</strong> {orders.city}
      </p>
      {orders.cartItems.length > 0 ? (
        <div className="mb-40 pt-20 lg:pt-32 mx-10 lg:mx-20">
          <section className="flex flex-col justify-between lg:flex-row lg:items-start">
            <div className="flex flex-col lg:w-1/2">
              <h1 className="text-3xl font-semibold">{orders.cartItems.length >= 1 ? 'Item' : 'Items'}</h1>
              {orders.cartItems.map((item) => (
                <figure
                  className="flex justify-between items-center lg:items-start borders-b borders-b-gray-200 py-10"
                  key={item.category}
                >
                  <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 lg:w-56 lg:h-56 w-32 h-32">
                    <img
                      className={`2xl:w-28 lg:w-20 w-12 object-center drop-shadow-lg"
                       }`}
                      src={item.imageFile}
                      alt={item.name}
                    />
                  </div>

                  <div className="relative w-1/2 flex flex-col items-start gap-y-5 lg:gap-y-10 text-sm 2xl:text-xl lg:text-lg">
                    <div className="flex flex-col gap-y-2">
                      <label className="font-semibold lg:truncate lg:w-full">
                        {item.name}
                      </label>
                      <label className="text-gray-700">{item.category}</label>
                      <label className="text-gray-700 flex gap-x-6 py-1 lg:py-3">
                        Quantity: {item.quantity}
                      </label>
                      <label className="text-base lg:text-xl font-semibold">
                        $ {item.price}
                      </label>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <aside className="mt-10 lg:w-1/2 lg:mt-0">
              <div className="flex flex-col gap-4 text-base lg:text-xl">
                <h1 className="text-2xl font-medium">Order Summary</h1>

                <p className="grid grid-cols-2">
                  Total: <span>${orders.amount.toFixed(2)}</span>
                </p>

                <p className="grid grid-cols-2">
                  Delivery address:
                  <span>
                    {orders.barangay}, {orders.city}, {orders.province}gdfgzfdxzc
                  </span>
                </p>

                <p className="grid grid-cols-2">
                  Order Status: <span className="font-semibold">{orders.orderStatus === null ? 'Not yet processed' : orders.orderStatus}</span>
                </p>

                <p className="grid grid-cols-2">
                  Order On: <span>{orders.createdAt}</span>
                </p>
              </div>

              <div className="w-full flex flex-col gap-5 mt-20 mb-10">
                <Link to={"/checkout"}>
                  <Button buttonType={"primary"}>Order history</Button>
                </Link>

                <Link to={"/products/All"}>
                  <Button buttonType={"secondary"}>Continue shopping</Button>
                </Link>

                <button className=""></button>
              </div>
            </aside>
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96 w-full">
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-center mb-8">
              NO ORDERED ITEMS
            </p>
            <div className="flex justify-between gap-7">
              <Link to={"/products/All"}>
                <button className="bg-lightblack rounded-sm text-white text-xl py-2 px-4">
                  Discover Products
                </button>
              </Link>
              <Link to={"/"}>
                <button className="rounded-sm text-lightgray borders borders-lightgray text-xl py-2 px-4">
                  Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
