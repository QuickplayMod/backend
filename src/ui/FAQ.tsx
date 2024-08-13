export function FAQ() {
    return (
        <div id="faq">
            <h2 class="sr-only">Frequently Asked Questions</h2>
            <h2 class="text-white text-5xl mb-7" aria-hidden="true">FAQ</h2>

            <h3 class="text-white text-xl">How does Quickplay work?</h3>
            <p class="text-white mb-7">Quickplay uses the /play and /warp commands to help you travel around the
                server.
                Your current location is used to determine the set of commands needed to get to your destination.
            </p>

            <h3 class="text-white text-xl">Is Quickplay allowed on Hypixel?</h3>
            <p class="text-white mb-7">Quickplay has been safely used by players on Hypixel for nearly a decade.
                While
                Quickplay employs the use of macros to run commands for you, these macros do not give you any advantage
                over other players. Quickplay complies with the spirit and intentions behind the server rules.
            </p>

            <h3 class="text-white text-xl">Quickplay says I'm not connected to Hypixel, but I am. What gives?</h3>
            <p class="text-white mb-7">Quickplay detects when you are connected to Hypixel using the
                <span class="italic">server address</span>. Make sure you are connected through an official Hypixel
                server address, such as mc.hypixel.net. Connecting through a third-party proxy is not recommended. If
                you must add your own server address to the list of recognized addresses, edit the "customAddressRegex"
                field in the config/quickplay/hypixel.json file within your Minecraft installation folder.
            </p>

            <h3 class="text-white text-xl">Can I add custom buttons/keybinds for my own commands?</h3>
            <p class="text-white mb-7">Quickplay is not designed to be a general-purpose macro mod, so you cannot
                add
                additional commands yourself.
            </p>

            <h3 class="text-white text-xl">Does this mod work on other Minecraft servers?</h3>
            <p class="text-white mb-7">Currently, Quickplay only supports the Hypixel Network. Quickplay is not
                designed
                to be a general-purpose macro mod, so you cannot add commands for other servers yourself. If there is a
                server that you think should be added to Quickplay, reach out
                on <a class="underline text-teal-500" href="https://discord.gg/AWThmaVJJv">Discord</a>. You are also
                welcome
                to fork the <a class="underline text-teal-500" href="https://github.com/quickplaymod">GitHub
                    repositories</a> to
                create your own version of Quickplay.
            </p>
        </div>
    )
}
