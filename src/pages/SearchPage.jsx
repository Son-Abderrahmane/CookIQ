import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import SearchBar from "../components/SearchBar.jsx"
import SearchResults from "../components/SearchResults.jsx"
import UseSearch from "../store/search-store.js";

function SearchPage()
{
    window.scrollTo(0, 0);
    
    const SetLastPage = UseSearch((state) => (state.SetLastPage));
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        SetLastPage("Ingrecipes/search");

        const fetchSuggestions = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                if (data.meals && data.meals[0]) {
                    // Fetch 3 more recipes to get a total of 4
                    const additionalResponses = await Promise.all(
                        Array(3).fill(null).map(() => fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
                    );
                    const additionalData = await Promise.all(additionalResponses.map(res => res.json()));
                    const newSuggestions = [data.meals[0], ...additionalData.flatMap(data => data.meals || [])].slice(0, 4);
                    setSuggestions(newSuggestions);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setLoading(false);
            }
        };

        fetchSuggestions();

    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center relative p-10 overflow-x-hidden">
            <div className="mt-10 mb-10">
                <SearchBar placeHolder={"Find a Recipe..."}>
                    <Button label="Search"></Button>
                </SearchBar>
            </div>
            <div className="sm:pl-21 pl-5 h-full">
                <SearchResults></SearchResults>
            </div>

            {/* Suggestions Section */}
            <div className="w-full mt-10 px-5">
                <h2 className="text-2xl font-bold text-white mb-6">Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="text-white">Loading suggestions...</div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((recipe) => (
                            <div 
                                key={recipe.idMeal} 
                                className="bg-gray-800 rounded-xl overflow-hidden aspect-video transform hover:scale-105 transition-transform duration-300 relative group"
                            >
                                <img 
                                    src={recipe.strMealThumb} 
                                    alt={recipe.strMeal}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-center font-semibold text-lg">{recipe.strMeal}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white">No suggestions available.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;