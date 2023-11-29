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
          <div className=" h-full pt-10" style={{ backgroundColor: mode === 'dark' ? '#272728' : '', color: mode === 'dark' ? 'white' : '', }} >
            {
              order.filter((user) => user.userid === userId).map((order, index) => {
                return (
                  <div key={index} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {
                      order.cartItems.map((item, index) => {
                        return (
                          <div key={index} className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl} alt="product-image" className="w-100% rounded-lg sm:w-40" />
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