import React, { Component } from 'react';
import styles from './styles.scss';
import DayPicker, {
  DateUtils
} from 'react-day-picker';
import Helmet from 'react-helmet';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class TravelPlan extends Component {
  
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className={styles.planContainer}>
        <div className={styles.planInput}>
          <h1 className={styles.calendarTitle}>여행 일정</h1>
          <p className={styles.calendarRange}>
            {!from && !to && '첫 여행일자를 선택해 주세요.'}
            {from && !to && '마지막 여행일자를 선택해 주세요.'}
            {from &&
              to &&
              `${from.toLocaleDateString()} 부터
                  ${to.toLocaleDateString()}`}{' '}
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
          </p>
          <PlanMaker />
        </div>
        <div className={styles.dayPicker}>
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />
          <Helmet>
            <style>
              {`
                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                  background-color: #f0f8ff !important;
                  color: #4a90e2;
                }
                .Selectable .DayPicker-Day {
                  border-radius: 0 !important;
                }
                .Selectable .DayPicker-Day--start {
                  border-top-left-radius: 50% !important;
                  border-bottom-left-radius: 50% !important;
                }
                .Selectable .DayPicker-Day--end {
                  border-top-right-radius: 50% !important;
                  border-bottom-right-radius: 50% !important;
                }
              `}
            </style>
          </Helmet>
        </div>
      </div>
    );
  }
}


const PlanMaker = props => (
  <div>
    <h1 className={styles.calendarTitle}>계획 하기</h1>
    <Form className={"planMaker-form"}>
      <FormGroup className={"planMaker-formTitle"}>
        <Input type="text" name="title" placeholder="여행의 주제를 적어주세요."/>
      </FormGroup>

      <FormGroup>
        <IncorporationForm />
      </FormGroup>
      
      {/* <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup> */}

      {/* <FormGroup>
        <Label for="exampleFile">여행 계획 업로드</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup> */}

      {/* <Button>Submit</Button> */}
    </Form>
  </div>
);

class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      shareholders: [{ name: '' }],
    };
  }

  // ...

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  }

  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    return (
      <div>
        <h1 className={styles.calendarTitle}>세부 여행 계획</h1>
        <form className={"plan-form"} onSubmit={this.handleSubmit}>
          {this.state.shareholders.map((shareholder, idx) => (
            <div className={styles.planContent}>
              <Input
                type="text"
                placeholder={`여행 계획 #${idx + 1}`}
                value={shareholder.name}
                onChange={this.handleShareholderNameChange(idx)}
                className={"plan-title"}
              />
              <Button type="button" onClick={this.handleRemoveShareholder(idx)} className={"plan-delete"}>X</Button>
            </div>
          ))}
          <Button type="button" onClick={this.handleAddShareholder} className={"plan-add"}>추가</Button>
          {/* <button>Incorporate</button> */}
        </form>
      </div>
    )
  }
}

export default TravelPlan;