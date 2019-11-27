import React, {Component} from 'react';
import {Row, Col, Card, Table} from 'reactstrap';
import {getReports} from '../../../api/reports';

class Reports extends Component {
  constructor(){
    super()
    this.state = {
      reports: []
    }
  }
  componentWillMount(){
    getReports({}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        console.log(response)
        this.setState({
          reports: response.data.data
        })
      }
    })
  }
  render(){
    const {reports} = this.state
    return(
      <div>
        <Row>
          <h3>Reports</h3>
        </Row>
        {
          reports.map((report, index) =>{
            return(
              <Card style={{padding: 12}} key={index}>
                <Row>
                  <Col sm="3">
                      <p>Merchant Id: {report.merchantId}</p>
                  </Col>
                  <Col sm="3">
                    {(report.cardDetails.length > 0)? <p>Card Number: {report.cardDetails[0].cardNumber}</p>: null}
                  </Col>
                  <Col sm="3">
                      <p>Total Attempts: {report.attempt}</p>
                  </Col>
                  <Col sm="3">
                      <p>Amount: {report.amount}</p>
                  </Col>
                </Row>
                {
                  (report.reAttemptDetails.length > 0)?
                    <Table>
                    <thead>
                      <tr>
                        <th>Attempt</th>
                        <th>Merchant Id</th>
                        <th>Card Number</th>
                        <th>Error Code</th>
                        <th>Error Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        report.reAttemptDetails.map((attempt, id) => {
                          let stripeError = JSON.parse(attempt.stripeError)
                          return(
                            <tr key={id}>
                              <td>{attempt.attemptCount}</td>
                              <td>{report.merchantId}</td>
                              <td>{(report.cardDetails.length > 0)? <p>{report.cardDetails[0].cardNumber}</p>: null}</td>
                              <td>{stripeError.raw.code}</td>
                              <td>{stripeError.raw.message}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  :null
                }
              </Card>
            )
          })
        }
      </div>
    )
  }
}

export default Reports;
