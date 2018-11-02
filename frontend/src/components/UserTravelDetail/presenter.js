import React, { Component } from "react";
import { Form, Input, Button } from 'reactstrap';
import styles from './styles.scss';

class UserTravelDetail extends Component {
  
  // onChange 함수 구현하기
  // 여행 계획 자체를 수정하는 기능

  handleSubmit(){
    
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else if (this.props.travel) {
      return (
        <div className="user-travel-detail_wrapper">
          <Form onSubmit={this.handleSubmit}>
            <Input type="text" value={this.props.travel.title} />
            <Input type="text" value={this.props.travel.travel_region} />
            <Input type="text" value={this.props.travel.start_at} />
            <Input type="text" value={this.props.travel.end_at} />
            <Input type="file" />
            <Input type="select" name="select" id="exampleSelect">
              <option>시작하기</option>
              <option>여행 중</option>
              <option>추억하기</option>
            </Input>

            <Button className="user-travel-detail_button">수정하기</Button>
          </Form>
        </div>
      );
    }
  }
}

export default UserTravelDetail;
