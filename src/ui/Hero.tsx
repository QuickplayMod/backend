export function Hero() {
    return (
        <div style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/static/hero.png')"
             class="pb-20 min-h-[90vh] w-full bg-no-repeat bg-cover bg-center flex justify-center">
            <div class="container md:p-10 pt-10 text-white">
                <img src="/static/logo-nomargin.png" alt="Quickplay"
                     class="qp-header-image text-8xl w-3/4 max-w-screen-md ml-auto mr-auto"/>
                <p class="p-2 text-2xl text-center" style="font-family: Merriweather">
                    Hypixel Navigation for Champions
                </p>

                <div class="flex justify-center">
                    <button class="p-5 pl-16 pr-16 bg-teal-500 rounded-md m-2 text-3xl">
                        Download
                    </button>
                </div>
                <div
                    class="pt-8 pb-8 mt-8 backdrop-blur w-full bg-white bg-opacity-10 p-4 sm:border sm:rounded-sm sm:border-white/30">
                    <p class="md:text-center">
                        Quickplay is a Minecraft mod for quickly navigating the Hypixel Minecraft server.
                        Join a new BedWars game, warp to the Spider's Den, or get to work on your Housing plot, all
                        with the click of a button.
                    </p>
                </div>
            </div>
        </div>
    )
}
