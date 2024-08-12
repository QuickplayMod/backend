export function Download() {
    return (
        <div id="downloads">
            <h2 class="text-white text-6xl sm:text-7xl mb-7 text-center">Download</h2>
            <div class="grid grid-cols-2 max-w-[600px] m-auto">
                <a class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white button-link">1.8.9 Forge
                </a>
                <a class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white button-link">1.21 Fabric
                </a>

                <a
                    class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white additional-dl-option button-link"
                    style="display: none">
                    1.8.9 Forge (Direct)
                </a>
                <a
                    class="p-3 bg-teal-700 rounded-md m-2 text-xl text-white additional-dl-option button-link"
                    style="display: none">
                    1.21 Fabric (Direct)
                </a>
            </div>

            <div class="text-center">
                <button class="text-gray-400 underline mt-5"
                        onclick="showAdditionalDownloads(this)">
                    Show Direct Downloads
                </button>
            </div>
        </div>
    )
}
