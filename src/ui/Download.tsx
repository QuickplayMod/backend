export function Download() {
    return (
        <div id="downloads">
            <h2 class="text-white text-6xl sm:text-7xl mb-7 text-center">Download</h2>
            <div class="grid grid-cols-2 max-w-[600px] m-auto">
                <button class="p-3 bg-teal-500 rounded-md m-2 text-xl text-white">1.8.9 Forge
                </button>
                <button class="p-3 bg-teal-500 rounded-md m-2 text-xl text-white">1.21 Fabric
                </button>

                <button
                    class="p-3 bg-teal-500 rounded-md m-2 text-xl text-white additionalDownloadOption"
                    style="display: none">
                    1.8.9 Forge (Direct)
                </button>
                <button
                    class="p-3 bg-teal-500 rounded-md m-2 text-xl text-white additionalDownloadOption"
                    style="display: none">
                    1.21 Fabric (Direct)
                </button>
            </div>

            <div class="text-center">
                <button class="text-gray-400 underline mt-5"
                        onclick="document.querySelectorAll('.additionalDownloadOption').forEach(e => e.style.display = 'initial'); this.style.display = 'none';">
                    Show Direct Downloads
                </button>
            </div>
        </div>
    )
}
