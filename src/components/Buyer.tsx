import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getEventsForCode } from '../lib/growNYC-service';


interface BuyerProps extends React.Props<Buyer> {}

interface BuyerState {
    code: string;
}

class Buyer extends React.Component<BuyerProps, BuyerState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: BuyerProps) {
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
        getEventsForCode(web3, String(code))
        .then(results => {
            console.log(results);
        })
        .catch(err => {
            console.error(err);
        })
        //TODO: write
    }

    public render(): React.ReactElement<{}> {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Buyer</h1>
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


export default Buyer;