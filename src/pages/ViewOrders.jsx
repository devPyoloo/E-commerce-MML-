import { Link } from "react-router-dom";
import api from "../utils/apiInterceptors";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button";
import { format } from "rsuite/esm/internals/utils/date";

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

  if (!orders || orders.length === 0) {
    return <p>No ordered items.</p>;
  }


  return (
    <section className="lg:pt-32">
      {orders.map((order, index) => (
        <div key={order.stripePaymentIntentId} className="lg:mb-40 pt-0 border-b-2 border-b-lightgray/15 mx-10 lg:mx-20">
          <main className="flex flex-col justify-between lg:flex-row lg:items-center">
            <div className="flex flex-col lg:w-full">
              <h1 className="text-3xl font-semibold">Item {index + 1}</h1>
              {order.cartItems.map((item, index) => (
                <figure
                  className="flex justify-between items-center lg:items-start borders-b borders-b-gray-200 py-2 lg:py-10 gap-x-10"
                  key={index}
                >
                  <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 lg:w-36 lg:h-36 w-32 h-32">
                    <img
                      className={`2xl:w-28 lg:w-12 w-12 object-center drop-shadow-lg"
                       }`}
                      src={item.imageFile}
                      alt={item.name}
                    />
                  </div>

                  <div className="w-full flex flex-col items-start gap-y-5 lg:gap-y-10 text-sm 2xl:text-xl lg:text-lg">
                    <div className="flex flex-col lg:gap-y-2">
                      <label className="font-semibold lg:truncate lg:w-full">
                        {item.name}
                      </label>
                      <label className="text-gray-700">{item.category}</label>
                      <label className="text-gray-700 flex gap-x-6">
                        Quantity: {item.quantity}
                      </label>
                      <label className="text-base lg:text-xl font-semibold">
                        ${item.price.toFixed(2)}
                      </label>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <aside className="bg-extraLightGray border mb-10 border-lightgray/15 p-4 rounded-lg mt-10 lg:w-full lg:mt-0">
              <div className="flex flex-col gap-4 text-base lg:text-xl">
                <h1 className="text-2xl font-medium">Order Summary</h1>

                <p className="grid grid-cols-2">
                  Total: <span>${order.amount.toFixed(2)}</span>
                </p>

                <p className="grid grid-cols-2">
                  Delivery address:
                  <span>
                    {order.barangay}, {order.city}, {order.province}
                  </span>
                </p>

                <p className="grid grid-cols-2">
                  Order Status: <span className="font-semibold">{order.orderStatus === null ? 'Not yet processed' : order.orderStatus}</span>
                </p>

                <p className="grid grid-cols-2">
                  Order On: <span>{format(new Date(order.createdAt), 'MMMM dd, yyyy, hh:mm a')}</span>
                </p>
              </div>

            </aside>
          </main>
        </div>
      // ) : (
      //   <div className="flex justify-center items-center h-96 w-full">
      //     <div className="flex flex-col">
      //       <p className="text-4xl font-bold text-center mb-8">
      //         NO ORDERED ITEMS
      //       </p>
      //       <div className="flex justify-between gap-7">
      //         <Link to={"/products/All"}>
      //           <button className="bg-lightblack rounded-sm text-white text-xl py-2 px-4">
      //             Discover Products
      //           </button>
      //         </Link>
      //         <Link to={"/"}>
      //           <button className="rounded-sm text-lightgray borders borders-lightgray text-xl py-2 px-4">
      //             Home Page
      //           </button>
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      ))}
      <div className="w-full flex flex-col gap-5 mt-20 mb-10 px-16">
                <Link to={"/checkout"}>
                  <Button buttonType={"primary"}>Order history</Button>
                </Link>

                <Link to={"/products/All"}>
                  <Button buttonType={"secondary"}>Continue shopping</Button>
                </Link>

                <button className=""></button>
              </div>
    </section>
  );
}
