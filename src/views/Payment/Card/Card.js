import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row, Alert
} from 'reactstrap';
import {addCard, getAccounts} from '../../../api/card';
import 'react-toastify/dist/ReactToastify.css';
import {getAnswers} from '../../../api/question';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardNumber: '',
      expireMonth: 1,
      expireYear: 2019,
      cvv: '',
      alert: false,
      amount: '',
      flat: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      showToast: false,
      errorToast: false,
      apiData: {},
      merchant: '',
      account: '',
      apiAnswers: [],
      apiAccounts: []
    };
  }

  componentWillMount() {
    this.getData()
  }

  getData = () => {
    getAnswers({}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        this.setState({
          apiAnswers: response.data.data
        })
      }
    })

    getAccounts({}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        console.log(response)
        this.setState({
          apiAccounts: response.data.data
        })
      }
    })
  }

  onChange = (e) => {
    let {value, name, type} = e.target;
    this.setState({
      [name]: value
    })
  }

  selectAccount = (e) => {
    let {value, name, type} = e.target;
    let {apiAccounts} = this.state
    let selectedAccount = apiAccounts.filter((account) => {
      return account.accountName == value
    })
    if(selectedAccount.length > 0){
      this.setState({
        name: selectedAccount[0].name,
        cardNumber: selectedAccount[0].cardNumber,
        expireMonth: selectedAccount[0].expireMonth,
        expireYear: selectedAccount[0].expireYear,
        cvv: selectedAccount[0].cvv,
        amount: selectedAccount[0].amount,
        flat: selectedAccount[0].address1,
        street: selectedAccount[0].address2,
        city: selectedAccount[0].city,
        zip: selectedAccount[0].zip,
        state: selectedAccount[0].state,
        [name]: value
      })
    }
    else{
      this.setState({
        [name]: value
      })
    }
  }

  onSubmit = () => {
    let data = {
      name: this.state.name,
      cardNumber: this.state.cardNumber,
      expireMonth: this.state.expireMonth,
      expireYear: this.state.expireYear,
      cvv: this.state.cvv,
      amount: this.state.amount,
      merchantId: this.state.merchant
    }
    addCard(data, {}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        this.setState({
          apiData: response.data.data,
          name: '',
          cardNumber: '',
          expireMonth: 1,
          expireYear: 2019,
          cvv: '',
          amount: '',
          flat: '',
          street: '',
          city: '',
          zip: '',
          merchant: ''
        })

        if(response.data && response.data.data.type=='StripeCardError'){
          this.setState({
            errorToast: true
          })
        }
        if(response.data && response.data.data.status=='succeeded'){
          this.setState({
            showToast: true
          })
        }
      }
    })
  }

  onDismiss = () => {
    this.setState({
      showToast: false,
      errorToast: false
    })
  }

  /*notify = () => {
    toast.success("Payment Successful", {containerId: 'A'});
  }*/

  render() {
    const {amount, showToast, errorToast, apiData, apiAnswers, apiAccounts} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
              <Form>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="account">Account</Label>
                      <Input type="select" id="account" name = "account" value={this.state.account} required
                      onChange={(e, key) => this.selectAccount(e, key)}>
                        <option>Select Account</option>
                        {
                          apiAccounts.map((account, index) => <option key={index}>{account.accountName}</option>)
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/*<Row>
                                  <Col xs="12">
                                    <FormGroup>
                                      <Label htmlFor="merchant">Merchant</Label>
                                      <Input type="select" id="merchant" name = "merchant" value={this.state.merchant} placeholder="Enter your name" required
                                      onChange={(e) => this.onChange(e)}>
                                        <option>Select Merchant</option>
                                        {
                                          apiAnswers.map((answer, index) => <option key={index}>{answer.merchantId}</option>)
                                        }
                                      </Input>
                                    </FormGroup>
                                  </Col>
                                </Row>*/}
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" name = "name" value={this.state.name} placeholder="Enter your name" required
                      onChange={(e) => this.onChange(e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="amount">Amount</Label>
                      <Input type="number" id="amount" name = "amount" value={this.state.amount} placeholder="USD" required
                      onChange={(e) => this.onChange(e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="cardNumber">Credit Card Number</Label>
                      <Input type="number" id="cardNumber" name = "cardNumber" value={this.state.cardNumber} placeholder="0000 0000 0000 0000" required
                      onChange={(e) => this.onChange(e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="expireMonth">Month</Label>
                      <Input type="select" name="expireMonth" id="expireMonth" value={this.state.expireMonth}
                      onChange={(e) => this.onChange(e)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="expireYear">Year</Label>
                      <Input type="select" name="expireYear" id="expireYear" value={this.state.expireYear}
                      onChange={(e) => this.onChange(e)}>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">Card Security Code</Label>
                      <Input type="text" id="cvv" name="cvv" value={this.state.cvv} placeholder="123" required
                      onChange={(e) => this.onChange(e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Label>Billing Address</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Input type="text" id="address" name = "flat" value={this.state.flat} placeholder="Address1" required
                      onChange={(e) => this.onChange(e)}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <Input type="text" id="street" name = "street" value={this.state.street} placeholder="Address2" required
                      onChange={(e) => this.onChange(e)}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Input type="text" id="city" name = "city" value={this.state.city} placeholder="City" required
                      onChange={(e) => this.onChange(e)}/>
                  </Col>
                  <Col xs="6">
                    <Input type="text" id="state" name = "state" value={this.state.state} placeholder="State" required
                      onChange={(e) => this.onChange(e)}/>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="6">
                    <Input type="text" id="zip" name = "zip" value={this.state.zip} placeholder="Zip" required
                      onChange={(e) => this.onChange(e)}/>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col xs="6">
                    <Button active block color="success" onClick={this.onSubmit}>Proceed</Button>
                  </Col>
                </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*<ToastContainer autoClose={4000} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT}/>*/}
        {
          (showToast)?
          <Row>
            <Col xs="6">
              <Alert color="success" toggle={this.onDismiss}>
                <h4 className="alert-heading">Success!</h4>
                <p>Payment Successful</p>
              </Alert>
            </Col>
          </Row>
          :null
        }
        {
          (errorToast)?
          <Row>
            <Col xs="6">
              <Alert color="danger" toggle={this.onDismiss}>
                <h4 className="alert-heading">Failure!</h4>
                <p><strong>Code:</strong>{apiData.raw.code}</p>
                <p><strong>Message:</strong>{apiData.raw.message}</p>
              </Alert>
            </Col>
          </Row>
          :null
        }
      </div>
    );
  }
}

export default Forms;

/*import React from 'react';
import { StripeProvider, CardElement, Elements, injectStripe } from 'react-stripe-elements';
import {addCard} from '../../../api/card';

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

class CheckoutForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardNumber: '',
      expireMonth: 1,
      expireYear: 2019,
      cvv: '',
      alert: false,
      showToast: false
    };
  }

  onChange = (e) => {
    let {value, name, type} = e.target;
    this.setState({
      [name]: value
    })
  }

  onSubmit = (ev) => {
    let data = {
      amount: 1
    }
    addCard(data, {}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        this.handleSubmit(ev, response.data.data)
        this.setState({
          showAlert: true,
          name: '',
          cardNumber: '',
          expireMonth: 1,
          expireYear: 2019,
          cvv: '',
          amount: '',
          flat: '',
          street: '',
          city: '',
          zip: '',
          showToast: true
        })
      }
    })
  }

  handleSubmit = (ev, clientSecret) => {
    console.log(this.props)
    //ev.preventDefault();
    const cardElement = this.props.elements.getElement('card');
    this.props.stripe.confirmCardPayment(clientSecret, {payment_method: {card: cardElement}});

  };

  render() {
    return(
      <form onSubmit={this.onSubmit} width={600}>
        <CardElement/>
        <br />
        <button>Proceed</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);*/

