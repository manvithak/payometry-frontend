/*import React, { Component } from 'react';
let paypal;

class Typography extends Component {
  componentWillMount(){
    var loadScript = function (src) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
      //paypal.Buttons().render('body');
    }

    loadScript('https://www.paypal.com/sdk/js?client-id=AZt4aj4cJxqEw4SUmiWRTMurIweK7GSDfz3s4wY1nXNnvFIEdeDsKodG2n-9zHf5rhRDgW9Spw7FrwHd');
  }
  componentDidMount(){
    paypal.Buttons().render('#paypal-button-container');
  }
  render() {
    return (
      <div id="paypal-button-container"></div>
    );
  }
}*/

import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class ExecutePayment extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
    }

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
      console.log("Error!", err);
    }

    let env = 'sandbox';
    let currency = 'INR';
    let total = 1;

    const client = {
        sandbox: 'AZt4aj4cJxqEw4SUmiWRTMurIweK7GSDfz3s4wY1nXNnvFIEdeDsKodG2n-9zHf5rhRDgW9Spw7FrwHd',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );
  }
}

export default ExecutePayment;
/*import React from 'react';

import Checkout from '../Colors/Colors';

import {Elements} from 'react-stripe-elements';


class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <Checkout />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
*/
