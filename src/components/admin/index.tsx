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
            <div>
                    
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Fluid jumbotron</h1>
                        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                
                        <img src="/assets/logo.png" alt="Grow NYC" />
                    </div>
                </div>
            

            
                <dl>
                    <dt>Owner</dt>
                    <dd>{this.state.info.owner}</dd>
                    <dt>User</dt>
                    <dd>{this.state.info.userAddress}</dd>
                </dl>
               
            </div>
        );
    }
}

export default Admin;