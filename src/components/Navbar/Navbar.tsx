import React from "react";
import { FaBars } from "react-icons/fa";
import {
	Container,
	EmptyBox,
	Logo,
	LogoH1,
	LogoImg,
	LogoImgBox,
	Menu,
	MenuItem,
	MenuLink,
	Nav,
	OpenMenu,
} from "./styled";

const LOGO_IMG = "/assets/images/logo.png";

const Navbar: React.FC<{ toggle: VoidFunction }> = ({toggle}) => {
	
	return (
		<>
			<Container>
				<Nav>
					{/* Logo */}
					<Logo to="/">
						<LogoImgBox>
							<LogoImg src={LOGO_IMG} />
						</LogoImgBox>
						<LogoH1>SOKURI_CODE</LogoH1>
					</Logo>

					{/* Button to open menu */}
					<OpenMenu>
						<FaBars onClick={toggle} />
					</OpenMenu>

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
