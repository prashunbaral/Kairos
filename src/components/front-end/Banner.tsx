const Banner = () => {
    return (
        <div className="container mt-32">
            <div className="flex lg:flex-row gap-4 pr-[15px]">
                <div className="h-[300px] w-[900px] md:h-[260px] bg-[url(/Banner3.png)] bg-cover bg-center rounded-xl p-8 md:p-16">
                    <p className="text-topHeadingSecondary text-xl font-medium text-white">
                        Sale 20% off all products
                    </p>
                    <h2 className="text-topHeadingPrimary font-bold text-xl sm:text-3xl max-w-[240px] text-white">
                        Nike Yoga Set 2024
                    </h2>
                    <a
                        className="inline-block mt-6 text-blue-800 font-bold hover:text-white text-topHeadingSecondary"
                        href="#Products"
                    >
                        Shop Now
                    </a>
                </div>
                <div className="h-[258px] w-[580px] bg-[url(/banner2.png)] bg-right rounded-xl hidden lg:block">

                </div>
            </div>
        </div>
    )
}

export default Banner;