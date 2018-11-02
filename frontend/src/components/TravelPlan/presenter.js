// library
import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import { Button, Label, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import Textarea from "react-textarea-autosize";

// local
import { nations } from "./nation";

// style
import styles from "./styles.scss";

class TravelPlan extends Component {
  
  static defaultProps = {
    numberOfMonths: 2
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      travel_title: null,
      travel_owner: null,
      travel_region: null,
      travel_city: null,
      tags: [],
      data: null,
      travel_plan: [
        {
          name: "",
          region: "",
          content: "",
          price: null,
          travel: null,
          travel_day: null
        }
      ]
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    if (this.state.from && this.state.to) {
      this.calcDayBetweenRange(this.state.from, this.state.to);
    }
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleChangeTraveltitle(value) {
    this.setState({
      travel_title: value
    });
  }

  handleDetailTravelChange = idx => evt => {
    const new_detail_travels = this.state.detail_travels.map(
      (detail_travel, sidx) => {
        if (idx !== sidx) return detail_travel;
        return { ...detail_travel, name: evt.target.value };
      }
    );

    this.setState({ detail_travels: new_detail_travels });
  };

  handleRegionChange = travel_region => {
    this.setState({ travel_region });
  };

  handleCitysChange = travel_city => {
    this.setState({ travel_city });
  };

  handlePriceChange = evt => {
    this.setState({ price: evt.target.value });
  };
  handleTagsChange = tags => {
    let tag = tags.target.value.split(",");
    this.setState({ tags: tag });
  };

  handleTravelPlans = data => {

    console.log(data);

    // travel_plan이라는 데이터에 값을 저장
    this.setState({ 
      travel_plan: data
    });

    console.log(this.state.travel_plan);
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const user_token = localStorage.getItem("jwt");

    const { from, to, travel_title, travel_region, travel_plan, tags } = this.state;

    let start_at, end_at;

    if(!from && !to) {
      console.log("fail!");
    } else {
      start_at = `${from.getFullYear()}-${from.getMonth()+1}-${from.getDate()}`; // 여행 시작일자
      end_at = `${to.getFullYear()}-${to.getMonth()+1}-${to.getDate()}`; // 여행 종료일자
    }

    // if(travel_region)
    // travel_plan['travel'] = 100;
    // travel_plan['travel_day'] = "2018-10-13";

    // todo: title
    // todo: status : "시작하기"
    // todo: owner : { username }
    // todo: price
    // todo: travel_plan
    // todo: travel_region.label
    // todo: tags
    // todo: start_at
    // todo: end_at

    // const travel_plan = [
    //   {
    //     title: "한식여행",
    //     content: "된장찌개, 김치찌개",
    //     price: "1000",
    //     travel: "111",
    //     travel_day: "2018-9-13"
    //   }
    // ];
    
    fetch("/travel/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${user_token}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title: travel_title,
        status: "시작하기",
        price: 0,
        travel_region: travel_region.label,
        tags,
        start_at,
        end_at,
        travel_plan
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));

    this.props.history.push("/travel");
  };

  calcDayBetweenRange = (from, to) => {
    var oneDay = 24 * 60 * 60 * 1000;

    var diffDays = Math.round(Math.abs((to - from) / oneDay));
    return diffDays + 1;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const { travel_region, price, travel_plan } = this.state;

    return (
      <div className="plan-container">
        <div className="plan-description">여행을 계획하세요.</div>

        <form className="plan-form" onSubmit={this.handleSubmit}>
          <div className="planner">
            <h1 className="planner-title">여행 일정</h1>
            <div className="plan-date-picker">
              <div className="plan-date">
                <p className="plan-date-range">
                  {!from && !to && "첫 여행일자를 선택해 주세요."}
                  {from && !to && "마지막 여행일자를 선택해 주세요."}
                  {from &&
                    to &&
                    `${from.toLocaleDateString()} 부터 ${to.toLocaleDateString()}`}{" "}
                  {from &&
                    to && (
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
                </div>
              </div>
            </div>
          </div>

          <div className="plan-content">
            <div className="plan-travel-list-wrapper">
              <h1 className="plan-travel-list-title">여행 제목</h1>
              <Input
                className="plan-travel-list-title-input"
                onChange={e => this.handleChangeTraveltitle(e.target.value)}
                placeholder="여행제목을 입력해주세요."
                value={this.state.title}
                type="text"
                required
              />
              {/* <FormGroup>
                <h1 className="plan-travel-list-title">대표 이미지</h1>
                <Input
                  type="file"
                  name="file"
                  className="plan-travel-list-title-input"
                />
              </FormGroup> */}
              <p className="plan-travel-list-region">여행 국가</p>
              <Select
                className="plan-travel-list-region-select"
                value={travel_region}
                onChange={this.handleRegionChange}
                options={nations}
                required
              />
              {/* {travel_region ? (
                <Select
                  className="plan-travel-list-region-select"
                  value={travel_city}
                  onChange={this.handleCitysChange}
                  options={citys.travel_region}
                  isClearable={false}
                />
              ) : null} */}

              <FormGroup>
                <h1 className="plan-travel-list-title">예상 비용</h1>
                <Input
                  type="text"
                  name="tags"
                  placeholder="예상비용을 입력해 주세요."
                  value={price}
                  onChange={this.handlePriceChange}
                  className="plan-travel-list-title-input"
                />
              </FormGroup>
              <FormGroup>
                <h1 className="plan-travel-list-title">키워드</h1>
                <Input
                  type="text"
                  name="tags"
                  placeholder="콤마로 구분하여 입력해주세요."
                  onChange={this.handleTagsChange}
                  className="plan-travel-list-title-input"
                />
              </FormGroup>

              {/* <TravelDetailPlan
                travel_plan={travel_plan}
                handleTravelPlans={this.handleTravelPlans}
              /> */}
            </div>
            <div className="plan-travel-list-submit">
             <Button className="plan-travel-list__button">여행계획 생성하기</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class TravelDetailPlan extends Component {
  state = {
    detail_travels: [
      {
        title: "",
        region: "",
        content: "",
        price: null,
        travel_day: null,
        selectedDays: null,
        travel: 158
      }
    ],
  };

  // 여행일자 선택
  handleDayClick = idx => (day, { selected }) => {
    
    const new_detail_travels = this.state.detail_travels.map(
      (detail_travel, sidx) => {
        if (idx !== sidx) return detail_travel;
        return { ...detail_travel,
          travel_day: selected ? undefined : `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`,
          selectedDays: selected ? undefined : day
        };
      }
    );

    this.setState({ detail_travels: new_detail_travels });
  };

  handleChange = idx => evt => {
    let new_detail_travels = this.state.detail_travels.map(
      (detail_travel, sidx) => {
        if (idx !== sidx) return detail_travel;
        console.log(evt.target.name, evt.target.value);
        return { ...detail_travel, [evt.target.name]: evt.target.value };
      }
    );
     
    new_detail_travels['travel_day'] = this.state.travel_day;

    this.props.handleTravelPlans(this.state.detail_travels);

    this.setState({ detail_travels: new_detail_travels });
  }

  handleAddTravelDetailPlan = () => {
    this.setState({
      detail_travels: this.state.detail_travels.concat([
        {
          title: "",
          region: "",
          content: "",
          price: null,
          travel_day: null,
          selectedDays: null,
          travel: 158
        }
      ])
    });
  };

  handleRemoveDetailTravelPlan = idx => () => {
    this.setState({
      detail_travels: this.state.detail_travels.filter(
        (s, sidx) => idx !== sidx
      )
    });
  };

  handleSubmit = idx => evt => {
    evt.preventDefault();
    // const user_token = localStorage.getItem("jwt");
    const { detail_travels } = this.state;
    console.log(detail_travels);
  };

  render() {
    return <div className="plan-travel-list-wrapper">
        <h1 className="plan-travel-list-title">세부 여행 계획</h1>
        <form className="plan-travel-list-form" onSubmit={this.handleSubmit}>
          <div className="plan-travel-detail">
            {this.state.detail_travels.map((detail_travel, idx) => (
              <div className="plan-travel-detail-content">
                <h1 className="plan-travel-detail__title">
                  #{idx + 1} 세부 여행 계획 
                </h1>
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_title"
                  >
                    여행 제목
                  </Label>
                  <Input
                    id="travel_title"
                    type="text"
                    name="title"
                    placeholder="여행 제목"
                    value={detail_travel.name}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 지역
                  </Label>
                  <Input
                    id="travel_region"
                    type="text"
                    name="region"
                    placeholder="여행 지역"
                    value={detail_travel.region}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 일자
                  </Label>
                  <div className="plan-travel-detail__daypicker">
                    <h1 className="plan-travel-detail__selectday">
                      {detail_travel.selectedDays
                        ? detail_travel.selectedDays.toLocaleDateString()
                        : "여행일자를 선택해 주세요. 👻"}
                    </h1>
                    <DayPicker
                      selectedDays={detail_travel.selectedDays}
                      onDayClick={this.handleDayClick(idx)}
                      />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 계획
                  </Label>
                  <Textarea
                    id="travel_region"
                    type="text"
                    name="content"
                    placeholder="여행 계획"
                    value={detail_travel.content}
                    onChange={this.handleChange(idx)}
                    className="form-control plan-travel-detail-title detail-content"
                  />
                </FormGroup>
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_price"
                  >
                    여행 비용
                  </Label>
                  <Input
                    id="travel_price"
                    type="text"
                    name="price"
                    placeholder="여행 비용"
                    value={detail_travel.price}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>
                {/* <Button
                  type="button"
                  onClick={this.handleSubmit(idx)}
                  className="plan-travel-detail-delete detail-content"
                >
                  출
                </Button> */}
                <div className="plan-travel-detail__button">
                  <Button type="button" onClick={this.handleRemoveDetailTravelPlan(idx)} className="plan-travel-detail-delete detail-content"> X </Button>
                </div>
              </div>
            ))}
          </div>
        </form>
        <Button type="button" onClick={this.handleAddTravelDetailPlan} className={"plan-add"}>
          추가
        </Button>
      </div>;
  }
}

export default withRouter(TravelPlan);
