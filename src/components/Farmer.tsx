import * as React from 'react';
import * as PropTypes from 'prop-types';
import QrReader from 'react-qr-reader'
import Geocode from 'react-geocode';

import { submitFarmCode } from '../lib/growNYC-service';

interface FarmerProps extends React.Props<Farmer> {

}

interface FarmerState {
    code?: any;
    result?: any;
    lat?: any;
    lng?: any;
    streetAddress?: any;
}

class Farmer extends React.Component<{}, FarmerState> {

    static contextTypes = {
        state: PropTypes.object
    };

    constructor(props: FarmerProps) {
        super(props);
        this.state = {code: null, result: null, lat: null, lng: null, streetAddress: null};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.usersLocation();
    }


    componentWillMount() {
        Geocode.setApiKey('AIzaSyDIHfiYwIdK0Lclybj1_Y9LaG4vt3moT2g');
        Geocode.enableDebug();
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
        console.log('Code', code);
        
        submitFarmCode(web3, code, '{}').then(res => {
            console.log('TransactionHash: ', res);
        });
    }

    handleScan(data){
        if(data){
            console.log(data);
            this.setState({
                result: data,
            })
        }
      }
      handleError(err){
        console.error(err)
      }

      reverseGeocodePromise(lat: any, lng: any): Promise<any> {
        if (lat === undefined || lng === undefined) { return Promise.reject('No latlng'); }

        let geocodePromise: Promise<any> = new Promise(function(resolve: any, reject: any) {
            setTimeout(function() {
                resolve(Geocode.fromLatLng(lat, lng));
            });
        });

        return geocodePromise;
    }

      usersLocation() {
        if (navigator.geolocation) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    }
                );

                let geocodePromise = this.reverseGeocodePromise(position.coords.latitude, position.coords.longitude);

                let addresses = geocodePromise
                .then((result: any) => {
                    let formattedAddresses = result.results.map((val) => {
                        return val.formatted_address;
                    });

                    console.log("Street address: ", formattedAddresses[0]);
                    this.setState({streetAddress: formattedAddresses[0]});
                    
                });
            })
        } else {
            //browser doesn't support geolocation, set as vancouver
            console.log("No position");
        }
      }

    public render(): React.ReactElement<{}> {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Farmers</h1>
                        <p className="lead">Scan your produce's QR code.</p>
                        <p>{this.state.streetAddress}</p>
                    </div>
                    <div>
                        
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        { console.log('lat', this.state.lat) }
                        { this.state.result !== null ? 
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                Code:
                                <input type="text" value={this.state.result} onChange={this.handleCodeChange} />
                                </label>
                                <input type="submit" value="Submit" />
                                { console.log('lat', this.state.lat) }
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


export default Farmer;