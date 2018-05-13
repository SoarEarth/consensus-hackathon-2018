import * as React from 'react';
import * as PropTypes from 'prop-types';
import QrReader from 'react-qr-reader'
import '../index.css'
import { getEventsForCode } from '../lib/growNYC-service';

interface BuyerProps extends React.Props<Buyer> {}

interface BuyerState {
    code?: any;
    result?: any;
}

class Buyer extends React.Component<BuyerProps, BuyerState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: BuyerProps) {
        super(props);
        this.state = {code: null, result: null};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
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
        
        //TODO: write
    }

    handleScan(data){
        console.log('handleScan: ', data);
        if(data){
        let web3 = this.context.state.web3;
            
          this.setState({
            result: data,
          })
          getEventsForCode(web3, String(data))
        .then(results => {
            console.log(results);
        })
        .catch(err => {
            console.error(err);
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
                        <h1 className="display-4">Buyer</h1>
                        <p className="lead">Scan your produce's QR code.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">

                    { this.state.result !== null ? 
                        <div className="col-md-12">
                            <div className="row">
                                <h2>Product</h2>
                                <p>{this.state.result}</p>
                            </div>

                            <div className="row">
                                <h2>Farmer: </h2>

                            </div>

                            <div className="row">
                                <h2>Warehouse: </h2>
                            </div>

                            <div className="row">
                                <h2>Retailer:</h2>
                            </div>
                    
                        </div>
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


export default Buyer;