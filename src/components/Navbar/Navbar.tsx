import React from "react";
import { FaBars } from "react-icons/fa";
import {
	ConnectButton,
	Container,
	EmptyBox,
	Logo,
	LogoH1,
	LogoImg,
	Menu,
	MenuItem,
	MenuLink,
	Nav,
	OpenMenu,
} from "./styled";

const LOGO_IMG = "";

const Navbar = () => {

	return (
		<>
			<Container>
				<Nav>
					{/* Logo */}
					<Logo to="/">
						<LogoImg src={LOGO_IMG} />
						<LogoH1>SOKURI_CODE</LogoH1>
					</Logo>

					{/* Button to open menu */}
					{/* <OpenMenu>
						<FaBars />
					</OpenMenu> */}

					{/* Navbar menu */}
					<Menu>
						<MenuItem>
							<MenuLink to="/hash">Hash</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/block">Block</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/blockchain">Blockchain</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/mining">Mining</MenuLink>
						</MenuItem>
					</Menu>
				</Nav>
			</Container>
			<EmptyBox />
		</>
	);
};

export default Navbar;
