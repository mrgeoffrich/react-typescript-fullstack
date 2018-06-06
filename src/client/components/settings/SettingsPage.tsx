import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";

interface ISettingsPageState {
    vcenterusername: string;
}

class SettingsPageComponent extends React.Component<{}, ISettingsPageState> {

    public render() {
        return (
            <Form>
                <h4 className="ui dividing header">Something</h4>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>URL</label>
                        <input placeholder="URL" />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder="Something Username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder="Something Password" />
                    </Form.Field>
                </Form.Group>
                <Button>Check</Button>
                <h4 className="ui dividing header">Other thing</h4>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>IP Address</label>
                        <input placeholder="Other IP Address" />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder="Other Username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder="Other Password" />
                    </Form.Field>
                </Form.Group>
                <Button>Check</Button>
            </Form>
        );
    }
}

export const SettingsPage = hot(module)(SettingsPageComponent);
