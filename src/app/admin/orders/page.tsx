"use client"

import OrderRow from "@/components/admin-panel/OrderRow";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IOrder {
  _id:string;
  imgSrc: string;
  name: string;
  status: string;
  price: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setLoading(true))

    axios
      .get('/api/get_order')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  }, [updateTable])

  return (
    <div>
      <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
        <h2 className='text-3xl'>
          All Orders
        </h2>
        <div className='mt-4 h-[calc(100vh-180px)] overflow-y-auto'>
            <table className='w-full text-center'>
                <thead>
                  <tr className='text-gray-500 border-t border-[#ececec]'>
                    <th>
                        SR No.
                    </th>
                    <th>
                      Name
                    </th>
                    <th>
                      Images
                    </th>
                    <th>
                      Client Name
                    </th>
                    <th>
                      Email
                    </th>
                    <th>
                      Address
                    </th>
                    <th>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order: IOrder, index) => (
                      <OrderRow 
                        key={order._id}
                        srNo={index+1}
                        order={order}
                        setUpdateTable={setUpdateTable}
                      />
                    ))
                  }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Orders;