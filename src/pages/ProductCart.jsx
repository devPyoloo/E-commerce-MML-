import { useMemo } from "react";
import { useCartStore } from "../store/useCartStore"

export default function ProductCart() {
  const cart = useCartStore((state) => state.cart);

  const subTotal = useMemo(() => {
    return cart.reduce((start, item) => start + (item.price * item.quantity), 0)
  }, [cart])

  return (
    <main>
      {cart.map((item) => (
        <figure className="flex" key={item.id}>
          <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56 overflow-hidden">
                  <img
                    className={`2xl:w-28 w-20 object-center drop-shadow-lg"
                    }`}
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="relative flex flex-col items-start gap-y-1">
                  <label className="font-semibold truncate w-full">
                    {item.name}
                  </label>
                  <label className="text-gray-700">
                    Stock left: {item.stock}
                  </label>
                  <label className="flex justify-between items-center">
                    $ {item.price}
                  </label>
                </div>
        </figure>
      ))}
    </main>
  )
}
