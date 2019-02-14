import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import Textarea from "react-textarea-autosize";
import Select from "react-select";

import styles from "./styles.scss";

import { nations } from "components/TravelPlan/nation";

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"];

const status_options = [
  {
    value: "0",
    label: "시작하기"
  },
  {
    value: "1",
    label: "여행하기"
  },
  {
    value: "2",
    label: "추억하기"
  }
];

class UserTravelDetail extends Component {
  // onChange 함수 구현하기
  // 여행 계획 자체를 수정하는 기능

  
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  check_status(status) {
    if (status === "시작하기") return "0";
    else if (status === "여행하기") return "1";
    else if (status === "추억하기") return "2";
  }

  id = 0;

  getInitialState() {
    return {
      input: "",
      todos: [],
      color: "#343a40",

      from: null,
      to: null,
      travel_title: null,
      travel_owner: null,
      travel_region: null,
      travel_city: null,
      main_image: null,
      status: {
        value: this.check_status(this.props.status),
        label: this.props.status
      },
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.travel_title !== nextState.travel_title) {
  //     return true;
  //   }
  //   if (this.state.status !== nextState.status) {
  //     return true;
  //   }
  //   if (this.state.tags !== nextState.tags) {
  //     return true;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      travel_title: nextProps.travel.title ,
      tags: nextProps.travel.tags,
      start_at: nextProps.travel.start_at,
      end_at: nextProps.travel.end_at
    })
  }

  componentDidMount() {
    const { TravelId } = this.props;
    const token = localStorage.getItem("jwt");

    fetch(`/travel/${TravelId}/todo/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => response.json())
      .then(json =>
        this.setState({
          todos: json
        })
      );
  }

  onChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleRegionChange = travel_region => {
    this.setState({
      travel_region
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const user_token = localStorage.getItem("jwt");

    const { from, to, status, travel_region, travel_plan, tags, main_image } = this.state;

    let start_at, end_at;

    if (!from && !to) {
      console.log("fail!");
    } else {
      start_at = `${from.getFullYear()}-${from.getMonth() +
        1}-${from.getDate()}`; // 여행 시작일자
      end_at = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`; // 여행 종료일자
    }

    fetch(`/travel/${this.props.travel.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${user_token}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title: this.state.travel_title,
        status: status.value,
        price: 0,
        travel_region: travel_region,
        tags,
        start_at,
        end_at,
        travel_plan
      })
    }).then(response => console.log(response));

    this.props.history.push("/travel");
  };

  handleStatusChange = status => {
    this.setState({
      status
    });
  };

  handleChange = e => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos, color } = this.state;
    // this.setState({
    //   input: "", // 인풋 비우고
    //   // concat 을 사용하여 배열에 추가
    //   todos: todos.concat({
    //     id: this.id++,
    //     text: input,
    //     checked: false,
    //     color
    //   })
    // });

    const { TravelId } = this.props;
    const token = localStorage.getItem("jwt");

    fetch(`/travel/${TravelId}/todo/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: input,
        checked: false
      })
    })
      .then(response => response.json())
      .then(json =>
        this.setState({
          input: "", // 인풋 비우고
          todos: todos.concat({
            id: json.id,
            text: json.text,
            checked: json.checked,
            color
          })
        })
      );
  };

  handleKeyPress = e => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleToggle = id => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    const { TravelId } = this.props;
    const token = localStorage.getItem("jwt");

    fetch(`/travel/${TravelId}/todo/${selected.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: selected.id,
        checked: !selected.checked
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));

    this.setState({ todos: nextTodos });
  };

  handleRemove = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const { TravelId } = this.props;
    const token = localStorage.getItem("jwt");

    fetch(`/travel/${TravelId}/todo/${selected.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => console.log(response));

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  };

  handleSelectColor = color => {
    this.setState({
      color
    });
  };

  handleSelectedFile = e => {
    this.setState({
      main_image: e.target.files[0]
    })
  }

  handleFileSubmit = e => {
     
    e.preventDefault();

    const {
      TravelId
    } = this.props;

     const token = localStorage.getItem("jwt");

    let formData = new FormData();
    formData.append('main_image', this.state.main_image);

    fetch(`/travel/${TravelId}/upload/`, {
      method: "PUT",
      headers: {
        'Authorization': `JWT ${token}`,
      },
      body: formData,
    }).then(response => console.log(response));

  }

  // 제목 변경
  handleChangeTraveltitle = evt => {
    this.setState({
      travel_title: evt.target.value
    });
  }

  render() {
    const {
      input,
      todos,
      color
    } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    console.log(this.state);

    if (this.props.loading) {
      return <div> Loading... </div>;
    } else if (this.props.travel) {
      return (
        <div className="user-travel-detail_wrapper">
          <Form
            className="user-travel-detail__form"
            onSubmit={this.handleSubmit}
            enctype="multipart/form-data"
          >
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">제목</Label>
              <Input 
                type="text" 
                value={this.state.travel_title}
                onChange={this.handleChangeTraveltitle}
              />
            </div>
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">여행지역</Label>
              <Input type="text" value={this.props.travel.travel_region} />{" "}
            </div>
            {/* <Select
              value={this.state.travel_region}
              onChange={this.handleRegionChange}
              options={nations}
            /> */}
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">시작일자</Label>
              <Input type="text" value={this.props.travel.start_at} />{" "}
            </div>
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">종료일자</Label>
              <Input type="text" value={this.props.travel.end_at} />{" "}
            </div>
            
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">메인 이미지</Label>
              <div className="user_travel-detail__file">
                <input 
                  type="file" 
                  onChange={this.handleSelectedFile} 
                />
                <span onClick={this.handleFileSubmit}>제출</span>
              </div>

            </div>

            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">여행 키워드</Label>
              <Input type="text"
              value = {
                this.props.travel.tags ? this.props.travel.tags : null
              }
              />
            </div>
            
            <div className="user-travel-form__wrapper">
              <Label className="user-travel-detail__label">여행 상태</Label>
              <Select
                type="select"
                name="status"
                id="statusSelect"
                value={this.state.status}
                onChange={this.handleStatusChange}
                options={status_options}
              />
            </div>
            

            <TravelDetailPlan travel_plan={this.props.travel.travel_plan} />
            <Button onClick={this.handleSubmit} className="user-travel-detail_button"> 수정하기 </Button>
          </Form>

          <TodoListTemplate
            form={
              <Form_todo
                value={input}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                onCreate={handleCreate}
                color={color}
              />
            }
            palette={
              <Palette
                colors={colors}
                selected={color}
                onSelect={handleSelectColor}
              />
            }
          >
            <TodoItemList
              todos={todos}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          </TodoListTemplate>
        </div>
      );
    }
  }
}

