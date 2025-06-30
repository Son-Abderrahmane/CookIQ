import UseSearch from "../store/search-store";
import ScrollTitle from "./ScrollTitle";
import { Link } from "react-router-dom";
import WhitePaper from "../assets/textures/white-paper.png";


function ItemCard({data})
{
    const SetSelectedRecipe = UseSearch((state) => (state.SetSelectedRecipe));

    const HandleClick = () =>
    {
        SetSelectedRecipe(data);
    };

    let ingredients = [];
    for(let i = 0; i < 20; i++)
    {
        const ingr = data[`strIngredient${i}`];
        if (ingr)
        {
            ingredients.push(ingr);
        }
    }

    let measurements = [];
    for(let i = 0; i < 20; i++)
    {
        const measure = data[`strMeasure${i}`];
        if (measure)
        {
            measurements.push(measure);
        }
    }

    const rotation = Math.floor(Math.random() * 21);
    const depth = Math.floor(Math.random() * 10);

    return (
        <div className={`w-[clamp(11.25rem,9.529rem+6.764vw,22rem)] h-fit p-2 pr-[clamp(0.5rem,0.38rem+0.472vw,1.25rem)] pl-[clamp(0.5rem,0.38rem+0.472vw,1.25rem)] bg-cover bg-no-repeat shadow-3xl`}
            style={{
                transform: `rotate(${rotation}deg)`,
                zIndex: depth,
                backgroundImage: `url(${WhitePaper})`
            }}>
            <div className="w-full mt-[clamp(0.125rem,-0.143rem+1.054vw,1.8rem)]">
                <ScrollTitle color={"#0e0e0e"} weight={"bold"} classes="text-[clamp(1.1rem,0.876rem+0.881vw,2.5rem)]">{data.strMeal.toUpperCase()}</ScrollTitle>
            </div>
            <h3 className="text-center text-[clamp(0.7rem,0.572rem+0.503vw,1.5rem)] text-graphite leading-0 mb-[clamp(0.75rem,0.63rem+0.472vw,1.5rem)]">CookIQ</h3>
            <h5 className="pl-[clamp(0.5rem,0.42rem+0.315vw,1rem)] pr-[clamp(0.5rem,0.42rem+0.315vw,1rem)] mb-[clamp(0.25rem,0.165rem+0.333vw,0.78rem)] flex justify-between text-[clamp(0.6rem,0.52rem+0.315vw,1.1rem)] font-bold leading-[clamp(0.75rem,0.63rem+0.472vw,1.5rem)] text-white bg-graphite"><span>MEAL</span><span>INFORMATION</span><span>HERE</span></h5>
            <div className="flex justify-center mb-[clamp(0.25rem,0.21rem+0.157vw,0.5rem)] relative">
                <img src={`${data.strMealThumb}/medium`} className="w-[clamp(8.75rem,7.35rem+5.505vw,17.5rem)] h-[clamp(8.75rem,7.35rem+5.505vw,17.5rem)] p-[clamp(0.25rem,0.21rem+0.157vw,0.5rem)] border-[clamp(2px,1.68px+0.079vw,4px)] border-graphite" />
                <h5 className="w-fit pl-[clamp(0.75rem,0.63rem+0.472vw,1.5rem)] pr-[clamp(0.75rem,0.63rem+0.472vw,1.5rem)] rounded-tl-xs rounded-tr-xs text-[clamp(0.6rem,0.44rem+0.629vw,1.6rem)] text-white font-bold bg-graphite absolute top-1/1 left-1/2 -translate-x-1/2 -translate-y-1/1">{data.strCategory.toUpperCase()}</h5>
            </div>
            <h5 className="pl-[clamp(0.5rem,0.42rem+0.315vw,1rem)] pr-[clamp(0.5rem,0.42rem+0.315vw,1rem)] mb-[clamp(0.25rem,0.165rem+0.333vw,0.78rem)] flex justify-between text-[clamp(0.6rem,0.52rem+0.315vw,1.1rem)] font-bold leading-[clamp(0.75rem,0.63rem+0.472vw,1.5rem)] text-white bg-graphite"><span>ENJOY</span><span>YOUR</span><span>MEAL</span></h5>
            <div className="flex justify-center relative mb-3">
                <Link to="/Ingrecipes/recipe" onClick={HandleClick}>
                    <svg viewBox="0 0 183 130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(6.25rem,5.25rem+3.932vw,12.5rem)] h-[clamp(2.5rem,2.1rem+1.573vw,5rem)]">
                        <rect x="10" y="10" width="6" height="110" fill="#0e0e0e"/>
                        <rect x="18" y="10" width="2" height="110" fill="#0e0e0e"/>
                        <rect x="22" y="10" width="4" height="80" fill="#0e0e0e"/>
                        <rect x="30" y="10" width="6" height="80" fill="#0e0e0e"/>
                        <rect x="40" y="10" width="3" height="80" fill="#0e0e0e"/>
                        <rect x="50" y="10" width="2" height="80" fill="#0e0e0e"/>
                        <rect x="55" y="10" width="4" height="80" fill="#0e0e0e"/>
                        <rect x="63" y="10" width="6" height="80" fill="#0e0e0e"/>
                        <rect x="75" y="10" width="2" height="80" fill="#0e0e0e"/>
                        <rect x="80" y="10" width="3" height="80" fill="#0e0e0e"/>
                        <rect x="88" y="10" width="5" height="80" fill="#0e0e0e"/>
                        <rect x="98" y="10" width="3" height="80" fill="#0e0e0e"/>
                        <rect x="108" y="10" width="6" height="80" fill="#0e0e0e"/>
                        <rect x="118" y="10" width="2" height="80" fill="#0e0e0e"/>
                        <rect x="125" y="10" width="4" height="80" fill="#0e0e0e"/>
                        <rect x="135" y="10" width="6" height="80" fill="#0e0e0e"/>
                        <rect x="145" y="10" width="3" height="80" fill="#0e0e0e"/>
                        <rect x="155" y="10" width="2" height="80" fill="#0e0e0e"/>
                        <rect x="160" y="10" width="4" height="110" fill="#0e0e0e"/>
                        <rect x="168" y="10" width="6" height="110" fill="#0e0e0e"/>
                    </svg>
                    <h6 className="w-full text-center text-graphite font-bold text-[clamp(0.5rem,0.42rem+0.315vw,1rem)] leading-0 absolute top-10/12 left-0">SEE FULL RECIPE!!</h6>
                </Link>
            </div>
        </div>
    );
}

export default ItemCard