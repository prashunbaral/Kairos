import FeatureCard from "./FeatureCard";
import { TbTruckDelivery, TbDiscount } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";

const data = [
    {
        icon: <TbTruckDelivery className="text-4xl" />,
        title: "Free Delivery",
        desc: "Orders from all items",
    },
    {
        icon: <RiRefund2Fill className="text-4xl" />,
        title: "Everyday Luxury",
        desc: "Quality Doesn't Have to Cost a Fortune" 
    },
    {
        icon: <TbDiscount className="text-4xl" />,
        title: "Memeber Discount",
        desc: "On Order Over $99.00",
    },
    {
        icon: <MdSupportAgent className="text-4xl" />,
        title: "Support 24/7",
        desc: "Contact us anytime",
    },
];

const Feature = () => {
    return (
        <div className="container grid gap-1 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {data.map((item) => (
                <FeatureCard 
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                />
            ))}
        </div>
    )
}

export default Feature;