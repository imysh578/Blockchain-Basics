import styled from 'styled-components';
import { AiOutlineMinusCircle, AiOutlineArrowRight } from "react-icons/ai";

export const Container = styled.div`
  ${({ theme }) => theme.components.container("column", "center", "center")}
  margin-top: 1rem;

	${({theme}) => theme.animation.fadeIn()}
`;

export const Wrap = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "space-between", "center")}
  padding: 1rem;
	width: 60rem;
  min-height: 2rem;
	border: 2px ${({ theme }) => theme.color.dark} solid;
	border-radius: 1rem;
`;

export const Text = styled.span`
  font-size: 1.2rem;
	color: ${({ theme }) => theme.color.dark};
  overflow: hidden;
	text-overflow: ellipsis;
	white-space: pre-line;
	
	width: 35rem;
	&:first-child {
		width: 10rem;
	}
`;

export const RightArrow = styled(AiOutlineArrowRight)`
  font-size: 1.2rem;
	color: ${({ theme }) => theme.color.dark};
`;

export const RemoveIconBox = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "space-around", "center")}
	height: 100%;
	justify-content: flex-end;
	align-items: flex-end;
`;

export const RemoveIcon = styled(AiOutlineMinusCircle)`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.color.dark};

	&:hover {
		cursor: pointer;
    color: ${({ theme }) => theme.color.primary};
	}
`;