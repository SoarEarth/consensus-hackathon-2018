import * as React from 'react';
import * as PropTypes from 'prop-types';

interface OverviewProps extends React.Props<Overview> {
}

interface OverviewState {

}

class Overview extends React.Component<OverviewProps, OverviewState> {

    static contextTypes = {
        web3: PropTypes.object
    };

    componentDidMount() {
    }

    public render(): React.ReactElement<{}> {
        return (
            <div>test</div>
        );
    }
}

export default Overview;