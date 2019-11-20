import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import {getQuestions, saveAnswers, getAnswers, updateAnswers} from '../../../api/question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      apiAnswers: [],
      answers: new Array(5).fill(''),
      user: 'New',
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
    oldItems[index] = value
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
    if(user == 'New') {
      saveAnswers(data, {}, (err, response) => {
        if(err) {
          console.log(err)
        }
        else{
          console.log('merchant response saved successfully')
          this.setState({
            answers: new Array(5).fill('')
          })
          this.notify()
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
            answers: new Array(5).fill('')
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
    let answers = new Array(5).fill('')
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
              <option>New</option>
              {
                apiAnswers.map((answer, index) => <option key={index}>{answer.merchantId}</option>)
              }
            </Input>
          </Col>
        </Row>
        <br />
        <h3>Preferences</h3>
        <Form>
        {
          questions.map((question, index) => {
            qindex = 'q' + index
            return(
              <Row key={qindex}>
                <Col xs="8">
                  <FormGroup>
                    <Label htmlFor={qindex}>{question.question}</Label>
                    {(question.type=='number') ? <Input type="number" name={qindex} id={qindex} value={answers[index]} onChange={(e)=>this.handleChange(e, index)}/>: null}
                    {(question.type=='dropdown' && question.answerType!='boolean')?
                      <Input type="select" name={qindex} id={qindex} value={answers[index]} onChange={(e)=>this.handleChange(e, index)}>
                        {
                          question.options.map((opt, index1) => <option key={index1}>{opt}</option>)
                        }
                      </Input>: null
                    }
                    {(question.type=='dropdown' && question.answerType=='boolean') ?
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
                  </FormGroup>
                </Col>
              </Row>
            )
          })
        }
        <Row>
          <Col xs="6">
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

