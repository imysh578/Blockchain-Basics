import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import HashPage from "./pages/HashPage";
import BlockPage from "./pages/BlockPage";
import PeerPage from "./pages/PeerPage";

function App() {
	return (
		<>
			<Navbar />
			<MainContainer>
				<Routes>
					<Route path="/">
						<Route index element={<HomePage />} />
						<Route path="hash" element={<HashPage />} />
						<Route path="block" element={<BlockPage />} />
						<Route path="peer" element={<PeerPage />} />
					</Route>
				</Routes>
			</MainContainer>
			<Footer />
		</>
	);
}

export default App;
