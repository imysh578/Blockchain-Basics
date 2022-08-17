import React, { FC } from "react";
import {
	CloseIcon,
	Icon,
	OpenNavbarContainer,
	OpenNavbarLink,
	OpenNavbarMenu,
	OpenNavbarRoute,
	OpenNavbarWrapper,
	SideBtnWrap,
} from "./styled";

const OpenNavbar: FC<{
	isOpen: boolean;
	toggle: VoidFunction;
	menus: string[];
}> = ({ isOpen, toggle }) => {
	return (
		<OpenNavbarContainer isOpen={isOpen}>
			<Icon onClick={toggle}>
				<CloseIcon />
			</Icon>
			<OpenNavbarWrapper>
				<OpenNavbarMenu>
					<OpenNavbarLink to="section1" onClick={toggle}>
						Section1
					</OpenNavbarLink>
					<OpenNavbarLink to="section2" onClick={toggle}>
						Section2
					</OpenNavbarLink>
				</OpenNavbarMenu>
				<SideBtnWrap>
					<OpenNavbarRoute to="/signin">Sign In</OpenNavbarRoute>
				</SideBtnWrap>
			</OpenNavbarWrapper>
		</OpenNavbarContainer>
	);
};

export default OpenNavbar;
