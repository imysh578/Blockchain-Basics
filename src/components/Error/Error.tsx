import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Container, ErrorTitle, ErrorMsg, Box, BtnBox } from "./styled";

const Error: React.FC<ErrorType.Props> = ({ error, onClick }) => {
	const navigate = useNavigate();
	
	// Handle on click Exit button
	const handleOnClick = () => {
		if (!onClick) window.location.reload();
		else onClick();
	};

	// Normal Error page
	return (
		<Container>
			<ErrorTitle>Opps! Error occurred😱</ErrorTitle>
			<Box>
				<ErrorMsg>{error.name}</ErrorMsg>
				<ErrorMsg>{error.message}</ErrorMsg>
				<BtnBox>
					<Btn onClick={handleOnClick}>Reload</Btn>
				</BtnBox>
			</Box>
		</Container>
	);
};

export default Error;
