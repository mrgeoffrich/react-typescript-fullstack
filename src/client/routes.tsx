import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./app";
import { LandingPage } from "./components/landing/LandingPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { StatusPage } from "./components/status/StatusPage";
import { hot } from "react-hot-loader";

const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/status" component={StatusPage} />
                </Switch>
            </App>
        </BrowserRouter>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);
