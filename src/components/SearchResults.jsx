import UseSearch from "../store/search-store";
import ItemCard from "./ItemCard";

function SearchResuts({data})
{
    const results = data ? data : UseSearch((state) => (state.searchResults));

    const display = results ? results.map((result, index) => (<ItemCard key={index} data={result}></ItemCard>)) : <h1 className="text-4xl font-bold text-green-500">No Results Found</h1>;

    return (
        <div className="flex justify-center flex-wrap">{display}</div>
    );
}

export default SearchResuts;