// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// export default function HeroSlider() {
//     const banners = [
//         {
//             id: 1,
//             image: "https://picsum.photos/id/1018/1200/500",
//             title: "Big Sale",
//             subtitle: "Up to 50% Off",
//         },
//         {
//             id: 2,
//             image: "https://picsum.photos/id/1015/1200/500",
//             title: "New Arrivals",
//             subtitle: "Latest Products",
//         },
//         {
//             id: 3,
//             image: "https://picsum.photos/id/1019/1200/500",
//             title: "Best Deals",
//             subtitle: "Shop Now",
//         },
//     ];

//     return (
//         <div className="w-full " >
//             <Swiper
//                 modules={[Navigation, Pagination, Autoplay]}
//                 navigation
//                 pagination={{ clickable: true }}
//                 autoplay={{ delay: 3000 }}
//                 loop={true}
//                 className="h-[400px] md:h-[500px] lg:h-[570px]"
//             >
//                 {banners.map((banner) => (
//                     <SwiperSlide key={banner.id}>
//                         <div className="relative mt-20 w-full h-full">

//                             {/* Background Image */}
//                             <img
//                                 src={banner.image}
//                                 alt=""
//                                 className="w-full h-full object-cover"
//                             />

//                             {/* Overlay */}
//                             <div className="absolute inset-0 bg-black/40"></div>

//                             {/* Text Content */}
//                             <div className="absolute top-2/3 left-10 transform -translate-y-1/2 text-white">
//                                 <h1 className="text-3xl md:text-5xl font-bold">
//                                     {banner.title}
//                                 </h1>
//                                 <p className="mt-2 text-lg">{banner.subtitle}</p>

//                                 <button className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded hover:bg-yellow-400 transition">
//                                     <a href="#products">Shop Now</a>
//                                 </button>
//                             </div>

//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HeroSlider() {
    const banners = [
        {
            id: 1,
            image: "https://picsum.photos/id/1018/1200/500",
            title: "Big Sale",
            subtitle: "Up to 50% Off",
        },
        {
            id: 2,
            image: "https://picsum.photos/id/1015/1200/500",
            title: "New Arrivals",
            subtitle: "Latest Products",
        },
        {
            id: 3,
            image: "https://picsum.photos/id/1019/1200/500",
            title: "Best Deals",
            subtitle: "Shop Now",
        },
    ];

    return (
        <div className="w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                // navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[570px]"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative mt-20 w-full h-full">

                            {/* Background Image */}
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:left-10 text-center md:text-left px-4">
                                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                                    {banner.title}
                                </h1>
                                <p className="mt-2 text-sm sm:text-lg md:text-xl text-white">
                                    {banner.subtitle}
                                </p>

                                <button className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded hover:bg-yellow-400 transition">
                                    <a href="#products">Shop Now</a>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}