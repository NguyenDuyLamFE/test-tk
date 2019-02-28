import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import _ from 'lodash';
import { DECK_OF_CARDS } from "../../utils/ApiEndpoint";
import * as ApiCaller from "../../utils/ApiCaller";
import template from "string-template";
import { getCardShuffle, getCardDraw } from '../../actions/CardsAction';
import card from '../../../assets/img/back_side_card.png';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            img: card,
            Shuffle: true,
            Reveal: false,
            Draw: true,
            showBackSideCard: false,
            showCard: false,
            winner: false,
            point_1: 0,
            point_2: 0,
            point_3: 0,
            point_4: 0,
            round: 0
        };
    }

    componentDidMount() {
        this.getDeskCard();
    }

    getDeskCard = () => {
        ApiCaller.apiGet(template(DECK_OF_CARDS), ApiCaller.baseHeader())
                .then(resp => {
                    this.setState({
                        id: resp.data.deck_id
                    });
                },(error) => {
                    console.log("error: " + error);
                });
    }

    handleShuffle = () => {
        this.props.getCardShuffle(this.state.id, this.setState({
            img: card,
            showBackSideCard: false,
            Reveal: false,
            Draw: true
        }));
    }

    handleDraw = () => {
        this.props.getCardDraw(this.state.id, this.setState({
            showBackSideCard: true,
            showCard: false,
            Reveal: true,
            Draw: false,
            Shuffle: false,
            round: this.state.round + 1
        }));
    }

    handleShare = (score, cash, maxValue) => {
        for (let index = 0; index < score.length; index++) {
            if (score[index] === maxValue) {
                switch (index) {
                    case 0:
                        this.setState({
                            point_1: this.state.point_1 + cash,
                        });
                        break;
                    case 1:
                        this.setState({
                            point_2: this.state.point_2 + cash,
                        });
                        break;
                    case 2:
                        this.setState({
                            point_3: this.state.point_3 + cash,
                        });
                        break;    
                    case 3:
                        this.setState({
                            point_4: this.state.point_4 + cash,
                        });
                        break;    
                };
            }
            
        }
    }

    findTheMaxPoint = () => {
        const { cards } = this.props.cardsReducer;
        const point = [];
        for (let i = 0; i < cards.length; i ++) {
            if ( (cards[i].value === "KING") || (cards[i].value === "QUEEN") || (cards[i].value === "JACK") ) {
                point.push(10);
            } else if (cards[i].value === "ACE") {
                point.push(1);
            } else {
                point.push(Number(cards[i].value));
            }
        };
        const score = [
            (point[0] + point[1] + point[2]) > 9 ? Number((point[0] + point[1] + point[2]).toString().split('')[1]) : (point[0] + point[1] + point[2]),
            (point[3] + point[4] + point[5]) > 9 ? Number((point[3] + point[4] + point[5]).toString().split('')[1]) : (point[3] + point[4] + point[5]),
            (point[6] + point[7] + point[8]) > 9 ? Number((point[6] + point[7] + point[8]).toString().split('')[1]) : (point[6] + point[7] + point[8]),
            (point[9] + point[10] + point[11]) > 9 ? Number((point[9] + point[10] + point[11]).toString().split('')[1]) : (point[9] + point[10] + point[11])
        ];
        console.log(score);
        const maxValue = Math.max.apply(null, score);
        const vertifyWiners = score.lastIndexOf(maxValue) == score.indexOf(maxValue);
        console.log(vertifyWiners);
        if (vertifyWiners) {
            this.handleShare(score, 15000, maxValue);
        } else {
            const countWinner = (array, what) => {
                var count = 0;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === what) {
                        count++;
                    }
                }
                return count;
            };
            if (countWinner(score, maxValue) == 2) {
                this.handleShare(score, 5000, maxValue);
            } else if (countWinner(score, maxValue) == 3) {
                this.handleShare(score, (5000 / 3), maxValue);
            }
            
        }
    }

    handleReveal = () => {
        const { cards } = this.props.cardsReducer; 
        const { round, point_1, point_2, point_3, point_4 } = this.state;
        this.setState({
            showCard: true,
            Reveal: false,
            Shuffle: true
        });
        const cardOfPlayers = [
            cards[0].value + " " + cards[1].value + " " + cards[2].value,
            cards[3].value + " " + cards[4].value + " " + cards[5].value,
            // "KING" + " " + "QUEEN" + " " + "JACK",
            cards[6].value + " " + cards[7].value + " " + cards[8].value,
            cards[9].value + " " + cards[10].value + " " + cards[11].value,
        ];
        console.log(cardOfPlayers);
        for (let z = 0; z < cardOfPlayers.length; z++) {
            const winner = cardOfPlayers[z] === "KING JACK QUEEN" || cardOfPlayers[z] === "JACK KING QUEEN" || cardOfPlayers[z] === "JACK QUEEN KING" || cardOfPlayers[z] === "KING QUEEN JACK" || cardOfPlayers[z] === "QUEN JACK KING" || cardOfPlayers[z] === "QUEEN KING JACK";
            if (winner) {
                switch (z) {
                    case 0:
                        this.setState({
                            point_1: this.state.point_1 + 15000,
                            winner: true
                        });
                        break;
                    case 1:
                        this.setState({
                            point_2: this.state.point_2 + 15000,
                            winner: true
                        });
                        break;
                    case 2:
                        this.setState({
                            point_3: this.state.point_3 + 15000,
                            winner: true
                        });
                        break;    
                    case 3:
                        this.setState({
                            point_4: this.state.point_4 + 15000,
                            winner: true
                        });
                        break;    
                };
            }
        };
        console.log(this.state.winner);
        if (!this.state.winner ) {
            this.findTheMaxPoint()
        };
        if (round === 5 ) {
            const total = [
                { name: "player A", point: point_1},
                { name: "player B", point: point_2},
                { name: "player C", point: point_3},
                { name: "User", point: point_4}
            ];
            const maxValue = Math.max.apply(null, [point_1, point_2, point_3, point_4]);
            console.log(maxValue);
            console.log(_.findIndex(total, function(o) { return o.point == maxValue}));
            const nameWinner = total[_.findIndex(total, function(o) { return o.point == maxValue})].name;
            setTimeout(() => {
                alert("The winner of 5 rounds is " + nameWinner);
                window.location.reload();
            }, 1500);
            
        }
        
        
    }   

    

    render() { 
        const {id, img, Reveal, Draw, Shuffle, showBackSideCard, showCard, point_1, point_2, point_3, point_4} = this.state;
        console.log(id);
        const { cards } = this.props.cardsReducer;
        console.log(cards);

        return (
            <div className="main">
                <MDBTable bordered className="tableScore">
                    <MDBTableHead>
                        <tr>
                        <th>Name Player</th>
                        <th>Point</th>
                        <th>Bet Point</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td>Player A</td>
                        <td>{point_1}</td>
                        <td>5000</td>
                        </tr>
                        <tr>
                        <td>Player B</td>
                        <td>{point_2}</td>
                        <td>5000</td>
                        </tr>
                        <tr>
                        <td>Player C</td>
                        <td>{point_3}</td>
                        <td>5000</td>
                        </tr>
                        <tr>
                        <td>User</td>
                        <td>{point_4}</td>
                        <td>5000</td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
                <div className="controlBar">
                    {
                        Shuffle && <Button onClick={this.handleShuffle} color="info" type="button" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74' }} className="mr-1"><i className="material-icons" style={{fontStyle: "initial"}}>&#xE147;</i> <span>Shuffle</span></Button>
                    }
                    {
                        Draw && <Button onClick={this.handleDraw} color="info" type="button" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74' }} className="mr-1"><i className="material-icons" style={{fontStyle: "initial"}}>&#xE147;</i> <span>Draw</span></Button>
                    }
                    {
                        Reveal && <Button onClick={this.handleReveal} color="info" type="button" style={{backgroundColor: '#4dbd74', borderColor: '#4dbd74' }} className="mr-1"><i className="material-icons" style={{fontStyle: "initial"}}>&#xE147;</i> <span>Reveal</span></Button>
                    }
                </div>
                {
                    !!showBackSideCard && <div> <section className="playerA">
                                            <h3>Player A</h3>
                                            <img alt='card value' src={showCard ? cards[0].image : img}/>
                                            <img style={{position: "absolute", zIndex: "1", left: "35%"}} src={showCard ? cards[1].image : img} alt='card value'/>
                                            <img style={{position: "absolute", zIndex: "2", left: "70%"}} src={showCard ? cards[2].image : img} alt='card value'/>
                                        </section>
                                        <section className="playerB">
                                            <h3>Player B</h3>
                                            <img style={{position: "absolute", zIndex: "1", right: "35%"}} src={showCard ? cards[3].image : img} alt='card value'/>
                                            <img style={{position: "relative", zIndex: "2"}} src={showCard ? cards[4].image : img} alt='card value'/>
                                            <img style={{position: "absolute", zIndex: "3", right: "-35%"}} src={showCard ? cards[5].image : img} alt='card value'/>
                                        </section>
                                        <section className="playerC">
                                            <h3>Player C</h3>
                                            <img style={{position: "absolute", zIndex: "1", right: "70%"}} src={showCard ? cards[6].image : img} alt='card value'/>
                                            <img style={{position: "absolute", zIndex: "2", right: "35%"}} src={showCard ? cards[7].image : img} alt='card value'/>
                                            <img style={{position: "relative", zIndex: "3"}} src={showCard ? cards[8].image : img} alt='card value'/>
                                        </section>
                                        <section className="user">
                                            <h3>User</h3>
                                            <img style={{position: "absolute", zIndex: "1", right: "35%"}} src={showCard ? cards[9].image : img} alt='card value'/>
                                            <img style={{position: "relative", zIndex: "2"}} src={showCard ? cards[10].image : img} alt='card value'/>
                                            <img style={{position: "absolute", zIndex: "3", right: "-35%"}} src={showCard ? cards[11].image : img} alt='card value'/>
                                        </section>
                                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({cardsReducer}, ownProps) => {
    return {
        cardsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCardShuffle,
        getCardDraw
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);