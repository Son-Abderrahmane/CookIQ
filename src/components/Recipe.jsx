import { useEffect, useState } from "react";
import UseSearch from "../store/search-store";
import ScrollTitle from "./ScrollTitle";
import { Link } from "react-router-dom";
import CloseIcon from "../assets/icons/close-icon.png";

function Recipe({ data }) {
    const [ingredients, SetIngredients] = useState([]);
    const [measurements, SetMeasurements] = useState([]);
    const [videoID, SetVideoID] = useState("");

    const favourites = UseSearch((state) => state.favourites);
    const AddFavourite = UseSearch((state) => state.AddFavourite);
    const RemoveFavourite = UseSearch((state) => state.RemoveFavourite);
    const lastPage = UseSearch((state) => state.lastPage);

    const isFavourite = favourites.some((fav) => fav.idMeal === data.idMeal);

    const ToggleFavourite = () => {
        if (isFavourite) {
            RemoveFavourite(data.idMeal);
        } else {
            AddFavourite(data);
        }
    };

    useEffect(() => {
        let ingredientsList = [];
        let measurementsList = [];

        for (let i = 0; i < 20; i++) {
            const ingredient = data[`strIngredient${i}`];
            if (ingredient) {
                ingredientsList.push(ingredient);
            }
        }

        for (let i = 0; i < 20; i++) {
            const measurement = data[`strMeasure${i}`];
            if (measurement) {
                measurementsList.push(measurement);
            }
        }

        const url = data.strYoutube;
        const match = url.match(/v=([^&]+)/);
        const videoId = match ? match[1] : null;

        SetIngredients(ingredientsList);
        SetMeasurements(measurementsList);
        SetVideoID(videoId);
    }, []);

    let digits = Math.floor(Math.random() * 10000).toString();
    if (digits.length < 4) {
        const zero = "0";
        digits = zero.repeat(4 - digits.length) + digits;
    }

    let date = new Date();
    let year = date.getFullYear();
    let index = date.getMonth();
    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
    ];
    let day = date.getDate().toString();
    if (day.length < 2) {
        day = "0" + day;
    }
    switch (day[day.length - 1]) {
        case "1":
            day += "ST";
            break;
        case "2":
            day += "ND";
            break;
        case "3":
            day += "RD";
            break;
        default:
            day += "TH";
    }

    return (
        <div className="flex flex-col md:flex-row gap-12 bg-gray-900/80 rounded-2xl shadow-2xl p-8 md:p-12 w-full">
            {/* Left: Recipe Info */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between mb-4">
                    <ScrollTitle color="#fff" weight="bold" scrollSpeed={5} classes="text-3xl md:text-5xl font-bold tracking-tight">
                        {data ? data.strMeal.toUpperCase() : ""}
                    </ScrollTitle>
                    <Link to={`../${lastPage}`} className="ml-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                        <img src={CloseIcon} alt="Close" className="w-8 h-8" />
                        </Link>
                        </div>
                <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-2">
                    <span>ORDER #{digits}</span>
                    <span>DATE: {months[index]} / {day} / {year}</span>
                    <span>CASHIER: CookIQ</span>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-white">Ingredients</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {ingredients.map((ingredient, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="text-gray-300 font-mono">{ingredient}</span>
                                <span className="text-gray-500">{measurements[idx]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-white">Instructions</h2>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-line">{data.strInstructions}</p>
                                    </div>
                <button
                    onClick={ToggleFavourite}
                    className={`mt-2 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg border-2 ${isFavourite ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700' : 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-blue-900 hover:text-white'}`}
                >
                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>
                            </div>
            {/* Right: Image & Video */}
            <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
                    <img
                        src={data ? data.strMealThumb : ''}
                        alt={data ? data.strMeal : ''}
                        className="w-full h-full object-cover"
                    />
                            </div>
                {videoID && (
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoID}?autoplay=0&controls=1&rel=0`}
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Recipe;