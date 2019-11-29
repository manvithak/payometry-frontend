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
      <Card style={{padding: 12, marginBottom: 0}}>
        <Row>
          <Col sm="2">
            {(report.cardDetails.length > 0)? <p>Card Number<br/> ************{report.cardDetails[0].cardNumber.slice(12,16)}</p>: null}
          </Col>
          <Col sm="1">
            {(report.cardDetails.length > 0)? <p>Name<br/>{report.cardDetails[0].name}</p>: null}
          </Col>
          <Col sm="1">
            <p>Retries <br/>{report.attempt - 1}</p>
          </Col>
          <Col sm="1">
            <p>Amount <br/>{report.amount}USD</p>
          </Col>
          <Col sm="2">
            <p>Payometry Error <br/>{report.responseCodeStatus}</p>
          </Col>
          <Col sm="2">
            <p>Payment Gateway Error <br/>{report.stripeErrorCode}</p>
          </Col>
          <Col sm="2">
            <p>DateTime <br/>{moment(report.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss a')}</p>
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
                    let stripeError = JSON.parse(attempt.stripeError)
                    return(
                      <tr key={id}>
                        <td>{(attempt.attemptCount == report.maxAttemptCount) ? <p>{attempt.attemptCount}(last attempt)</p>: <p>{attempt.attemptCount}</p>}</td>
                        <td>{stripeError.raw.code}</td>
                        <td>{attempt.responseCodeStatus}</td>
                        <td>{stripeError.raw.message}</td>
                        <td>{report.customerOrSystemAction}</td>
                        <td>{moment(attempt.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss')}</td>
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
