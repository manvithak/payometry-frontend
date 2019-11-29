import React, {Component} from 'react';
import {Row, Col, Card, Table, Collapse, Button} from 'reactstrap';
import {getReports} from '../../../api/reports';
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
      limit: 10
    }
  }
  componentWillMount(){
    this.getData('initial')
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

  loadMore = () => {
    this.getData('load');
  }

  refreshData = () => {
    this.getData('refresh');
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
    const {reports, totalRecords, skip, loading} = this.state
    let visibleLen = reports.length;
    return(
      <div>
        <Row>
          <Col sm="4">
            <h3>Reports({visibleLen} / {totalRecords})</h3>
          </Col>
          <Col sm="8">
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
