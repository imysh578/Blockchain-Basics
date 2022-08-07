import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Container, ErrorCode, ErrorMsg } from "./styled";

const Error: React.FC<ErrorType.Props> = ({ error, onClick }) => {
	const navigate = useNavigate();
	
	// Handle on click Exit button
	const handleOnClick = () => {
		if (!onClick) navigate("/");
		else onClick();
	};

	// Axios error page
	if (axios.isAxiosError(error)) return (
		<Container>
			<ErrorCode>{error.response?.data.code}</ErrorCode>
			<ErrorMsg>{error.response?.data.message}</ErrorMsg>
			<Btn onClick={handleOnClick}>Exit</Btn>
		</Container>
	)

	// Normal Error page
	return (
		<Container>
			<ErrorMsg>{error.name}</ErrorMsg>
			<ErrorMsg>{error.message}</ErrorMsg>
			<Btn onClick={handleOnClick}>Exit</Btn>
		</Container>
	);
};

export default Error;