class TodoItemList extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.todos !== nextProps.todos;
  // }

  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(({ id, text, checked, color }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        color={color}
        onToggle={onToggle}
        onRemove={onRemove}
        key={id}
      />
    ));

    return <div>{todoList}</div>;
  }
}

const TodoListTemplate = ({ form, palette, children }) => {
  return (
    <main className="todo-list-template">
      <div className="title">체크리스트</div>
      <section className="palette-wrapper">{palette}</section>
      <section className="form-wrapper">{form}</section>
      <section className="todos-wrapper">{children}</section>
    </main>
  );
};

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, id, color, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div style={{ color }} className={`todo-text ${checked && "checked"}`}>
          <div>{text}</div>
        </div>
        {checked && <div className="check-mark">&#x2713;</div>}
      </div>
    );
  }
}

const Color = ({ color, active, onClick }) => {
  return (
    <div
      className={`color ${active && "active"}`}
      style={{ background: color }}
      onClick={onClick}
    />
  );
};

const Palette = ({ colors, selected, onSelect }) => {
  const colorList = colors.map(color => (
    <Color
      color={color}
      active={selected === color}
      onClick={() => onSelect(color)}
      key={color}
    />
  ));
  return <div className="palette">{colorList}</div>;
};

const Form_todo = ({ value, onChange, onCreate, onKeyPress, color }) => {
  return (
    <div className="form">
      <input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        style={{ color }}
      />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

class TravelDetailPlan extends Component {

  constructor(props) {
    super(props);
  }
  
  state = {
    detail_travels: [
      {
        title: "",
        content: "",
        price: null,
        travel_day: null,
        travel_region: null,
        selectedDays: null
      }
    ]
  };

  // 여행일자 선택
  handleDayClick = idx => (day, { selected }) => {
    const new_detail_travels = this.state.detail_travels.map(
      (detail_travel, sidx) => {
        if (idx !== sidx) return detail_travel;
        return {
          ...detail_travel,
          travel_day: selected
            ? undefined
            : `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`,
          selectedDays: selected ? undefined : day
        };
      }
    );

    this.setState({
      detail_travels: new_detail_travels
    });
  };

  handleChange = idx => evt => {
    let new_detail_travels = this.state.detail_travels.map(
      (detail_travel, sidx) => {
        if (idx !== sidx) return detail_travel;
        return { ...detail_travel, [evt.target.name]: evt.target.value };
      }
    );

    new_detail_travels["travel_day"] = this.state.travel_day;

    this.props.handleTravelPlans(this.state.detail_travels);

    this.setState({
      detail_travels: new_detail_travels
    });
  };

  handleAddTravelDetailPlan = () => {
    this.setState({
      detail_travels: this.state.detail_travels.concat([
        {
          title: "",
          region: "",
          content: "",
          price: null,
          travel_day: null,
          travel_region: null,
          selectedDays: null
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

  // 부모로부터 받은 Props를 State에 저장할때 사용하는 라이프사이클 메소드
  componentWillReceiveProps(nextProps) {
    this.setState({
      detail_travels : nextProps.travel_plan
    });
  }

  render() {
    return (
      <div className="plan-travel-list-wrapper">
        <h1 className="plan-travel-list-title"> 세부 여행 계획 </h1>{" "}
        <form className="plan-travel-list-form" onSubmit={this.handleSubmit}>
          <div className="plan-travel-detail">
            {" "}
            {this.state.detail_travels ? this.state.detail_travels.map((detail_travel, idx) => (
              <div className="plan-travel-detail-content">
                <h1 className="plan-travel-detail__title">
                  {" "}
                  #{idx + 1}
                  세부 여행 계획{" "}
                </h1>{" "}
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_title"
                  >
                    여행 제목{" "}
                  </Label>{" "}
                  <Input
                    id="travel_title"
                    type="text"
                    name="title"
                    placeholder="여행 제목"
                    value={detail_travel.title}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>{" "}
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 지역{" "}
                  </Label>{" "}
                  <Input
                    id="travel_region"
                    type="text"
                    name="travel_region"
                    placeholder="여행 지역"
                    value={detail_travel.travel_region}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>{" "}
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 일자{" "}
                  </Label>{" "}
                  <div className="plan-travel-detail__daypicker">
                    <h1 className="plan-travel-detail__selectday">
                      {" "}
                      {detail_travel.selectedDays
                        ? detail_travel.selectedDays.toLocaleDateString()
                        : "여행일자를 선택해 주세요. 👻"}{" "}
                    </h1>{" "}
                    <DayPicker
                      selectedDays={detail_travel.selectedDays}
                      onDayClick={this.handleDayClick(idx)}
                    />{" "}
                  </div>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_region"
                  >
                    여행 계획{" "}
                  </Label>{" "}
                  <Textarea
                    id="travel_region"
                    type="text"
                    name="content"
                    placeholder="여행 계획"
                    value={detail_travel.content}
                    onChange={this.handleChange(idx)}
                    className="form-control plan-travel-detail-title detail-content"
                  />
                </FormGroup>{" "}
                <FormGroup>
                  <Label
                    className="plan-travel-detail__label"
                    for="travel_price"
                  >
                    여행 비용{" "}
                  </Label>{" "}
                  <Input
                    id="travel_price"
                    type="text"
                    name="price"
                    placeholder="여행 비용"
                    value={detail_travel.price}
                    onChange={this.handleChange(idx)}
                    className="plan-travel-detail-title detail-content"
                  />
                </FormGroup>{" "}
                {/* <Button
                              type="button"
                              onClick={this.handleSubmit(idx)}
                              className="plan-travel-detail-delete detail-content"
                            >
                              출
                            </Button> */}{" "}
                <div className="plan-travel-detail__button">
                  <Button
                    type="button"
                    onClick={this.handleRemoveDetailTravelPlan(idx)}
                    className="plan-travel-detail-delete detail-content"
                  >
                    {" "}
                    X{" "}
                  </Button>{" "}
                </div>{" "}
              </div>
            )) : null}{" "}
          </div>{" "}
        </form>{" "}
        <Button
          type="button"
          onClick={this.handleAddTravelDetailPlan}
          className={"plan-add"}
        >
          추가{" "}
        </Button>{" "}
      </div>
    );
  }
}
export default UserTravelDetail;
