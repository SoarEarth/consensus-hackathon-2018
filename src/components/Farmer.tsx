import * as React from 'react';
import * as PropTypes from 'prop-types';
import QrReader from 'react-qr-reader'



interface FarmerProps extends React.Props<Farmer> {

}

interface FarmerState {
    code?: any;
    result?: any;
    lat?: any;
    lng?: any;
}

class Farmer extends React.Component<{}, FarmerState> {

    constructor(props: FarmerProps) {
        super(props);
        this.state = {code: null, result: null, lat: null, lng: null};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.usersLocation();

    }

    componentWillReceiveProps(props: FarmerProps) {
        this.usersLocation();
    }


    handleCodeChange(event: any) {
        var code = event.target.value;
        this.setState({code: code});
        console.log('Code', code);
    }

    handleSubmit(event: any) {
        var code = event.target.value;
        console.log('Code', code);

        //TODO: write
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

      usersLocation() {
        if (navigator.geolocation) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    }
                );
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