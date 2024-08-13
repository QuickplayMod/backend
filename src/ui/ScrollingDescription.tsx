import { html } from "hono/html";

export function ScrollingDescription() {
    return (
        <>
            {html`
                <script>
                    /*
                    The description tag-line text scrolls through a vertical carousel of different descriptive words
                    at the end of the line. This is performed with a hidden element containing new text which moves
                    downward and fades in at the same time as the previous text moving downward and fading out. Once the
                    animation is complete, the new text is instantly swapped into the main textbox and the "new" textbox
                    that fades in is reset back to its original, hidden position.
                    
                    Description text is centered on the screen, but we can't smoothly animate changes by using
                    text-align: center. Instead, we determine an offset to use by using a hidden element which is
                    not animated and just uses text-align: center. We then manually position the visible text using
                    relative positioning and a left offset. When the position deviates from the hidden centered text,
                    we smoothly animate the visible text offset to match the hidden texts offset.
                    */

                    function easeInOutQuad(t) {
                        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                    }

                    /**
                     * Initialize the animation process. We cannot do this until both the DOM and fonts are loaded.
                     */
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
                        const shadowDescriptionLine = document.getElementById("shadow-hero-description-line")
                        const descriptionText = descriptionLine.querySelector("span")
                        const shadowDescriptionText = shadowDescriptionLine.querySelector("span")

                        const description = document.getElementById("hero-description-word")
                        const nextDescription = document.getElementById("hero-description-next-word")
                        const shadowDescription = shadowDescriptionText.querySelector("span")

                        let animationStartedTime = 0;
                        let lastRenderedOffset = 0;
                        
                        descriptionLine.style.textAlign = "";

                        /**
                         * Reset the text offset immediately without going through the animation. Used when the page
                         * is loaded and resized. This function also clears the left offset when the screen is resized
                         * to be smaller than 640px. Smaller than 640px, the description word is on a new line, and we
                         * are using flexbox to center it instead of our custom centering logic.
                         */
                        function calibrateDescriptionOffset() {
                            if(window.innerWidth < 640) {
                                descriptionText.style.left = "";
                                return;
                            }
                            
                            const shadowOffset = shadowDescriptionText.offsetLeft - shadowDescriptionLine.offsetLeft;
                            descriptionText.style.left = shadowOffset + "px";
                        }

                        /**
                         * Once text has scrolled vertically, this function briefly disables the CSS transitions, swaps
                         * the new text into the normal text element, and clears and resets the "new" text element back
                         * to its default position, ready for the next animation.
                         * @param value {string} The new description text to swap into the default spot.
                         */
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

                        /**
                         * Start the next animation by updating the "next" description word as well as the hidden
                         * text-centered element description word, and then update the translation and opacity of the
                         * two vertically moving elements. The vertical elements will be animated by CSS, and the text
                         * will be re-centered based on the hidden text using our JavaScript animation.
                         * @param nextValue {string} The new description word
                         */
                        function startDescriptionAnimation(nextValue) {
                            animationStartedTime = Date.now()
                            lastRenderedOffset = descriptionText.offsetLeft - descriptionLine.offsetLeft;
                            
                            shadowDescription.innerText = nextValue
                            nextDescription.innerText = nextValue
                            description.style.transform = "translateY(50px)"
                            description.style.opacity = "0"
                            nextDescription.style.transform = "initial"
                            nextDescription.style.opacity = "1"

                            setTimeout(() => {
                                finishDescriptionAnimation(nextValue);
                            }, 500)
                        }

                        /**
                         * Animate centering the description line by comparing the offset to a normal, un-animated,
                         * hidden description line's offset. Centering is performed over the course of 500ms using 
                         * {@link easeInOutQuad}. This function doesn't perform any text centering if the window width 
                         * is less than 640px, since below 640px, the description word is centered using flexbox on a 
                         * new line. No manual offsets are needed.
                         */
                        function animateDescriptionXTranslation() {
                            if (window.innerWidth >= 640) {
                                const animationDuration = 500;
                                const timeSinceStart = Date.now() - animationStartedTime;
                                const easeOutput = timeSinceStart > animationDuration ? 1 : easeInOutQuad(timeSinceStart / animationDuration)
                                
                                const shadowOffset = shadowDescriptionText.offsetLeft - shadowDescriptionLine.offsetLeft
                                const diff = lastRenderedOffset - shadowOffset;

                                if (easeOutput < 1) {
                                    descriptionText.style.left = (lastRenderedOffset - diff * easeOutput) + "px";
                                } else {
                                    descriptionText.style.left = shadowOffset + "px"
                                }
                            }

                            requestAnimationFrame(() => {
                                animateDescriptionXTranslation();
                            })
                        }

                        requestAnimationFrame(() => {
                            animateDescriptionXTranslation()
                        })

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

                    /**
                     * Wait for the DOM and fonts to load and then call {@link initDescriptionAnimation}.
                     */
                    function initAnimationAfterDomAndFontsLoaded() {
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
                    }

                    initAnimationAfterDomAndFontsLoaded();
                </script>
            `}
            <p class="text-2xl h-[1px] opacity-0 pointer-events-none" aria-hidden="true"
               style="font-family: Merriweather; text-align: center" id="shadow-hero-description-line">
                <span>Hypixel Navigation for <span class="relative inline-block">Experts</span></span>
            </p>
            <p class="text-2xl py-2" style="font-family: Merriweather; text-align: center"
               id="hero-description-line">
                        <span class="relative flex flex-col items-center sm:inline" aria-hidden="true">
                             Hypixel Navigation for&nbsp;

                            <span class="inline-block sm:inline">
                                 <span id="hero-description-next-word"
                                       class="absolute transition duration-500 inline-block translate-y-[-50px] text-nowrap opacity-0 w-[100vw] left-0 text-center sm:left-[initial] sm:text-left sm:w-[initial]"></span>
                                 <span id="hero-description-word"
                                       class="relative transition duration-500 inline-block">Experts</span>
                             </span>
                        </span>
            </p>
            <span class="sr-only">Hypixel Navigation for Experts</span>
        </>
    )
}
