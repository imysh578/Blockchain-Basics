import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import OpenNavbar from "./components/OpenNavbar"
import HomePage from "./pages/HomePage"
import Footer from "./components/Footer"

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleOnClickOpenMenu: VoidFunction = () => {
		setIsMenuOpen((prev) => !prev);
	};

  const changeNav = () => {
		if (window.innerWidth >= 900) {
			setIsMenuOpen(false)
		}
	};

	useEffect(() => {
		window.addEventListener("resize", changeNav);
    return () => {
      window.removeEventListener("resize", changeNav)
    }
	}, []);


  return (
    <>
      <OpenNavbar isOpen={isMenuOpen} toggle={handleOnClickOpenMenu} />
      <Navbar toggle={handleOnClickOpenMenu}/>
			<Routes>
				<Route path="/" >
					<Route index element={<HomePage/>}/>
				</Route>
			</Routes>
      <Footer />
    </>
  )
}

export default App
