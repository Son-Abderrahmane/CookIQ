import { useEffect } from "react";
import SearchResuts from "../components/SearchResults";
import UseSearch from "../store/search-store";

function FavouritesPage() {
    window.scrollTo(0, 0);
    const favourites = UseSearch((state) => state.favourites);
    const SetLastPage = UseSearch((state) => state.SetLastPage);

    useEffect(() => {
        SetLastPage("Ingrecipes/favourites");
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 -z-10" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Favourites
            </h1>
            {favourites.length > 0 ? (
                <div className="w-full max-w-5xl mt-8">
                    <SearchResuts data={favourites} />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-16">
                    <div className="mb-6 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-2">You have no favourites.</h2>
                    <p className="text-gray-400 text-lg">Start adding recipes to your favourites to see them here!</p>
                </div>
            )}
        </div>
    );
}

export default FavouritesPage;