import * as React from "react";
import { hot } from "react-hot-loader";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { TopMenu } from "./components/common/TopMenu";
import { Footer } from "./components/common/Footer";

const AppComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <div>
            <TopMenu />
            <Container text style={{ marginTop: "7em" }}>
                {props.children}
            </Container>
            <Footer />
        </div>
    );
};

export const App = hot(module)(AppComponent);
