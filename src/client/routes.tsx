import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./App";
import { LandingPage } from "./components/landing/LandingPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { StatusPage } from "./components/status/StatusPage";
import { store } from "./store";
import { hot } from "react-hot-loader";

const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/status" component={StatusPage} />
                    </Switch>
                </App>
            </BrowserRouter>
        </Provider>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);
