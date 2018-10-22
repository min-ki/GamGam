import React, { Component } from 'react';
import styles from './styles.scss';
import DayPicker, {
  DateUtils
} from 'react-day-picker';
import Helmet from 'react-helmet';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Select from 'react-select';

const options = [
  { value: '대한민국', label: '대한민국' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


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
      travel_title: undefined,
      travel_region: null,
      detail_travels: [{ name: '' }],
      // selectedOption: null,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleChangeTraveltitle(value) {
    this.setState({
      travel_title: value,
    });
  }

  handleDetailTravelChange = (idx) => (evt) => {
    const new_detail_travels = this.state.detail_travels.map((detail_travel, sidx) => {
      if (idx !== sidx) return detail_travel;
      return { ...detail_travel, name: evt.target.value };
    });

    this.setState({ detail_travels: new_detail_travels });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      from,
      to,
      travel_title,
      travel_region,
      detail_travel
    } = this.state;
    console.log(this.state);
  }

  handleAddShareholder = () => {
    this.setState({
      detail_travels: this.state.detail_travels.concat([{ name: '' }])
    });
  }

  handleRemoveDetailTravelPlan = (idx) => () => {
    this.setState({
      detail_travels: this.state.detail_travels.filter((s, sidx) => idx !== sidx)
    });
  }

  handleTitleChange(value) {
    this.setState({
      title: value
    });
  }

  handleChange = (travel_region) => {
    this.setState({ travel_region });
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { travel_region } = this.state;

    return (
      <div className="plan-container">
        <form className="plan-form" onSubmit={this.handleSubmit}>
          <div className="plan-content">
            <div className="plan-travel-list-wrapper">
              <h1 className="plan-travel-list-title">여행제목</h1>
              <Input 
                className="plan-travel-list-title-input" 
                onChange={e => this.handleChangeTraveltitle(e.target.value)}  
                type="text"
                required
              />
              <p className="plan-travel-list-region">여행국가</p>
               <Select
                className="plan-travel-list-region-select"
                value={travel_region}
                onChange={this.handleChange}
                options={options}
              />

              <div className="plan-travel-list-wrapper">
                <h1 className="plan-travel-list-title">세부 여행 계획</h1>
                <form className="plan-travel-list-form" onSubmit={this.handleSubmit}>
                  <div className="plan-travel-detail">
                    {this.state.detail_travels.map((detail_travel, idx) => (
                      <div className="plan-travel-detail-content">
                        <Input
                          type="text"
                          placeholder={`여행 계획 #${idx + 1}`}
                          value={detail_travel.name}
                          onChange={this.handleDetailTravelChange(idx)}
                          className="plan-travel-detail-title"
                        />
                        <Button type="button" onClick={this.handleRemoveDetailTravelPlan(idx)} className="plan-travel-detail-delete">X</Button>
                      </div>
                    ))}
                  </div>
                </form>
                <Button type="button" onClick={this.handleAddShareholder} className={"plan-add"}>추가</Button>
              </div>
            </div>
          </div>

          <div className="planner">
            <h1 className="planner-title">여행 일정</h1>
            <div className="plan-date-picker">
              <div className="plan-date">
                <p className="plan-date-range">
                  {!from && !to && '첫 여행일자를 선택해 주세요.'}
                  {from && !to && '마지막 여행일자를 선택해 주세요.'}
                  {from && to && `${from.toLocaleDateString()} 부터 ${to.toLocaleDateString()}`}{' '}
                  {from && to && (
                    <button className="link" onClick={this.handleResetClick}>
                      Reset
                    </button>
                  )}
          </p>
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
            </div>
          </div>
          <Button className="plan-maker">여행계획 생성하기</Button>
        </form>
      </div>
    );
  }
}

// class PlanMaker extends Component {
//   static defaultProps = {
//     numberOfMonths: 2,
//   };

//   constructor(props) {
//     super(props);
//     this.handleDayClick = this.handleDayClick.bind(this);
//     this.handleResetClick = this.handleResetClick.bind(this);
//     this.state = this.getInitialState();
//     console.log(this.props);
//   }

//   getInitialState() {
//     return {
//       from: undefined,
//       to: undefined,
//     };
//   }

//   handleDayClick(day) {
//     const range = DateUtils.addDayToRange(day, this.state);
//     console.log(this.props); 
//     console.log(this.state); 
//     this.setState(range);
//   }

//   handleResetClick() {
//     this.setState(this.getInitialState());
//   }

//   handlePlanSubmit() {
//     console.log("계획생성");
//   }

//   handleDate() {
//     this.props.onSelectDate(this.state.from, this.state.to)
//   }

//   render() {
    
//     const { from, to } = this.state;
//     const modifiers = { start: from, end: to };

//     return (
//         <div className="plan-date">
//           <p className="plan-date-range">
//                 {!from && !to && '첫 여행일자를 선택해 주세요.'}
//                 {from && !to && '마지막 여행일자를 선택해 주세요.'}
//                 {from && to && `${from.toLocaleDateString()} 부터 ${to.toLocaleDateString()}`}{' '}
//                 {from && to && (
//                     <button className="link" onClick={this.handleResetClick}>
//                       Reset
//                     </button>
//                   )}
//           </p>
//           <div className={styles.dayPicker}>
//             <DayPicker
//               className="Selectable"
//               numberOfMonths={this.props.numberOfMonths}
//               selectedDays={[from, { from, to }]}
//               modifiers={modifiers}
//               onDayClick={this.handleDayClick}
//             />
//             <Helmet>
//               <style>
//                 {`
//                   .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
//                     background-color: #f0f8ff !important;
//                     color: #4a90e2;
//                   }
//                   .Selectable .DayPicker-Day {
//                     border-radius: 0 !important;
//                   }
//                   .Selectable .DayPicker-Day--start {
//                     border-top-left-radius: 50% !important;
//                     border-bottom-left-radius: 50% !important;
//                   }
//                   .Selectable .DayPicker-Day--end {
//                     border-top-right-radius: 50% !important;
//                     border-bottom-right-radius: 50% !important;
//                   }
//                 `}
//               </style>
//             </Helmet>
//           </div>
//         </div>
//     )
//   }
// }

export default TravelPlan;