import { IOrder } from "@/app/admin/orders/page";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";

interface PropsType {
    srNo: number;
    order: IOrder
}

const OrderRow = ({ srNo, order }:PropsType) => {
    console.log(order)
    
    return (
        <tr>
            <td>
                <div>
                    {srNo}
                </div>
            </td>
            <td>
                <div>
                    {order.name}
                </div>
            </td>
            <td className="py-2">
                <Image src={order.imgSrc} width={40} height={40} alt="order_image" />
            </td>
            <td>{order.customerName}</td>
            <td>{order.customerEmail}</td>
            <td>{order.shippingAddress}</td>
        </tr>
    )
    
}
export default OrderRow;
