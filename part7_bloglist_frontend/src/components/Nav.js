import React from "react";
import { NavStyled } from "./styles/Nav.styled";
import { NavItemStyled } from "./styles/NavItem.styled";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { Container } from "./styles/Container.styled";
import { Flex } from "./styles/Flex.styled";
import { Button } from "./styles/Button.styled";

const Nav = ({ currentUser, logoutHandler }) => (
  <NavStyled>
    <Container>
      <Flex>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <NavItemStyled>
              <span>blogs</span>
            </NavItemStyled>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <NavItemStyled>
              <span>users</span>
            </NavItemStyled>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <i
              style={{ color: "blue", marginRight: "1.5rem" }}
            >{`Welcome Mr.${currentUser.name}`}</i>
          </div>

          <Button onClick={() => logoutHandler()}>
            <FaSignOutAlt />
          </Button>
        </div>
      </Flex>
    </Container>
  </NavStyled>
);

export default Nav;
