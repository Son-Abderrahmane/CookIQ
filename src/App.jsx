import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar, NavBarContext } from "./components/NavBar";
import NavLink from "./components/NavLink";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RecipePage from "./pages/RecipePage";
import FavouritesPage from "./pages/FavouritesPage";
import ContactPage from "./pages/ContactPage";
import LogoIcon from "./assets/icons/logo-icon.png";
import SearchIcon from "./assets/icons/search-icon.png";
import FavouriteIcon from "./assets/icons/favourite-icon.png";
import AboutIcon from "./assets/icons/about-icon.png";

function App()
{
  return (
    <>
      <BrowserRouter>
        <NavBarContext.Provider value={true}>
          <NavBar>
            <NavLink to={"/CookIQ"} position={"start"} size={"clamp(1.3rem, 0.1rem + 4.518vw, 2.5rem)"} iconPath={LogoIcon}></NavLink>
            <NavLink to={"/CookIQ/search"} position={"center"} size={"clamp(1.3rem, 0.1rem + 4.518vw, 2.5rem)"} iconPath={SearchIcon}></NavLink>
            <NavLink to={"/CookIQ/favourites"} position={"center"} size={"clamp(1.3rem, 0.1rem + 4.518vw, 2.5rem)"} iconPath={FavouriteIcon}></NavLink>
            <NavLink to={"/CookIQ/contact"} position={"center"} size={"clamp(1.3rem, 0.1rem + 4.518vw, 2.5rem)"} iconPath={AboutIcon}></NavLink>
            <NavLink to={"http://localhost/CookIQ/backend/auth/login.php"} position={"end"} size={"clamp(1.3rem, 0.1rem + 4.518vw, 2.5rem)"} text="LOGIN" external={true}></NavLink>
          </NavBar>
        </NavBarContext.Provider>

        <Routes>
          <Route path="/CookIQ" element={<HomePage></HomePage>}></Route>
          <Route path="/CookIQ/search" element={<SearchPage></SearchPage>}></Route>
          <Route path="/CookIQ/favourites" element={<FavouritesPage></FavouritesPage>}></Route>
          <Route path="/CookIQ/recipe" element={<RecipePage></RecipePage>}></Route>
          <Route path="/CookIQ/contact" element={<ContactPage></ContactPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
