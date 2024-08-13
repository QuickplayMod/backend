import {html} from "hono/html";

export function Hero() {
    return (
        <>
            {html`
                <script>
                    function scrollToDownloads(event) {
                        const downloadsElem = document.querySelector("#downloads");
                        if (!downloadsElem) {
                            return;
                        }

                        event.preventDefault()
                        downloadsElem.scrollIntoView({
                            behavior: "smooth"
                        })
                        downloadsElem.querySelector('a').focus({preventScroll: true})
                    }

                    function initDescriptionAnimation() {
                        const descriptions = [
                            "Experts",
                            "Gamers",
                            "Noobs",
                            "Try-hards",
                            "Professionals",
                            "Achievers",
                            "Champions",
                            "Sweats",
                            "Builders",
                            "Grinders"
                        ]
                        let currentDescriptionIdx = 0;

                        const descriptionLine = document.getElementById("hero-description-line");
                        const descriptionText = descriptionLine.querySelector("span")
                        const description = document.getElementById("hero-description-word")
                        const nextDescription = document.getElementById("hero-description-next-word")


                        function calibrateDescriptionOffset() {
                            descriptionLine.style.textAlign = "center";
                            descriptionText.style.left = "0";
                            const textOffset = descriptionText.offsetLeft - descriptionLine.offsetLeft;
                            descriptionLine.style.textAlign = "";
                            descriptionText.style.left = textOffset + "px";
                        }

                        function finishDescriptionAnimation(value) {
                            description.style.transitionDuration = "0s"
                            nextDescription.style.transitionDuration = "0s"

                            description.style.transform = ""
                            description.style.opacity = ""
                            nextDescription.style.transform = ""
                            nextDescription.style.opacity = ""

                            description.innerText = value
                            nextDescription.innerText = ""

                            setTimeout(() => {
                                description.style.transitionDuration = ""
                                nextDescription.style.transitionDuration = ""
                            }, 500)
                        }

                        function startDescriptionAnimation(nextValue) {
                            nextDescription.innerText = nextValue
                            description.style.transform = "translateY(50px)"
                            description.style.opacity = "0"
                            nextDescription.style.transform = "initial"
                            nextDescription.style.opacity = "1"

                            if (window.innerWidth <= 640) {
                                translateDescriptionX();
                            }

                            setTimeout(() => {
                                finishDescriptionAnimation(nextValue);
                            }, 500)
                        }

                        function translateDescriptionX() {
                            const currentWidth = description.offsetWidth;
                            const nextWidth = nextDescription.offsetWidth;
                            const diff = currentWidth - nextWidth;

                            let currentOffset = parseFloat(descriptionText.style.left);
                            const newOffset = currentOffset + diff / 2;

                            function nextFrame() {
                                currentOffset = parseFloat(descriptionText.style.left);
                                const thisFrameDelta = diff > 0 ? 0.25 : -0.25
                                descriptionText.style.left = (currentOffset + thisFrameDelta) + "px";
                                if (Math.abs(newOffset - currentOffset) > 1) {
                                    requestAnimationFrame(() => {
                                        nextFrame();
                                    })
                                }
                            }

                            requestAnimationFrame(() => {
                                nextFrame()
                            })
                        }

                        addEventListener("resize", () => {
                            setTimeout(() => {
                                calibrateDescriptionOffset();
                            }, 0)
                        })
                        calibrateDescriptionOffset();

                        setInterval(() => {
                            const nextDescriptionIndex = ++currentDescriptionIdx % descriptions.length
                            startDescriptionAnimation(descriptions[nextDescriptionIndex])
                        }, 5000)
                    }

                    let fontsLoaded = false;
                    let domLoaded = false;
                    document.fonts.ready.then(() => {
                        fontsLoaded = true;
                        if (domLoaded) {
                            initDescriptionAnimation()
                        }
                    })
                    document.addEventListener("DOMContentLoaded", () => {
                        domLoaded = true;
                        if (fontsLoaded) {
                            initDescriptionAnimation();
                        }
                    })
                </script>
            `}
            <div style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/static/images/hero-bg/hero-bg.png');
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), image-set(
                  url('/static/images/hero-bg/hero-bg.avif') type('image/avif'),
                  url('/static/images/hero-bg/hero-bg.webp') type('image/webp'),
                  url('/static/images/hero-bg/hero-bg.png') type('image/png')
             )"
                 class="pb-20 min-h-[70vh] w-full bg-no-repeat bg-cover bg-center flex justify-center border-teal-500 border-b-[35px]">
                <div class="container md:p-10 pt-10 text-white">
                    <div class="qp-header-image ml-auto mr-auto w-3/4 max-w-screen-md text-center">
                        <picture>
                            <source media="(max-width: 699px)" srcset="/static/images/logo-nomargin/logo-nomargin-small.avif" type="image/avif" width="613" height="150" />
                            <source media="(min-width: 700px)" srcset="/static/images/logo-nomargin/logo-nomargin-med.avif" type="image/avif" width="1534" height="375" />
                            <source media="(max-width: 699px)" srcset="/static/images/logo-nomargin/logo-nomargin-small.webp" type="image/webp" width="613" height="150" />
                            <source media="(min-width: 700px)" srcset="/static/images/logo-nomargin/logo-nomargin-med.webp" type="image/webp" width="1534" height="375" />
                            <source media="(max-width: 699px)" srcset="/static/images/logo-nomargin/logo-nomargin-small.png" width="613" height="150" />
                            <source media="(min-width: 700px)" srcset="/static/images/logo-nomargin/logo-nomargin-med.png" width="1534" height="375" />
                            <img src="/static/images/logo-nomargin/logo-nomargin-med.png" alt="Quickplay"
                                 onError="this.parentElement.innerHTML = 'Quickplay'" width="1534" height="375" />
                        </picture>
                    </div>
                    <p class="text-2xl py-2" style="font-family: Merriweather; text-align: center" id="hero-description-line">

                       <span class="relative flex flex-col items-center sm:inline" aria-hidden="true">
                            Hypixel Navigation for&nbsp;

                           <span class="inline-block sm:inline">
                                <span id="hero-description-next-word"
                                      class="absolute transition duration-500 inline-block translate-y-[-50px] text-nowrap opacity-0 w-[100vw] left-0 text-center sm:left-[initial] sm:text-left sm:w-[initial]"></span>
                                <span id="hero-description-word" class="relative transition duration-500 inline-block">Experts</span>
                            </span>
                       </span>
                       <span class="sr-only">Hypixel Navigation for Experts</span>
                    </p>

                    <div class="flex justify-center z-10 relative">
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
