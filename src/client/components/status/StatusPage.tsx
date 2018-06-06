import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { IStatus } from "../../../common/models/IStatus";
import * as api from "../../api";
import { Icon } from "semantic-ui-react";

interface IStatusPageState {
    status: IStatus;
}

class StatusPageComponent extends React.Component<{}, IStatusPageState> {
    constructor(props: any) {
        super(props);
        this.state = { status: {
            StoreHealthy: false,
            AllHealthy: false,
            ESXiConnected: false,
            VCenterConnected: false
        }};
    }

    public async componentDidMount() {
        const returnStatus = await api.getStatus();
        if (returnStatus) {
            this.setState({ status: returnStatus });
        }
    }

    public HealthDisplay(props: any) {
        if (props.isOK) {
            return <Icon name="check" color="green" />;
        } else {
            return <Icon name="close" color="red" />;
        }
    }

    public render() {
        return (
            <div className="row">
                <h2>Status Page</h2>
                <p>Check all dependencies are connected.</p>
                <p>All: <this.HealthDisplay isOK={this.state.status.AllHealthy} /></p>
                <p>Store: <this.HealthDisplay isOK={this.state.status.StoreHealthy} /></p>
                <p>ESXi: <this.HealthDisplay isOK={this.state.status.ESXiConnected} /></p>
                <p>VCenter: <this.HealthDisplay isOK={this.state.status.VCenterConnected} /></p>
            </div>
        );
    }
}

export const StatusPage = hot(module)(StatusPageComponent);
