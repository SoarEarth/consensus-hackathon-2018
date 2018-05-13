import * as React from 'react';
import * as PropTypes from 'prop-types';


interface WarehouseProps {}

interface WarehouseState {
    code: string;
}

class Warehouse extends React.Component<WarehouseProps, WarehouseState> {

    constructor(props: WarehouseProps) {
        super(props);
        this.setState({code: ''});
        this.handleCodeChange = this.handleCodeChange.bind(this);
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

    public render(): React.ReactElement<{}> {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Warehouse</h1>
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


export default Warehouse;