import Button from "./Button";
import GenerateClamp from "../utils/clamp-gen";
import UseSearch from "../store/search-store";
import { useRef } from "react";

function SearchBar({children, placeHolder, size = 1, searchColor, searchWeight})
{
    const searchTerm = UseSearch((state) => state.searchTerm);
    const SetSearchTerm = UseSearch((state) => state.SetSearchTerm);

    const searchResults = UseSearch((state) => state.searchResults);
    const SetSearchResults = UseSearch((state) => state.SetSearchResults);

    const controller = useRef(null);

    const width = GenerateClamp(10 * size, 25 * size, 320, 1980);

    const HandleChange = async (event) =>
    {
        SetSearchTerm(event.target.value);
    };

    const HandleSearch = (event) =>
    {
        if (event.type === "click" || event.key === "Enter")
        {
            if (controller.current)
            {
                controller.current.abort();
            }

            controller.current = new AbortController();
            const signal = controller.current.signal;

            if (searchTerm.trim() != "")
            {
                FetchResults(signal);
            }
        }
    };

    const FetchResults = async (signal) =>
    {
        try
        {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`, {signal});
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            SetSearchResults(data.meals);
        } 
        catch (error)
        {
            if (error.name != "AbortError")
            {
                console.error("Error fetching the meal data: ", error);
                alert("There was an error fetching the meal data. Please try again later.");
            }
        }
    };
    
    return (
        <>
        <div className="flex justify-center content-center">
            <div className="border-3 rounded-lg border-amber-50">
                <input 
                    type="text"
                    placeholder={placeHolder}
                    value={searchTerm} 
                    onChange={HandleChange}
                    onKeyDown={HandleSearch}
                    className="h-[clamp(2rem,0.9524vw+1.8214rem,3rem)] p-3 outline-0 placeholder-gray-600 text-gray-500 text-xl font-normal placeholder:font-light input"
                    style={{
                        width: width,
                        color: searchColor,
                        fontWeight: searchWeight
                    }}
                    >
                </input>
                {children}
            </div>
        </div>
        </>
    );
}

export default SearchBar;