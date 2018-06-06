import * as React from "react";
import { hot } from "react-hot-loader";
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopMenuComponent: React.StatelessComponent<{}> = (props) => {
  return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src="/public/images/logo.png"
              style={{ marginRight: "1.5em" }}
            />
            Homelab VMs
          </Menu.Item>
          <Menu.Item><Link to="/">Home</Link></Menu.Item>
          <Menu.Item><Link to="/settings">Settings</Link></Menu.Item>
          <Menu.Item><Link to="/status">Status</Link></Menu.Item>
        </Container>
      </Menu>
  );
};

export const TopMenu = hot(module)(TopMenuComponent);
