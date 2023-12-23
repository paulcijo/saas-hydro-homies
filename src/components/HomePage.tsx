import Image from 'next/image';

const HomePage = () => {
    return (
        <>
            <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold">Hydro Homies</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Settings</button>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-center m-20">
                    <Image src="/glass-of-water.png" alt="Water glass icon" width={256} height={256} />
                </div>

                <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold mr-4">8 Glasses</h2>
                    <div className="w-1/2 bg-blue-400 rounded-full h-4"></div>
                </div>

                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">+ I Drank Water</button>
            </main>
        </>
    );
};

export default HomePage;
