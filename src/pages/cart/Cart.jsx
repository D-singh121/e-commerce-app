import { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/MyContext';
import Modal from '../../components/model/Model';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from "../../firebase/FirebaseConfig"


function Cart() {
  const context = useContext(myContext)
  const { mode } = context;

  //***** cartItems ko store se get karenge then uski values ko cartpage me use karenge */
  const cartItems = useSelector((state) => state.cart)//****** cartItems array of products object dega  */
  // console.log(cartItems);
  // */

  //********** Deleting items from cart ************ */
  const dispatch = useDispatch()
  const deleteCart = (item) => { //***** onclick pe deleteCart call hoga jo item paramete accept karke cartReducer se deleteFromcart action perform karwayega  */
    dispatch(deleteFromCart(item))
  }
  //Delete hone ke baad localstorage me bhi update kar denge  */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])


  //***** handle subtotal and total amount field */
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price)
    }, [cartItems]);

    setSubTotal(temp);
    // console.log(temp);
  })

  const Shipping = parseInt(99)

  const GrandTotal = Shipping + subTotal;


  //**************    Payment Integration on cart checkout page     **************** */

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")


  const buyNow = async () => {

    // let set validation for empty checkout details .
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are mandatory ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }


    //ek object bana rahe hai aur isko fireStore me store karenge  */
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo);


    // from razorpay 
    var options = {
      key: "rzp_test_B4h5gGIDPVCUhK",
      key_secret: "yMjoxkI5r5HWlqITmvT73KeY",
      amount: parseInt(GrandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "D-ecommerce",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        // toast.success('Payment Successful')
        const paymentId = response.razorpay_payment_id //***** response me hume payment id milta hai  */

        //***** ek orderInfo ka object bana rahe hai jisme order relalted information hogi fir use firestore me save kar denge   */
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId // from razorpay
        }
        // console.log(orderInfo);

        try {
          const orderRef = collection(fireDB, 'orders'); // is " orders" collection me humare purchased order list hogi .
          addDoc(orderRef, orderInfo) //*** orederInfo ko db me save kaar rahe hai   */
          toast.success("order saved to firestore")
        } catch (error) {
          console.log(error);
          toast.error("mismatch order ")
        }
        toast.success('Payment Successful')
      },

      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
    deleteCart(cartItems.product)


  }



  return (
    < >
      <div className="h-screen bg-gray-100 pt-5 mb-[60%] " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 mt-2 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">

          <div className="rounded-lg md:w-2/3">
            {cartItems.map((product, index) => (
              <div key={index}>
                <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <img src={product.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{product.title}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{product.description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{product.price}</p>
                    </div>
                    <div onClick={() => deleteCart(product)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3  " style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>SubTotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{Shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Grand Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>{GrandTotal}</p>
              </div>
            </div>


            <Modal //**** passing props to Model component */
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setAddress={setAddress}
              setName={setName}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart