import React from 'react';
import { Collapse, Card, Row, Col, Table } from 'reactstrap';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import * as moment from 'moment';
import 'moment-timezone';

class ListItems extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      showHover: false
    }
  }

  toggle = () => {
    const {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  handleMouseHover = () => {
    this.setState({
      showHover: true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      showHover: false
    })
  }

  render(){
    const {report} = this.props
    const {isOpen, showHover} = this.state
    /*let originalAttempt = {
      attemptCount: 1,
      stripeError:{
        raw:{
          code: report.stripeErrorCode,
          message: report.stripeMessage
        }
      },
      createdAt: report.createdAt
    }
    let tempReports = report
    console.log(originalAttempt)
    let reattempts = tempReports.reAttemptDetails
    console.log(reattempts)
    let reattempts1 = reattempts.push(originalAttempt)*/
    //report.reAttemptDetails = reattempts
    return(
      <Card style={{padding: 12, marginBottom: 5}}>
        <Row>
          <Col sm="2">
            {(report.cardDetails.length > 0)? <p className="report-font"><strong>Card Number</strong><br/> ************{report.cardDetails[0].cardNumber.slice(12,16)}</p>: null}
          </Col>
          <Col sm="1">
            {(report.cardDetails.length > 0)? <p className="report-font"><strong>Name</strong><br/>{report.cardDetails[0].name}</p>: null}
          </Col>
          <Col sm="1">
            <p className="report-font"><strong>Retries</strong> <br/>{report.attempt - 1}</p>
          </Col>
          <Col sm="1">
            <p className="report-font"><strong>Amount</strong> <br/>{report.amount}&nbsp;USD</p>
          </Col>
          {(report.responseCodeStatus)?
            <Col sm="2">
              <p className="report-font"><strong>Payometry Error</strong> <br/>{report.responseCodeStatus}</p>
            </Col>
            : null
          }
          {
            (report.stripeErrorCode && report.stripeErrorCode == 'invalid_expiry_year')?
            <Col sm="2">
              <p className="report-font"><strong>Payment Gateway Error</strong> <br/>{report.stripeErrorCode} ({report.initialYear})</p>
            </Col>:null
          }
          {
            (report.stripeErrorCode && report.stripeErrorCode !== 'invalid_expiry_year')?
            <Col sm="2">
              <p className="report-font"><strong>Payment Gateway Error</strong> <br/>{report.stripeErrorCode}</p>
            </Col>:null
          }
          {
            (report.stripeSuccessResponse)?
            <Col sm="4">
              <p style={{color: 'green'}} className="report-font"><strong>Payment Gateway Message </strong><br/>Success</p>
            </Col>
            :null
          }
          {
            (report.attempt == report.maxAttemptCount + 1 && !report.stripeSuccess)?
              <Col sm="1">
                <p className="report-font"><strong>Status</strong>&nbsp;<span className="device-status badge-danger"></span><br/>Failure</p>
              </Col>
            :null
          }
          {
            (report.stripeSuccess)?
              <Col sm="1">
                <p className="report-font"><strong>Status</strong>&nbsp;<span className="device-status badge-success"></span><br/>Success</p>
              </Col>
            :null
          }
          {
            (report.attempt < report.maxAttemptCount + 1 && !report.stripeSuccess)?
              <Col sm="1">
                <div className="report-font" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseLeave}>
                  <strong>Status</strong>&nbsp;<span className="device-status badge-warning"></span><br/>Progress
                  {(showHover)?
                    <div id="tooltip" className="right">
                      <div className="tooltip-arrow" />
                      <div className="tooltip-label">Next Retry: {moment(report.nextAttemptDate).tz('America/New_York').format('Y-D-M hh:mm:ss a')} | Attempts Left: {report.maxAttemptCount - (report.attempt -1)}</div>
                    </div>:null
                  }
                </div>
              </Col>
            :null
          }
          <Col sm="1">
            <p className="report-font"><strong>Time</strong> <br/>{moment(report.createdAt).tz('America/New_York').fromNow()}</p>
          </Col>
          {
            (report.reAttemptDetails.length >= 0)?
            <Col sm="1">
              {(isOpen)? <div style={{float: 'right'}}><a onClick={this.toggle}><FaAngleUp/></a></div>:<div style={{float: 'right'}}><a onClick={this.toggle}><FaAngleDown/></a></div>}
            </Col>
            :null
          }
        </Row>
        <Collapse isOpen={isOpen}>
          {
            (report.reAttemptDetails.length >= 0)?
              <Table>
              <thead>
                <tr>
                  <th className="report-font">Attempt</th>
                  <th className="report-font">Payment Gateway Error</th>
                  <th className="report-font">Payometry Error</th>
                  <th className="report-font">Payment Gateway Message</th>
                  {/*<th className="report-font">Payometry Message</th>*/}
                  <th className="report-font">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-font">1 (initial)</td>
                  {
                    (report.stripeErrorCode == 'invalid_expiry_year')?
                    <td className="report-font">{report.stripeErrorCode} ({report.initialYear})</td>
                    :<td className="report-font">{report.stripeErrorCode}</td>
                  }
                  <td className="report-font">{report.responseCodeStatus}</td>
                  <td className="report-font">{report.stripeMessage}</td>
                  {/*<td className="report-font">{report.customerOrSystemAction}</td>*/}
                  <td className="report-font">{moment(report.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss a')}</td>
                </tr>
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
                        <td className="report-font">{(attempt.attemptCount == report.maxAttemptCount) ? <p>{attempt.attemptCount+1}&nbsp;(last attempt)</p>: <p>{attempt.attemptCount+1}</p>}</td>
                        {
                          (stripeError.raw && report.stripeErrorCode == 'invalid_expiry_year')?
                          <td className="report-font">{stripeError.raw.code}&nbsp;{attempt.year}</td>:null
                        }
                        {
                          (stripeError.raw && report.stripeErrorCode !== 'invalid_expiry_year')?
                          <td className="report-font">{stripeError.raw.code}</td>:null
                        }
                        {
                          (stripeError.status == 'succeeded' && report.stripeErrorCode == 'invalid_expiry_year')?
                          <td className="report-font">{attempt.year}</td>: null
                        }
                        <td className="report-font">{(attempt.responseCodeStatus)?attempt.responseCodeStatus: '-' }</td>
                        <td className="report-font">{(stripeError.raw)?stripeError.raw.message: 'Success'}</td>
                        {/*<td className="report-font">{(attempt.stripeSuccess)?`Updated expiry year from ${report.initialYear} to ${attempt.year}`:report.customerOrSystemAction}</td>*/}
                        <td className="report-font">{moment(attempt.createdAt).tz('America/New_York').format('Y-D-M hh:mm:ss a')}</td>
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
