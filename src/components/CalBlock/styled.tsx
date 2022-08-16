import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export const Container = styled.main`
	${({ theme }) => theme.components.container("column", "center", "center")}
	
`;

export const Wrap = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")}
	gap:1rem;
	background: ${({ theme }) => theme.color.bg};
	padding: 2rem;
	border-radius: 1rem;
	width: 40rem;
	box-shadow: ${({ theme }) => theme.boxShadow.style1};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.dark};
	font-size: 2rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-bottom: 0.25rem double ${({ theme }) => theme.color.black};
  margin-bottom: 1rem;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.dark};
  font-size: 1.5rem;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	width: 100%;
	margin-bottom: 1rem;
	border-bottom: 2px solid ${({ theme }) => theme.color.white};
`;

export const Content = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-start", "flex-start")}
	width: 100%;
	gap: 1rem;
`;

export const Section = styled.section`
  ${({ theme }) => theme.mixins.flexBox("column", "flex-start", "flex-start")}
  padding: 1rem;
  gap: 0.5rem;
  width: 100%;
	height: 32rem;
  max-height: 32rem;
  border: 3px solid ${({theme}) => theme.color.white};
  border-radius: 1rem;
	overflow: auto;
`;

export const Column = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "flex-start", "flex-start")}
  gap: 0.5rem;
  width: 100%;
  height: 100%;
`;

export const Row = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "space-between", "center")}
	width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Name = styled.h3`
  color: ${({ theme }) => theme.color.dark};
  font-size: 1.2rem;
	font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Input = styled.input`
  width: 100%;
  color: ${({ theme, readOnly }) => readOnly ? theme.color.readonly : theme.color.dark};
  font-size: 1.2rem;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  border: 1px solid ${({ theme, readOnly }) => readOnly ? "none" : theme.color.dark};
  padding: 0.5rem;
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 3rem;
	padding: .5rem;
	line-height: 2rem;
	resize: none;
	font-size: 1.2rem;
	overflow-x: auto;
`;

export const BtnBox = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-end", "center")}
	width: 100%;
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


export const AddIcon = styled(AiOutlinePlusCircle)`
	font-size: 2rem;
	color: ${({ theme }) => theme.color.quaternary};
	text-align: end;

	&:hover {
		cursor: pointer;
    color: ${({ theme }) => theme.color.primary};
	}
`;

export const RemoveIcon = styled(AiOutlineMinusCircle)`
	font-size: 2rem;
	color: ${({ theme }) => theme.color.dark};
	
	&:hover {
		cursor: pointer;
    color: ${({ theme }) => theme.color.primary};
	}
`;