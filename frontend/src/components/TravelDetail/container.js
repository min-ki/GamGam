import React, {
    Component
} from "react";
import PropTypes from "prop-types";
import TravelDetail from "./presenter";

class Container extends Component {
    state = {
        loading: true,
        items: null,
    };

    static propTypes = {
        getTravelDetail: PropTypes.func.isRequired
    };


    componentDidMount() {
        const {
            TravelId,
            getTravelDetail
        } = this.props;
        if (!this.props.travel) {
            getTravelDetail(TravelId);
            fetch(`/travel/api/${TravelId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('jwt')}`
                    },
                })
                .then(function (response) {
                    return response.json();
                })
                .then(json => this.setState({
                    items: json.items
                }));

        } else if (!this.props.travel.id !== TravelId) {
            localStorage.removeItem('gallery_img'); // 새로고침시 이미지 사라지는 문제 해결
            getTravelDetail(TravelId);
            fetch(`/travel/api/${TravelId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('jwt')}`
                    }, // 이 부분은 따로 설정하고싶은 header가 있다면 넣으세요
                })
                .then(function (response) {
                    return response.json();
                })
                .then(json => this.setState({
                    items: json.items
                }));

            console.log(this.state);
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.travel) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        console.log(this.state);

        const {
            travel
        } = this.props;
        return <TravelDetail {
            ...this.state
        }
        travel = {
            travel
        }
        />;
    }
}

export default Container;