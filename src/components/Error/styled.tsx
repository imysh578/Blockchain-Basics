import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.components.container("column", "center", "center")}
  margin-top: 3rem;
`;

export const ErrorTitle = styled.h1`
  color: ${({theme}) => theme.color.error};
  font-size: 2rem;
  font-weight: ${({theme}) => theme.fontWeight.bold};
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.color.bg1};
`;

export const Box = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "center")}
  width: 40rem;
  padding: 1rem;
  border: .25rem solid ${({theme}) => theme.color.bg};
  border-radius: 1rem;
`;

export const ErrorMsg = styled.p`
  width: 100%;
  text-align: left;
  color: ${({theme}) => theme.color.error};
  font-size: 1.5rem;
  font-weight: ${({theme}) => theme.fontWeight.medium};
`;

export const BtnBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "flex-end")}
  width: 100%;
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