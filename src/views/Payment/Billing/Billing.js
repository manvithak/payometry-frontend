import React, { Component } from 'react';
import { Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import logo from '../../../assets/img/brand/logo.jpeg'

class Billing extends Component{
  constructor(){
    super()
  }
  goToPreference = () => {
    window.location.hash = "#/user-preferences";
  }
  render(){
    return(
      <div>
        <Row style={{marginBottom: 20}}>
          <h3>Billing Paradigm</h3>
        </Row>
        <Row>
          <Col sm="3">
            <Card>
              <CardHeader style={{padding: 0}}>
                <p style={{textAlign: 'center', fontSize: 18}}><strong>On-Demand</strong></p>
              </CardHeader>
              <CardBody>
                <p>Uber</p>
                <p>Lyft</p>
                <p>Dunkin Donuts Order Ahead</p>
                <div style={{textAlign: 'center'}}>
                  <Button active color="success" onClick={this.goToPreference}>Submit</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card>
              <CardHeader style={{padding: 0}}>
                <p style={{textAlign: 'center', fontSize: 18}}><strong>Voice / IoT</strong></p>
              </CardHeader>
              <CardBody>
                <p>Amazon Alexa</p>
                <p>Google Nest</p>
                <p>GE Fridge</p>
                <div style={{textAlign: 'center'}}>
                  <Button active color="success" onClick={this.goToPreference}>Submit</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card>
              <CardHeader style={{padding: 0}}>
                <p style={{textAlign: 'center', fontSize: 18}}><strong>1-Time Purchase / Retail</strong></p>
              </CardHeader>
              <CardBody>
                <p>Xbox / Microsoft Store</p>
                <p>iTunes / App Store</p>
                <p>Walmart Pay/Wallet</p>
                <div style={{textAlign: 'center'}}>
                  <Button active color="success" onClick={this.goToPreference}>Submit</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card>
              <CardHeader style={{padding: 0}}>
                <p style={{textAlign: 'center', fontSize: 18}}><strong>Subscription / Continuity</strong></p>
              </CardHeader>
              <CardBody>
                <p>Netflix</p>
                <p>Blue Apron</p>
                <p>Sony Entertainment</p>
                <div style={{textAlign: 'center'}}>
                  <Button active color="success" onClick={this.goToPreference}>Submit</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Billing;
