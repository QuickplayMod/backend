import {html} from "hono/html";

export function Download() {
    return (
        <>
            {html`
                <script>
                    function showAdditionalDownloads(element) {
                        const allAdditionalOptions = document.querySelectorAll('.additional-dl-option');
                        allAdditionalOptions.forEach(e => e.style.display = 'initial');

                        if(allAdditionalOptions.length > 0) {
                            allAdditionalOptions[0].focus()
                        }

                        element.style.display = 'none';
                    }
                </script>
            `}
            <div id="downloads">
                <h2 class="text-white text-6xl sm:text-7xl mb-7 text-center">Download</h2>
                <div class="grid grid-cols-2 max-w-[600px] m-auto">
                    <a href="https://modrinth.com/project/quick" class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white button-link">1.8.9 Forge
                    </a>
                    <a href="https://modrinth.com/project/quick" class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white button-link">1.21 Fabric
                    </a>

                    <a href="#"
                        class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white additional-dl-option button-link"
                        style="display: none">
                        1.8.9 Forge (Direct)
                    </a>
                    <a href="#"
                        class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white additional-dl-option button-link"
                        style="display: none">
                        1.21 Fabric (Direct)
                    </a>
                    <a href="https://github.com/QuickplayMod/quickplay/releases"
                        class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white additional-dl-option button-link col-span-2"
                        style="display: none">
                        Other Versions
                    </a>
                </div>

                <div class="text-center">
                    <button class="text-gray-400 underline mt-5"
                            onclick="showAdditionalDownloads(this)">
                        Show More Downloads
                    </button>
                </div>
            </div>
        </>
    )
}
