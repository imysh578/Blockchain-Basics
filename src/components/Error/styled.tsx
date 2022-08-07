import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.components.container("column", "center", "center")}
`;

export const ErrorCode = styled.h1`
  color: ${({theme}) => theme.color.error};
  font-size: 2rem;
  font-weight: ${({theme}) => theme.fontWeight.bold};
`;

export const ErrorMsg = styled.p`
  color: ${({theme}) => theme.color.error};
  font-size: 1.5rem;
  font-weight: ${({theme}) => theme.fontWeight.semiBold};
`;

export const Btn = styled.button`
  border: none;
  margin-top: 1rem;
  background: ${({theme}) => theme.color.bg};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: .25rem;

  &:hover{
    cursor: pointer;
    background-color: ${({theme}) => theme.color.primary};
    color: ${({theme}) => theme.color.white};
  }
`;