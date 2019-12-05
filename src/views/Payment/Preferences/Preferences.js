import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import {getQuestions, saveAnswers, getAnswers, updateAnswers} from '../../../api/question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const countDecimals = (value) => {
  var char_array = value.toString().split(""); // split every single char
  var not_decimal = char_array.lastIndexOf(".");
  return (not_decimal<0)?0:char_array.length - not_decimal;
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      apiAnswers: [],
      answers: new Array(6).fill(''),
      user: 'Add New',
      currentUser: []
    };
  }

  componentWillMount() {
    this.getData()
  }

  getData = () => {
    getQuestions({}, (err, response) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(response)
        this.setState({
          questions: response.data.data
        })
      }
    })
    getAnswers({}, (err, response) => {
      if(err){
        console.log(err)
      }else{
        console.log(response)
        this.setState({
          apiAnswers: response.data.data
        })
      }
    })
  }

  handleChange = (e, index) => {
    let {value, name, type} = e.target;
    let oldItems = this.state.answers
    if(index == 0){
      if(countDecimals(value) > 3){

      }
      else{
        if(!isNaN(value))
        oldItems[index] = value
      }
    }
    else if(index == 3){
      if(!isNaN(value) && countDecimals(value) == 0)
      oldItems[index] = value
    }
    else{
      oldItems[index] = value
    }

    this.setState({
        answers: oldItems
    })
    /*console.log(value)
    this.setState(prevState => ({
      arrayvar: [...prevState.answers, [prevState.answers[index]]: value]
    }));*/
  }

  onSubmit = () => {
    const {answers, questions, user} = this.state
    console.log(answers)
    let answersToSave = questions.map((question, index) => {
      let obj = {}
      obj.id = question._id
      obj.answer = answers[index]
      return obj;
    })
    let data = {
      answers: answersToSave
    }
    if(user == 'Add New') {
      saveAnswers(data, {}, (err, response) => {
        if(err) {
          console.log(err)
        }
        else{
          console.log('merchant response saved successfully')
          this.setState({
            answers: new Array(6).fill('')
          })
          this.notify()
          this.getData()
        }
      })
    }else{
      data.id = user
      updateAnswers(user, data, {}, (err,response) => {
        if(err){
          console.log(err)
        }
        else{
          console.log('merchant response saved successfully')
          this.setState({
            answers: new Array(6).fill('')
          })
          this.notify()
        }
      })
    }
  }

  userChange = (e) => {
    let user = e.target.value
    const {apiAnswers} = this.state
    let list = apiAnswers.filter(item => item.merchantId == e.target.value);
    let answers = new Array(6).fill('')
    if(list.length > 0){
      answers = list[0].answers.map(answer => answer.answer)
    }
    this.setState({
      user: e.target.value,
      answers: answers
    })
  }

  notify = () => {
    toast.success("Merchant response saved successfully !", {containerId: 'A'});
  }

  render() {
    const {questions, answers, user, apiAnswers} = this.state;
    let qindex = ''
    return (
      <div>
        <Row>
          <Col xs="8">
            <h3>Users</h3>
            <Input type="select" name="user" id="user" value={user} onChange={(e) => this.userChange(e)}>
              <option>Add New</option>
              {
                apiAnswers.map((answer, index) => <option key={index}>{answer.merchantId}</option>)
              }
            </Input>
          </Col>
        </Row>
        <br />
        <h3>Operational Data</h3>
        <Form>
        {
          questions.map((question, index) => {
            qindex = 'q' + index
            return(
              <Row key={qindex}>
                <Col xs="8">
                  <FormGroup>
                    {(index!=5)? <Label htmlFor={qindex}>{question.question}</Label> : null}
                    {(question.type=='number' && index == 0) ?
                      <div>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name={qindex} min='0' id={qindex} value={answers[index]} onChange={(e)=>this.handleChange(e, index)}/>
                        </InputGroup>
                      </div>
                      :null
                    }
                    {(question.type=='number' && index != 0) ? <Input type="text"  name={qindex} min='0' id={qindex} value={answers[index]} onChange={(e)=>this.handleChange(e, index)}/>: null}
                    {(question.type=='dropdown' && question.answerType!='boolean')?
                      <Input type="select" name={qindex} id={qindex} value={answers[index]} onChange={(e)=>this.handleChange(e, index)}>
                        {
                          question.options.map((opt, index1) => <option key={index1}>{opt}</option>)
                        }
                      </Input>: null
                    }
                    {(question.type=='dropdown' && question.answerType=='boolean' && index != 5) ?
                      <Row>
                        <Col xs="4">
                          <FormGroup style={{marginLeft: 20}}>
                            <Input type="radio" name={qindex} value="yes" onChange={(e)=>this.handleChange(e, index)}/>{' '}Yes
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Input type="radio" name={qindex} value="no" onChange={(e)=>this.handleChange(e, index)}/>{' '}No
                          </FormGroup>
                        </Col>
                      </Row> :null
                    }
                    {
                      (question.type=='dropdown' && question.answerType=='boolean' && this.state.answers[4] == 'yes' && index == 5)?
                      <div>
                        <Label htmlFor={qindex}>{question.question}</Label>
                        <Row>
                          <Col xs="4">
                            <FormGroup style={{marginLeft: 20}}>
                              <Input type="radio" name={qindex} value="yes" onChange={(e)=>this.handleChange(e, index)}/>{' '}Yes
                            </FormGroup>
                          </Col>
                          <Col xs="4">
                            <FormGroup>
                              <Input type="radio" name={qindex} value="no" onChange={(e)=>this.handleChange(e, index)}/>{' '}No
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      : null
                    }
                  </FormGroup>
                </Col>
              </Row>
            )
          })
        }
        <Row>
          <Col xs="2">
            <Button active block color="success" onClick={this.onSubmit}>Proceed</Button>
          </Col>
        </Row>
        </Form>
        <ToastContainer autoClose={4000} enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT}/>
        <br />
      </div>
    );
  }
}

export default Questions;

