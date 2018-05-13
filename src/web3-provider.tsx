import * as React from 'react';
import * as PropTypes from 'prop-types';

const Web3 = require('web3');

declare global {
    interface Window { web3: any; }
}

interface ContextProviderPros {

}

interface ContextProviderState {
    web3?: any;
    loading: boolean;
}

class Web3Provider extends React.Component<ContextProviderPros, ContextProviderState> {

    static childContextTypes = {
        state: PropTypes.object
    };

    constructor(props: ContextProviderPros) {
        super(props);
        this.state = {
            web3: undefined,
            loading: true
        };
    }

    getChildContext() {
        return {
            state: {
                web3: this.state.web3,
                loading: this.state.loading,
            }
        };
    }

    componentDidMount() {
        let self = this;
        window.addEventListener('load', function () {
            let web3 = window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                self.setState({ loading: false, web3: web3 });
            } else {
                window.alert('Metamsk is not installed')
            }
        });
    }

    public render(): React.ReactElement<{}> {
        let element;
        if (this.state.loading) {
            element = 'loading';
        } else {
            element = this.props.children;
        }

        return <div id="web3-wrapper">{element}</div>;
    }
}

export default Web3Provider;