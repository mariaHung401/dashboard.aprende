import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Button
} from "reactstrap";

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen,
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "navbar-transparent";
    }
    this.setState(newState);
  };
  render() {
    return (
      <Navbar
        className={classnames("navbar-absolute fixed-top", this.state.color)}
        expand="lg"
      >
        <Container>
          <div className="navbar-wrapper">
            <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
              {/* <Link to="/create" className="btn-link">
                <Button
                  className="btn-link"
                  color="warning"
                  // onClick={() => this.notify("bl")}
                >
                  <i className="icon icon-info" />
                  Crear cuenta
                </Button>
              </Link> */}
            </NavbarBrand>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            isOpen={this.state.collapseOpen}
            className="justify-content-end"
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Button
                  target="_blank"
                  href="http://www.micolegio.com/"
                  className="btn-link"
                  color="warning"
                  onClick={() => this.notify("bl")}
                >
                  <i className="nc-icon nc-layout-11" />
                  Micolegio
                </Button>
                {/* <Button
                  href="https://blog.micolegio.com"
                  className="btn-link"
                  color="warning"
                  onClick={() => this.notify("bl")}
                >
                  <i className="nc-icon nc-tap-01" />
                  Blog
                </Button> */}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AuthNavbar;
