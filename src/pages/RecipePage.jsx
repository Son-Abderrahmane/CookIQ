import Recipe from "../components/Recipe";
import UseSearch from "../store/search-store";

function RecipePage()
{
    window.scrollTo(0, 0);

    const selectedRecipe = UseSearch((state) => (state.selectedRecipe));

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 -z-10" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Recipe Details
            </h1>
            <div className="w-full max-w-5xl mt-8">
                <Recipe data={selectedRecipe} />
            </div>
        </div>
    );
}

export default RecipePage