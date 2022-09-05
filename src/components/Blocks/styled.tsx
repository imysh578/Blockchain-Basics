import styled from "styled-components";

export const Container = styled.div`
	${({ theme }) => theme.components.container("column", "center", "flex-start")}
	width: 100%;
`;

export const Wrap = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")}
	width: 100%;
	height: 100%;
	gap: 1rem;
	border-radius: 1rem;
  overflow: auto;
	padding: 2rem;
`;

export const Content = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-start", "flex-start")}
	gap: 2rem;
	width: 100%;
	height: 100%;
`;

export const BlockWrap = styled.div`
	width: 32rem;
	border: 2px solid ${({ theme }) => theme.color.black};
	border-radius: 1rem;
`;

export const Title = styled.h2`
	color: ${({ theme }) => theme.color.dark};
	font-size: 1.25rem;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	width: 100%;
	height: 3.25rem;
	padding: 0.75rem;
	border-bottom: 2px solid ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.white};
  border-top-left-radius: .85rem;
  border-top-right-radius: .85rem;
`;

export const SubTitle = styled.h2`
	color: ${({ theme }) => theme.color.dark};
	font-size: 1.25rem;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
`;

export const Column = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "flex-start")}
	gap: 1rem;
	width: 100%;
  /* height: 100%; */
`;

export const Row = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-start", "flex-start")}
  max-width: 100%;
	gap: 1rem;
`;

export const DataWrap = styled.form`
	width: 100%;
	height: calc(100% - 3.25rem);
	padding: 1rem;
	background: ${({ theme, className }) => className !== "invalid" ? theme.color.successBg : theme.color.errorBg};
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	overflow: auto;
`;

export const DataBox = styled.div`
	width: 100%;
	padding: 1rem;
  border: 2px solid ${({ theme }) => theme.color.black};
	border-radius: 1rem;
  background: ${({ theme }) => theme.color.white};
`;

export const TextBox = styled.div`
	
`

export const Attribute = styled.h3`
	width: 8rem;
	color: ${({ theme }) => theme.color.black};
	font-size: 1rem;
	font-weight: ${({ theme }) => theme.fontWeight.medium};
	line-height: 2.1rem;
`;

export const Input = styled.input`
	width: 25rem;
	color: ${({ theme }) => theme.color.dark};
	background: ${({ theme, readOnly }) => !readOnly && theme.color.light};
	font-size: 1rem;
	font-weight: ${({ theme }) => theme.fontWeight.light};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
  ${({theme, className}) => className === "important-value" && (`
    color: ${theme.color.tertiary};
    font-weight: ${theme.fontWeight.semiBold};
  `)};
	border: none;
	border-radius: .25rem;
	padding: .5rem;
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
	background: ${({ theme }) => theme.color.secondary};
	color: ${({ theme }) => theme.color.white};

	&:hover {
		background: ${({ theme }) => theme.color.tertiary};
	}

	&:disabled {
		background: ${({ theme }) => theme.color.gray};
		&:hover {
			cursor: no-drop;
			background: ${({ theme }) => theme.color.gray};
		}
	}
`;