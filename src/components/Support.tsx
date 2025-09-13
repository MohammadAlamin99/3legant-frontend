import { ISupport } from "@/types/support.type";
import ShippingSvg from "./svg/ShippingSvg";
import MoneySvg from "./svg/MoneySvg";
import SecureSvg from "./svg/SecureSvg";
import PhoneSvg from "./svg/PhoneSvg";

export default function Support() {
  const supportData: ISupport[] = [
    {
      title: "Free Shipping",
      subtitle: "Order above $200",
      icon: <ShippingSvg />,
    },
    {
      title: "Money-back",
      subtitle: "30 days guarantee",
      icon: <MoneySvg />,
    },
    {
      title: "Secure Payments",
      subtitle: "Secured by Stripe",
      icon: <SecureSvg />,
    },
    {
      title: "24/7 Support",
      subtitle: "Phone and Email support",
      icon: <PhoneSvg />,
    },
  ];

  return (
    <>
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 py-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-6">
          {supportData &&
            supportData.map((item, i) => (
              <div className="bg-white px-8 py-12 max-[575px]:px-0 max-[575px]:py-0" key={i}>
                {item?.icon}
                <h2 className="font-poppins font-semibold text-[#141718] text-[20px] max-[575px]:text-[14px] mt-4 mb-2">
                  {item?.title}
                </h2>
                <p className="font-poppins text-[14px] font-normal max-[575px]:text-[14px]">
                  {item?.subtitle}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
