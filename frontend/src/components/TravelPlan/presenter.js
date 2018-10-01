import React, { Component } from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css';
import styles from './styles.scss';

const format = 'YYYY-MM-DD';

const fullFormat = 'YYYY-MM-DD dddd';

const now = moment();

now.locale('en-gb').utcOffset(0);

class TravelPlan extends Component {
  
  state = {
    startValue: null,
    endValue: null,
    startOpen: false,
    endOpen: false,
  };

  onStartOpenChange = (startOpen) => {
    this.setState({
      startOpen,
    });
  }

  onEndOpenChange = (endOpen) => {
    this.setState({
      endOpen,
    });
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value[0],
      startOpen: false,
      endOpen: true,
    });
  }

  onEndChange = (value) => {
    this.setState({
      endValue: value[1],
    });
  }

  disabledStartDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  }

  render() {
    const state = this.state;
    return (
      <div className={styles.pickerBox}>
        <div>
          여행 계획 제목 
        </div>
        <div>
          시작일자:
          <Picker
            onOpenChange={this.onStartOpenChange}
            type="start"
            showValue={state.startValue}
            open={this.state.startOpen}
            value={[state.startValue, state.endValue]}
            onChange={this.onStartChange}
          />
        </div>

        <p>
          종료일자:
          <Picker
            onOpenChange={this.onEndOpenChange}
            open={this.state.endOpen}
            type="end"
            showValue={state.endValue}
            disabledDate={this.disabledStartDate}
            value={[state.startValue, state.endValue]}
            onChange={this.onEndChange}
          />
        </p>
      </div>
    );
  }
}

class Picker extends Component {
  
  state = {
    hoverValue: [],
  };

  onHoverChange = (hoverValue) => {
    console.log(hoverValue);
    this.setState({ hoverValue });
  }

  render() {
    const props = this.props;
    const { showValue } = props;
    const calendar = (
      <RangeCalendar
        hoverValue={this.state.hoverValue}
        onHoverChange={this.onHoverChange}
        type={this.props.type}
        locale={enUS}
        defaultValue={now}
        format={format}
        onChange={props.onChange}
        disabledDate={props.disabledDate}
      />);
    return (
      <DatePicker
        open={this.props.open}
        onOpenChange={this.props.onOpenChange}
        calendar={calendar}
        value={props.value}
      >
        {
          () => {
            return (
              <span>
                <input
                  placeholder="Date"
                  style={{ width: 250 }}
                  readOnly
                  value={showValue && showValue.format(fullFormat) || ''}
                />
                </span>
            );
          }
        }
      </DatePicker>);
  }
}

export default TravelPlan;