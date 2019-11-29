import React from 'react';
import { Collapse, Card, Row, Col, Table } from 'reactstrap';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import * as moment from 'moment';
import 'moment-timezone';

class ListItems extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    const {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render(){
    const {report} = this.props
    const {isOpen} = this.state
    return(
      <Card style={{padding: 12, marginBottom: 5}}>
        <Row>
          <Col sm="2">
            {(report.cardDetails.length > 0)? <p><strong>Card Number</strong><br/> ************{report.cardDetails[0].cardNumber.slice(12,16)}</p>: null}
          </Col>
          <Col sm="1">
            {(report.cardDetails.length > 0)? <p><strong>Name</strong><br/>{report.cardDetails[0].name}</p>: null}
          </Col>
          <Col sm="1">
            <p><strong>Retries</strong> <br/>{report.attempt - 1}</p>
          </Col>
          <Col sm="1">
            <p><strong>Amount</strong> <br/>{report.amount}USD</p>
          </Col>
          {(report.responseCodeStatus)?
            <Col sm="2">
              <p><strong>Payometry Error</strong> <br/>{report.responseCodeStatus}</p>
            </Col>
            : null
          }
          {
            (report.stripeErrorCode && report.stripeErrorCode == 'invalid_expiry_year')?
            <Col sm="2">
              <p><strong>Payment Gateway Error</strong> <br/>{report.stripeErrorCode} ({report.cardDetails[0].expiryYear})</p>
            </Col>
            :<Col sm="2">
              <p><strong>Payment Gateway Error</strong> <br/>{report.stripeErrorCode}</p>
            </Col>
          }
          {
            (report.stripeSuccessResponse)?
            <Col sm="4">
              <p style={{color: 'green'}}><strong>Payment Gateway Message </strong><br/>Success</p>
            </Col>
            :null
          }
          <Col sm="2">
            <p><strong>DateTime</strong> <br/>{moment(report.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss a')}</p>
          </Col>
          {
            (report.reAttemptDetails.length > 0)?
            <Col sm="1">
              {(isOpen)? <div style={{float: 'right'}}><a onClick={this.toggle}><FaAngleUp/></a></div>:<div style={{float: 'right'}}><a onClick={this.toggle}><FaAngleDown/></a></div>}
            </Col>
            :null
          }
        </Row>
        <Collapse isOpen={isOpen}>
          {
            (report.reAttemptDetails.length > 0)?
              <Table>
              <thead>
                <tr>
                  <th>Attempt</th>
                  <th>Payment Gateway Error</th>
                  <th>Payometry Error</th>
                  <th>Payment Gateway Message</th>
                  <th>Payometry Message</th>
                  <th>DateTime</th>
                </tr>
              </thead>
              <tbody>
                {
                  report.reAttemptDetails.map((attempt, id) => {
                    let stripeError;
                    if(!stripeError && attempt.stripeSuccess){
                      stripeError = JSON.parse(attempt.stripeSuccess)
                    }else{
                      stripeError = JSON.parse(attempt.stripeError)
                    }
                    return(
                      <tr key={id}>
                        <td>{(attempt.attemptCount == report.maxAttemptCount) ? <p>{attempt.attemptCount}(last attempt)</p>: <p>{attempt.attemptCount}</p>}</td>
                        {
                          (stripeError.raw && report.stripeErrorCode == 'invalid_expiry_year')?
                          <td>{stripeError.raw.code}&nbsp;{attempt.year}</td>:null
                        }
                        {
                          (stripeError.raw && report.stripeErrorCode !== 'invalid_expiry_year')?
                          <td>{stripeError.raw.code}</td>:null
                        }
                        {
                          (stripeError.status == 'succeeded' && report.stripeErrorCode == 'invalid_expiry_year')?
                          <td>{attempt.year}</td>: null
                        }
                        <td>{(attempt.responseCodeStatus)?attempt.responseCodeStatus: '-' }</td>
                        <td>{(stripeError.raw)?stripeError.raw.message: 'Success'}</td>
                        <td>{(attempt.stripeSuccess)?'-':report.customerOrSystemAction}</td>
                        <td>{moment(attempt.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss a')}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            :null
          }
        </Collapse>
      </Card>
    )
  }
}

export default ListItems;
