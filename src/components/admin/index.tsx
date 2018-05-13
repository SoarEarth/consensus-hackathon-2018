import * as React from 'react';
import * as PropTypes from 'prop-types';
import { fetchAdminInfo } from '../../lib/growNYC-service';
import { AdminInfo } from '../../lib/model';
import { Row } from 'reactstrap';

interface AdminProps extends React.Props<Admin> {
}

interface AdminState {
    info: AdminInfo;
}

class Admin extends React.Component<AdminProps, AdminState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: AdminProps) {
        super(props);
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        fetchAdminInfo(this.context.state.web3).then(res => {
            this.setState({ info: res });
        })
    }

    public render(): React.ReactElement<{}> {
        return (
            <Row>
                <dl>
                    <dt>Owner</dt>
                    <dd>{this.state.info.owner}</dd>
                    <dt>User</dt>
                    <dd>{this.state.info.userAddress}</dd>
                </dl>
            </Row>
        );
    }
}

export default Admin;