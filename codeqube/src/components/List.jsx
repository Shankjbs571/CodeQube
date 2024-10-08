export default function List(){
    return (
        <div class="relative w-full ">
            <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
            <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-32 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div class="m-8 relative space-y-4">
            <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                <div class="flex-1 flex justify-between items-center">
                <div class="h-4 w-48 bg-gray-300 rounded"></div>
                <div class="w-24 h-6 rounded-lg bg-purple-300"></div>
                </div>
            </div>
            <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                <div class="flex-1 flex justify-between items-center">
                <div class="h-4 w-48 bg-gray-300 rounded"></div>
                <div class="w-24 h-6 rounded-lg bg-purple-300"></div>
                </div>
            </div>
            <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                <div class="flex-1 flex justify-between items-center">
                <div class="h-4 w-48 bg-gray-300 rounded"></div>
                <div class="w-24 h-6 rounded-lg bg-purple-300"></div>
                </div>
            </div>
            </div>
        </div>
    )
}