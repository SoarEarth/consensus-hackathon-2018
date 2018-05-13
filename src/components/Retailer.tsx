import * as React from 'react';
import * as PropTypes from 'prop-types';
import QrReader from 'react-qr-reader'
import { Metadata } from '../lib/model';
import { submitRetailCode } from '../lib/growNYC-service';

interface RetailerProps {}

interface RetailerState {
    code?: any;
    result?: any;
}

class Retailer extends React.Component<RetailerProps, RetailerState> {

    static contextTypes = {
        state: PropTypes.object
    };
    
    constructor(props: RetailerProps) {
        super(props);
        this.state = {code: null, result: null};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
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
        var code = this.state.result;
        let metadata: Metadata = {};
        console.log('Code', code);
        
        submitRetailCode(web3, code, metadata).then(res => {
            console.log('TransactionHash: ', res);
        });
    }

    handleScan(data){
        console.log('handleScan: ', data);
        if(data){
          this.setState({
            result: data,
          })
        }
      }

    handleError(err){
        console.error(err)
    }

    public render(): React.ReactElement<{}> {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Retailer</h1>
                        <p className="lead">Scan your produce's QR code.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                    
                    { this.state.result !== null ? 
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                Code:
                                <input type="text" value={this.state.result} onChange={this.handleCodeChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        : 
                            <QrReader
                                delay={300}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: '100%' }}
                            />
                        }

                    </div>
                </div>
            </div>
        )
    };
}


export default Retailer;