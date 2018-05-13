import * as React from 'react';
import * as PropTypes from 'prop-types';
import QrReader from 'react-qr-reader'
import '../index.css'
import { getEventsForCode } from '../lib/growNYC-service';

interface BuyerProps extends React.Props<Buyer> { }

interface BuyerState {
    code?: any;
    result?: any;
    farmer?: any;
    warehouse?: any;
    retail?: any;
}

class Buyer extends React.Component<BuyerProps, BuyerState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: BuyerProps) {
        super(props);
        this.state = { code: null, result: null, farmer: {}, warehouse: {}, retail: {} };
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }


    handleCodeChange(event: any) {
        var code = event.target.value;
        this.setState({ code: code });
        console.log('Code', code);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        let web3 = this.context.state.web3;
        var code = this.state.code;
        console.log('Code', code);

        //TODO: write
    }

    handleScan(data) {
        console.log('handleScan: ', data);
        if (data) {
            let web3 = this.context.state.web3;

            this.setState({
                result: data,
            })
            getEventsForCode(web3, String(data))
                .then(results => {
                    results.forEach(i => {
                        if(i.order === 1){
                            this.setState({farmer: {address: i.sender, date: i.timestamp}});
                        } else if(i.order === 2){
                            this.setState({warehouse: {address: i.sender, date: i.timestamp}});                           
                        } else if(i.order === 3){
                            this.setState({retail: {address: i.sender, date: i.timestamp}});                                                      
                        }
                    })
                    console.log(results);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }



    handleError(err) {
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

                        {this.state.result !== null ?
                            <div className="col-md-12">
                                <dl>
                                    <dt>Product</dt>
                                    <dd>{this.state.result}</dd>
                                    <dt>Farmer</dt>
                                    <dd>{this.state.farmer.address}</dd>
                                    <dd>{this.state.farmer.date && this.state.farmer.date.toLocaleString()}</dd>
                                    <img src="/assets/map.jpg" style={{maxWidth: '220px', maxHeight: '220px'}} />
                                    
                                    <dt>Warehouse</dt>
                                    <dd>{this.state.warehouse.address}</dd>
                                    <dd>{this.state.warehouse.date && this.state.warehouse.date.toLocaleString()}</dd>
                                    <dt>Retail</dt>
                                    <dd>{this.state.retail.address}</dd>
                                    <dd>{this.state.retail.date && this.state.retail.date.toLocaleString()}</dd>
                                </dl>

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