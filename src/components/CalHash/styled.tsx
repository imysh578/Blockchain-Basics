import styled from "styled-components";

export const Container = styled.main`
	${({ theme }) => theme.components.container("column", "center", "center")}
`;

export const Wrap = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")}
	gap:1rem;
	background: ${({ theme }) => theme.color.bg};
	padding: 2rem;
	border-radius: 1rem;
	width: 60rem;
	height: 30rem;
	box-shadow: ${({ theme }) => theme.boxShadow.style1};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.dark};
	font-size: 2rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Content = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "flex-start")}
	width: 100%;
	height: 80%;
	gap: 1rem;
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
`;

export const Name = styled.h2`
  color: ${({ theme }) => theme.color.dark};
  font-size: 1.5rem;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 10rem;
	resize: none;
	font-size: 1.2rem;
`;

export const Result = styled.h3`
	font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.secondary};
`;

export const BtnBox = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-end", "center")}
	width: 100%;
	padding-right: 2rem;
`;

export const Btn = styled.button`
  font-size: 1.2rem;
	text-decoration: none;
	border: none;
	border-radius: 0.75rem;
	padding: 1rem 1.5rem;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	background: ${({ theme }) => theme.color.dark};
	color: ${({ theme }) => theme.color.white};

	&:hover {
		background: ${({ theme }) => theme.color.secondary};
	}
`;