
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
export default function ShopProduct() {
    return (
        <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
            <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
                <div className="">
                    <Filter />
                </div>
                <div className="w-full">
                 <ShopProductCard/>   
                </div>
            </div>
        </div>
    );
}

