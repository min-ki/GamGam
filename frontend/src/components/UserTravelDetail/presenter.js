import React, { Component } from "react";
import { Form, Input, Button } from "reactstrap";
import Select from "react-select";
import styles from "./styles.scss";

  const status_options = [{
      value: '0',
      label: '시작하기'
    },
    {
      value: '1',
      label: '여행하기'
    },
    {
      value: '2',
      label: '추억하기'
    }
];

class UserTravelDetail extends Component {
  // onChange 함수 구현하기
  // 여행 계획 자체를 수정하는 기능
  constructor(props) {
    super(props);
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
      status: this.props.status,
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

  onChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const user_token = localStorage.getItem("jwt");

    const { from, to, status, travel_region, travel_plan, tags } = this.state;

    let start_at, end_at;

    if (!from && !to) {
      console.log("fail!");
    } else {
      start_at = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`; // 여행 시작일자
      end_at = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`; // 여행 종료일자
    }

    fetch(`/travel/${this.props.travel.id}/`, {
      method: "put",
      headers: {
        Authorization: `JWT ${user_token}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title: this.props.travel.title,
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

  handleStatusChange = (status) => {
    this.setState({
      status
    });
    console.log(`Option selected:`, status);
  }

  render() {
    if (this.props.loading) {
      return <div> Loading... </div>;
    } else if (this.props.travel) {
      return (
        <div className="user-travel-detail_wrapper">
          <Form onSubmit={this.handleSubmit}>
            <Input type="text" value={this.props.travel.title} />{" "}
            <Input type="text" value={this.props.travel.travel_region} />{" "}
            <Input type="text" value={this.props.travel.start_at} />{" "}
            <Input type="text" value={this.props.travel.end_at} />{" "}
            <Input type="file" />
            <Select
              type="select"
              name="status"
              id="statusSelect"
              value={this.state.status}
              onChange={this.handleStatusChange}
              options={status_options}
            >
              {/* <option value="0"> 시작하기 </option>{" "} */}
              {/* <option value="1"> 여행 중 </option>{" "} */}
              {/* <option value="2"> 추억하기 </option>{" "} */}
            </Select>
            <Button className="user-travel-detail_button"> 수정하기 </Button>{" "}
          </Form>{" "}
        </div>
      );
    }
  }
}

export default UserTravelDetail;
