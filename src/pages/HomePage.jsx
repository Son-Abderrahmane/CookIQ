import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const featuresRef = useRef(null);

    const handleLearnMoreClick = () => {
        featuresRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Ingrecipes
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
                        Your smart kitchen companion for effortless cooking
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button 
                            className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                            onClick={() => navigate('/Ingrecipes/search')}
                        >
                            Get Started
                        </button>
                        <button 
                            className="px-8 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
                            onClick={handleLearnMoreClick}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div ref={featuresRef} className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold">
                                Smart Features for Modern Cooking
                            </h2>
                            <div className="space-y-6">
                                <FeatureItem 
                                    title="Smart Recipe Search"
                                    description="Find recipes based on ingredients you have or dietary preferences"
                                />
                                <FeatureItem 
                                    title="Meal Planning"
                                    description="Plan your weekly meals with our intuitive calendar interface"
                                />
                                <FeatureItem 
                                    title="Shopping List"
                                    description="Automatically generate shopping lists from your chosen recipes"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 transform hover:scale-105 transition-transform duration-300">
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">👨‍🍳</div>
                                        <p className="text-xl text-gray-300">
                                            Start your cooking journey today
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>

            {/* Interactive Card Section */}
            <div className="py-20 px-4 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <FeaturesCard />
                </div>
            </div>
        </div>
    );
}

const FeatureItem = ({ title, description }) => (
    <div className="group">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
            {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
        </p>
    </div>
);

const FeaturesCard = () => {
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [recipes, setRecipes] = useState([]);
    const cardRef = useRef(null);
    const navigate = useNavigate();

    const fullText = `FEATURES OVERVIEW
===================
Ingrecipes OFFERS A
UNIQUE COMBINATION OF
FEATURES THAT MAKE
COOKING EASIER AND
MORE ENJOYABLE:

• Smart Recipe Search
• Meal Planning
• Shopping List
• Favorites & Collections
• Cooking Timer
• Nutrition Info`;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Fetch two random recipes
                const [response1, response2] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
                    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                ]);

                const [data1, data2] = await Promise.all([
                    response1.json(),
                    response2.json()
                ]);

                const newRecipes = [];
                if (data1.meals && data1.meals[0]) newRecipes.push(data1.meals[0]);
                if (data2.meals && data2.meals[0]) newRecipes.push(data2.meals[0]);

                setRecipes(newRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        if (isTyping && text.length < fullText.length) {
            const timeout = setTimeout(() => {
                setText(fullText.substring(0, text.length + 1));
            }, 30);
            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
        }
    }, [text, isTyping]);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            setRotation({ x: rotateX, y: rotateY });
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const handleCardClick = (recipeId) => {
        navigate('/Ingrecipes/search');
    };

    return (
        <div className="grid md:grid-cols-2 gap-6 items-start">
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)`,
                    boxShadow: `${rotation.y * 3}px ${rotation.x * 3}px 20px rgba(255, 255, 255, 0.08)`,
                    transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out'
                }}
                className="bg-black text-white font-mono border border-white p-6 md:p-8 text-sm md:text-base leading-relaxed relative transform-gpu rounded-xl"
            >
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white" />

                <pre className="whitespace-pre-wrap">
                    {text.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                            <span className="w-6 text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                            <span>{line}</span>
                        </div>
                    ))}
                    <span 
                        className={`inline-block w-1 h-5 bg-blue-500 align-middle ml-1 ${isTyping ? 'animate-blink' : 'opacity-0'}`}
                    />
                </pre>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {recipes.map((recipe) => (
                    <div 
                        key={recipe.idMeal} 
                        className="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCardClick(recipe.idMeal)}
                    >
                        <div className="aspect-video relative">
                            <img 
                                src={recipe.strMealThumb} 
                                alt={recipe.strMeal}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="text-white font-semibold text-base">{recipe.strMeal}</h3>
                                <p className="text-gray-300 text-xs">
                                    {recipe.strCategory} • {recipe.strArea}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;