const Hero = () => {
    return (
        <div className="bg-[#ec9454] mt-4">
            <div className="container grid md:grid-cols-2 py-8">
                <div className="flex items-center">
                    <div className="max-w-[450px] space-y-4 ml-8">
                        <p className="text-topHeadingSecondary">
                            Starting at <span className="font-bold">$99.00</span>
                        </p>

                        <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
                            The best yoga and meditation collection 2024
                        </h1>

                        <h3 className="text-2xl font-['Oregano', cursive]">
                            Exclusive offer <span className="text-red-600">-10%</span> off this week
                        </h3>

                        <a className="inline-block bg-white rounded-md px-6 py-3 hover:bg-[#360c04] hover:text-white" href="#Products">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div>
                    <img className="ml-auto" src="/Hero.png" alt="hero" />
                </div>
            </div>
        </div>
    )
}
export default Hero;