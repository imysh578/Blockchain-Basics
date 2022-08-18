import styled from "styled-components";

export const Container = styled.div`
	${({ theme }) => theme.components.container("column", "center", "center")}
	width: 100%;
	min-height: calc(100vh - ${({ theme }) => theme.height.navbar} - 4rem);
`;

export const Wrap = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")}
	width: 40rem;
	height: 45rem;
	gap: 1rem;
	border-radius: 1rem;
`;

export const Content = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")}
	gap: 1rem;
	width: 100%;
	height: 100%;
	overflow: auto;
	padding: 1rem;
`;

export const Block = styled.div`
	width: 100%;
	height: 24.5rem;
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
  background: ${({ theme }) => theme.color.bg};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
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
`;

export const Row = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "flex-start", "flex-start")}
	gap: 1rem;
`;

export const DataWrap = styled.div`
	width: 100%;
	height: calc(100% - 3rem);
	padding: 1rem;
	background: ${({ theme }) => theme.color.successBg};
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

export const Attribute = styled.h3`
	width: 8rem;
	color: ${({ theme }) => theme.color.black};
	font-size: 1rem;
	font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Description = styled.h4`
	width: 25rem;
	color: ${({ theme }) => theme.color.dark};
	font-size: 1rem;
	font-weight: ${({ theme }) => theme.fontWeight.light};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
