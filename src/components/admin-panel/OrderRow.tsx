import { IOrder } from "@/app/admin/orders/page";
import Image from "next/image";

interface PropsType {
    srNo: number;
    order: IOrder
}

const OrderRow = ({ srNo, order }:PropsType) => {
    console.log(order)
    const parsedShippingAddress = JSON.parse(order.shippingAddress)
    
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
        </tr>
    )
    
}
export default OrderRow;
