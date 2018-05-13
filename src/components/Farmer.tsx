import * as React from 'react';
import * as PropTypes from 'prop-types';

import { submitFarmCode } from '../lib/growNYC-service';


interface FarmerProps extends React.Props<Farmer> {

}

interface FarmerState {
    code: string;
}

class Farmer extends React.Component<{}, FarmerState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: FarmerProps) {
        super(props);
        this.state = {code: ''};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleCodeChange(event: any) {
        var code = event.target.value;
        this.setState({code: code});
        console.log('Code', code);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        let web3 = this.context.state.web3;
        var code = this.state.code;
        console.log('Code', code);
        
        submitFarmCode(web3, code, '{}').then(res => {
            console.log('TransactionHash: ', res);
        })
        // TODO: write
    }

    public render(): React.ReactElement<{}> {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Farmers</h1>
                        <p className="lead">Scan your produce's QR code.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Code:
                        <input type="text" onChange={this.handleCodeChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                    </div>
                </div>
            </div>
        )
    };
}


export default Farmer;