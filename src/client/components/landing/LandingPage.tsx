import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { IBuildStatus } from "./../../../common/models/IBuildStatus";
import * as api from "../../api";
import { Message } from "semantic-ui-react";

interface IBuildListState {
    builds: IBuildStatus[];
}

class LandingPageComponent extends React.Component<{}, IBuildListState> {
    constructor(props: any) {
        super(props);
        this.state = { builds: []};
    }

    public async componentDidMount() {
        const returnStatus = await api.getBuildStatus();
        if (returnStatus) {
            this.setState({ builds: returnStatus });
        }
    }

    public ListBuilds(props: any) {
        const builds = props.builds;
        const listItems = builds.map((build: IBuildStatus) =>
            <Message icon="inbox"
                header={build.TemplateName}
                content={build.Status}
                key={build.key} />
        );
        return (
          <div>{listItems}</div>
        );
    }

    public render() {
        return (
          <div className="row">
            <h2>Builds</h2>
            <this.ListBuilds builds={this.state.builds} />
          </div>
       );
    }
}

export const LandingPage = hot(module)(LandingPageComponent);
