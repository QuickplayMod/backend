import {html} from "hono/html";

export function Hero() {
    return (
        <>
            {html`
                <script>
                    function scrollToDownloads(event) {
                        const downloadsElem = document.querySelector("#downloads");
                        if(!downloadsElem) {
                            return;
                        }

                        event.preventDefault()
                        downloadsElem.scrollIntoView({
                            behavior: "smooth"
                        })
                        downloadsElem.querySelector('a').focus({preventScroll: true})
                    }
                </script>
            `}
            <div style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/static/hero.png')"
                 class="pb-20 min-h-[70vh] w-full bg-no-repeat bg-cover bg-center flex justify-center border-teal-500 border-b-[35px]">
                <div class="container md:p-10 pt-10 text-white">
                    <div class="qp-header-image ml-auto mr-auto w-3/4 max-w-screen-md text-center">
                        <img src="/static/logo-nomargin.png" alt="Quickplay"
                             onError="this.parentElement.innerHTML = 'Quickplay'"/>
                    </div>
                    <p class="p-2 text-2xl text-center" style="font-family: Merriweather">
                        Hypixel Navigation for Champions
                    </p>

                    <div class="flex justify-center">
                        <a href="#downloads" onclick="scrollToDownloads(event)" class="p-5 pl-16 pr-16 bg-teal-600 rounded-md m-2 text-3xl button-link">
                            Download
                        </a>
                    </div>

                    <div
                        class="pt-8 pb-8 mt-8 backdrop-blur w-full bg-white bg-opacity-10 p-4 sm:border sm:rounded-sm sm:border-white/30">
                        <p class="md:text-center">
                            Quickplay is a Minecraft mod for quickly navigating the Hypixel Minecraft server.
                            Join a new BedWars game, warp to the Spider's Den, or get to work on your Housing plot, all
                            with the click of a button.
                        </p>
                    </div>


                    <div class="flex justify-center mt-5">
                        <a href="https://discord.gg/AWThmaVJJv" class="p-3 px-5 bg-[#5865F2] rounded-md m-2 text-xl button-link">
                            Discord
                        </a>
                        <a href="https://github.com/quickplaymod" class="p-3 px-5 bg-[#2B3137] rounded-md m-2 text-xl button-link">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
