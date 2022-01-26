import styled from "styled-components";

export const NavItemStyled = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  color: white;
  margin-left: 1.5rem;
  font-weight: bold;
  & > span {
    text-transform: uppercase;
  }
`;
