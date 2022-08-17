import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import OpenNavbar from "./components/OpenNavbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import HashPage from "./pages/HashPage";
import BlockPage from "./pages/BlockPage";
import AsyncBoundary from "./components/AsyncBoundary/AsyncBoundary";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
	return (
		<>
			<Navbar />
			<MainContainer>
				<AsyncBoundary
					ErrorFallback={(arg) => <Error error={arg.error} />}
					SuspenseFallback={<Loading />}
				>
					<Routes>
						<Route path="/">
							<Route index element={<HomePage />} />
							<Route path="hash" element={<HashPage />} />
							<Route path="block" element={<BlockPage />} />
						</Route>
					</Routes>
				</AsyncBoundary>
			</MainContainer>
			<Footer />
		</>
	);
}

export default App;
