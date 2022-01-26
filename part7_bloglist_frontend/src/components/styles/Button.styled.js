import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border: 0;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
  }
`;
