import { IOrder } from "@/app/admin/orders/page";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
    srNo: number;
    order: IOrder
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const OrderRow = ({ srNo, order, setUpdateTable }:PropsType) => {
    const dispatch = useAppDispatch();
    const parsedShippingAddress = JSON.parse(order.shippingAddress)

    const onDelete = () => {
        axios.delete(`/api/delete_order/${order._id}`).then(res => {        
            console.log(order._id);
            console.log(res)
              
            makeToast("Product Deleted Sucessfully");
            setUpdateTable((prevState: any) => !prevState)   
        }).catch((err) => console.log(err)
        ).finally(() => dispatch(setLoading(false)))
    }
    
    return (
        <tr>
            <td>
                {srNo}
            </td>
            <td>
                {order.name}
            </td>
            <td className="py-2 flex justify-center">
                <Image src={order.imgSrc} width={40} height={40} alt="order_image" />
            </td>
            <td>{order.customerName}</td>
            <td>{order.customerEmail}</td>
            <td>{parsedShippingAddress.line1}, {parsedShippingAddress.city}-{parsedShippingAddress.postal_code}, {parsedShippingAddress.country}</td>
            <div className="flex justify-center">
            <RiDeleteBin5Line className="text-[20px] cursor-pointer hover:text-red-600 relative top-[-11px]" onClick={onDelete} />
            </div>
        </tr>
    )
    
}

export default OrderRow;

