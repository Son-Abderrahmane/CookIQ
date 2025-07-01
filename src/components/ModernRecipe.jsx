import { useEffect, useState, useRef } from "react";
import UseSearch from "../store/search-store";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Assuming framer-motion is installed

function ModernRecipe({ data }) {
    const [ingredients, SetIngredients] = useState([]);
    const [measurements, SetMeasurements] = useState([]);
    const [videoID, SetVideoID] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);

    const favourites = UseSearch((state) => state.favourites);
    const AddFavourite = UseSearch((state) => state.AddFavourite);
    const RemoveFavourite = UseSearch((state) => state.RemoveFavourite);
    const lastPage = UseSearch((state) => state.lastPage);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            let ingredientsList = [];
            let measurementsList = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = data[`strIngredient${i}`];
                const measurement = data[`strMeasure${i}`];

                if (ingredient) {
                    ingredientsList.push(ingredient);
                }
                if (measurement) {
                    measurementsList.push(measurement);
                }
            }

            const url = data.strYoutube;
            const match = url ? url.match(/v=([^&]+)/) : null;
            const videoId = match ? match[1] : null;

            SetIngredients(ingredientsList);
            SetMeasurements(measurementsList);
            SetVideoID(videoId);
            setIsFavourite(favourites.some(fav => fav.idMeal === data.idMeal));
        }
    }, [data, favourites]);

    useEffect(() => {
        setIsFavourite(favourites.some(fav => fav.idMeal === data?.idMeal));
    }, [favourites, data]);

    const ToggleFavourite = () => {
        if (data) {
            if (isFavourite) {
                RemoveFavourite(data.idMeal);
            } else {
                AddFavourite(data);
            }
        }
    };

    if (!data) {
        return <div className="text-white text-center py-20">Loading recipe...</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className="min-h-screen bg-black text-white py-16 px-4 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.div variants={itemVariants} className="mb-8">
                    <Link 
                        to={`/CookIQ/${lastPage || ''}`}
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>
                </motion.div>

                {/* Recipe Title and Favourite Button */}
                <motion.div variants={itemVariants} className="flex items-start justify-between mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white pr-4">{data.strMeal}</h1>
                    <motion.button 
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={ToggleFavourite}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFavourite ? 'text-red-500' : 'text-gray-400'}`} fill={isFavourite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </motion.button>
                </motion.div>

                {/* Recipe Image */}
                <motion.div variants={itemVariants} className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img src={data.strMealThumb} alt={data.strMeal} className="w-full h-auto object-cover" />
                </motion.div>

                {/* Recipe Details (Category, Area) */}
                <motion.div variants={itemVariants} className="mb-8 text-gray-400 text-lg">
                    <p>{data.strCategory} • {data.strArea}</p>
                </motion.div>

                {/* Ingredients and Measurements */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Ingredients</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-1">{ingredient} - {measurements[index]}</li>
                            ))}
                        </ul>
                    </div>
                    {videoID && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Video Tutorial</h2>
                            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                <iframe 
                                    src={`https://www.youtube.com/embed/${videoID}`}
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Instructions */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Instructions</h2>
                    <p className="text-gray-300 leading-relaxed">{data.strInstructions}</p>
                </motion.div>

                {/* Source Link */}
                {data.strSource && (
                    <motion.div variants={itemVariants}>
                        <a 
                            href={data.strSource} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline"
                        >
                            View Source
                        </a>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default ModernRecipe; 