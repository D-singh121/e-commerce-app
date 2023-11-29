// import React from 'react';
import Loader from '../../components/loader/Loader';
import myContext from '../../context/data/MyContext';
import { useContext } from 'react';

const OrderPage = () => {
  const userId = JSON.parse(localStorage.getItem('user')).user.uid
  console.log(userId);
  const context = useContext(myContext);
  const { mode, loading, order, setLoading } = context;
  console.log(order);

  return (
    <>

      {loading && setLoading(true) && <Loader />}
      {order.length > 0 ?
        (<>
          <div className=" h-full container px-5 py-8 md:py-16 mx-auto" style={{ backgroundColor: mode === 'dark' ? '#272728' : '', color: mode === 'dark' ? 'white' : '', }} >
            {
              order.filter((user) => user.userid === userId).map((order, index) => {
                return (
                  <div key={index}
                    className="flex flex-wrap -m-4"
                    // className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
                  >
                    {
                      order.cartItems.map((item, index) => {
                        return (
                          <div key={index} className="p-6 md:w-1/4  drop-shadow-lg ">
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl} alt="product-image" className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          <h2 className=' text-center tex-2xl text-black'>Not Orders</h2>
        )
      }
    </>)
}

export default OrderPage;