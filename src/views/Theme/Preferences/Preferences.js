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
import {getQuestions, saveAnswers} from '../../../api/question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: []
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
  }

  handleChange = (e, index) => {
    let {value, name, type} = e.target;
    /*let oldItems = this.state.answers
    oldItems[index] = value
    this.setState({
        answers: oldItems
    })*/

    this.setState(prevState => ({
      answers: {
          ...prevState.answers,
          [prevState.answers[index]]: value
      }
    }));
  }

  onSubmit = () => {
    const {answers, questions} = this.state
    let obj = {}
    let answersToSave = questions.map((question, index) => {
      obj.id = question._id
      obj.answer = answers[index]
      return obj;
    })
    let data = {
      answers: answersToSave
    }
    saveAnswers(data, {}, (err, response) => {
      if(err) {
        console.log(err)
      }
      else{
        console.log('merchant response saved successfully')
        this.notify()
      }
    })
  }

  notify = () => {
    toast.success("Merchant response saved successfully !", {containerId: 'A'});
  }

  render() {
    const {questions, answers} = this.state;
    let qindex = ''
    return (
      <div>
        <h2>Preferences</h2>
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
                        <Col xs="2">
                          <FormGroup style={{marginLeft: 20}}>
                            <Input type="radio" name={qindex} value="yes" onChange={(e)=>this.handleChange(e, index)}/>{' '}Yes
                          </FormGroup>
                        </Col>
                        <Col xs="2">
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

