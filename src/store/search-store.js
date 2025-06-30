import { create } from "zustand";

const UseSearch = create((set) =>
({
    searchTerm: '',
    selectedRecipe: null,
    searchResults: [],
    favourites: [],
    lastPage: '',

    SetSearchTerm: (searchTerm) => set((state) => ({ searchTerm })),
    SetSelectedRecipe: (selectedRecipe) => set((state) => ({ selectedRecipe})),
    SetSearchResults: (searchResults) => set((state) => ({ searchResults })),
    AddFavourite: (favourite) => set((state) => ({ favourites: [...state.favourites, favourite] })),
    RemoveFavourite: (idToRemove) => set((state) => ({ favourites: state.favourites.filter(favourite => favourite.idMeal !== idToRemove)})),
    SetLastPage: (lastPage) => set((state) => ({ lastPage })),
}));

export default UseSearch;