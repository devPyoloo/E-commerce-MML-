export default function Checkout() {
  return (
    <div className="flex flex-col mx-20 pt-32">
      <h1 className="flex-col">
        Checkout <span>1 item</span>
      </h1>
      <section className="flex justify-between items-start flex-wrap">
        <main className="w-1/2">
          <div className="contact">
            <label>Contact</label>
            <input type="text" name="" placeholder="Email *" id="" />
            <input type="text" name="" placeholder="Phone Number *" id="" />
          </div>
          <div className="address">
            <div className="flex">
            <input type="text" name="" placeholder="First Name *" id="" />
            <input type="text" name="" placeholder="Last Name *" id="" />
            </div>
           
            <label>Address</label>
            <input type="text" name="" placeholder="Barangay *" id="" />
            <input type="text" name="" placeholder="City *" id="" />
            
            <div className="flex">
            <input type="text" name="" placeholder="Province *" id="" />
            <input type="text" name="" placeholder="Zip Code *" id="" />
            </div>
          </div>
          <div className="payment">
            <h1>Payment</h1>
            <label>
                <img className="w-10" src="/assets/paypal-icon.png" alt="Paypal" />
                <input type="radio" name="paypal" id="" />
            </label>
            <label>
            <img className="w-10" src="/assets/mastercard-icon.png" alt="Mastercard" />
            <input type="radio" name="mastercard" id="" />
            </label>
            <label>
            <img className="w-10" src="/assets/visa-icon.png" alt="visa" />
            <input type="radio" name="visa" id="" />
            </label>
            <label>
            <img className="w-10" src="/assets/alipay-icon.png" alt="Alipay" />
            <input type="radio" name="alipay" id="" />
            </label>
          </div>
          <div className="card-details">
            <h1>Card Details</h1>
            <input type="text" name="" placeholder="Card Number *" id="" />
            <input type="text" name="" placeholder="Expiration Date *" id="" />
            <input type="text" name="" placeholder="CVC/CVV *" id="" />
            <input type="text" name="" placeholder="Cardholder's Name *" id="" />

            <h1>Billing Address</h1>
            <input type="text" name="" placeholder="Street Address" id="" />
            <div className="flex">
            <input type="text" name="" placeholder="City" id="" />
            <input type="text" name="" placeholder="Zip Code" id="" />
            </div>
            <input type="text" name="" placeholder="Country" id="" />
          </div>
        </main>

        <aside>
          <div>

          </div>

          <figure
            className="flex justify-between items-start border-b border-b-gray-200 py-10"
            key={item.id}
          >
            <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56">
              <img
                className={`2xl:w-28 w-20 object-center drop-shadow-lg"
                    }`}
                src={item.image}
                alt={item.name}
              />
            </div>

            <div className="relative w-1/2 flex flex-col items-start gap-y-10 2xl:text-xl text-lg">
              <div className="flex flex-col gap-y-3">
                <label className="font-semibold truncate w-full">
                  {item.name}
                </label>
                <label className="text-gray-700">{item.category}</label>
                <label className="text-gray-700 flex gap-x-6">
                  Quantity: {item.quantity}
                  <span>
                    <IoIosArrowDown />
                  </span>
                </label>
                <label className="text-xl font-semibold">$ {item.price}</label>
              </div>
            </div>
          </figure>
        </aside>
      </section>
    </div>
  );
}
