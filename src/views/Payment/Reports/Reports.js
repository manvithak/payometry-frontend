import React, {Component} from 'react';
import {Row, Col, Card, Table, Collapse, Button, Input} from 'reactstrap';
import {getReports, getReportsCount} from '../../../api/reports';
import ListItems from './ListItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Reports extends Component {
  constructor(){
    super()
    this.state = {
      reports: [],
      totalRecords: 0,
      skip: 0,
      limit: 10,
      complete: 0,
      success: 0,
      failure: 0,
      stripe: 0
    }
  }
  componentWillMount(){
    this.getData('initial')
    this.reportsCount()
  }

  getData = (action) => {
    let {skip, limit} = this.state
    let pagData = {
      skip: skip,
      limit: limit
    }
    let reports = this.state.reports
    if(action == 'refresh'){
      this.setState({
        skip: 0
      })
      pagData.skip = 0
      skip = 0
      reports = []
    }
    getReports({}, pagData, (err, response) => {
      if(err){
        console.log(err)
      }else{
        console.log(response)
        if(action == 'refresh'){
          this.checkAllSync(response.data.data)
        }
        this.setState({
          reports: reports.concat(response.data.data),
          totalRecords: response.data.count,
          skip: skip + 10,
        })
      }
    })
  }

  reportsCount = () => {
    getReportsCount({}, (err, response) => {
      if(err){
        console.log(response)
      }else{
        this.setState({
          complete: response.data.complete,
          success: response.data.success,
          failure: response.data.failure,
          stripe: response.data.stripe
        })
      }
    })
  }

  loadMore = () => {
    this.getData('load');
    this.reportsCount()
  }

  refreshData = () => {
    this.getData('refresh');
    this.reportsCount()
  }

  checkAllSync = (reports) => {
    let syncArray = reports.filter(report => {
      return (report.attempt - 1) != report.maxAttemptCount
    })
    console.log(syncArray.length)
    if(syncArray.length === 0){
      toast.success("No More Records", {containerId: 'A'});
    }else{
      toast.success("Data Fetched", {containerId: 'A'});
    }
  }

  render(){
    const {reports, totalRecords, skip, loading, complete, success, failure, stripe} = this.state
    const progress = totalRecords - (complete)
    let visibleLen = reports.length;
    return(
      <div>
        <div style={{marginTop: -65, position: 'absolute', right:30}}>
          <Input type="search" placeholder="search"/>
        </div>
        <Row style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
          <Col sm="2">
            <h3>Reports({visibleLen} / {totalRecords})</h3>
          </Col>
          <Col sm="1">
            <p><strong>Completed:</strong>&nbsp;<span className="transac-count badge-danger">{complete}</span></p>
          </Col>
          <Col sm="2">
            <p><strong>In Progress:</strong>&nbsp;<span className="transac-count badge-danger">{progress}</span></p>
          </Col>
          <Col sm="1">
            <p><strong>Failed:</strong>&nbsp;<span className="transac-count badge-danger">{failure}</span></p>
          </Col>
          <Col sm="3">
            <p><strong>Payment Gateway Success:</strong>&nbsp;<span className="transac-count badge-danger">{stripe}</span></p>
          </Col>
          <Col sm="2">
            <p><strong>Payometry Success:</strong>&nbsp;<span className="transac-count badge-danger">{success - stripe}</span></p>
          </Col>
          <Col sm="1">
            <div style={{float: 'right'}}>
              <Button active color="success" onClick={this.refreshData}>Refresh</Button>
            </div>
          </Col>
        </Row>
        {
          reports.map((report, index) => <ListItems key={index} report={report}/>)
        }
        <br/>
        {
          (totalRecords > 10 && skip < totalRecords)?
          <div style={{textAlign: 'center', marginBottom: 10}}>
            <Button active color="success" onClick={this.loadMore}>Load More</Button>
          </div>
          :null
        }
        {
          (skip > totalRecords && totalRecords > 10)?<div style={{textAlign: 'center'}}>
            <p>No More Records</p>
          </div>:null
        }
        <ToastContainer autoClose={2000} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT}/>
      </div>
    )
  }
}

export default Reports;
