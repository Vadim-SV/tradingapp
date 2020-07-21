import React, {Component} from 'react';
import {iex} from '../config/iex.js';
import {stock} from '../resources/stock.js';
import StockRow from '../components/StockRow.js';


class StockList extends Component {

    constructor (props) {
        super(props)
        this.state = {
            lastTradingDay: ''
        }
    }

        componentDidMount () {
        stock.getLastTradingDate().then((data) => {
        this.setState({
            lastTradingDate: data[0].date
        })   
     })
    }


    render(){
    
        const lastTradingDate = this.state.lastTradingDate;
        return (

        <ul className = "list-group list-group-flush">
        <StockRow ticker = "AAPL" lastTradingDate = {lastTradingDate} />
        <StockRow ticker = "GRUB" lastTradingDate = {lastTradingDate}/>
        <StockRow ticker = "GOOG" lastTradingDate = {lastTradingDate}/>
        <StockRow ticker = "AAPL" lastTradingDate = {lastTradingDate}/>
        <StockRow ticker = "AAPL" lastTradingDate = {lastTradingDate}/>

      </ul>

        )
    }
}




export default StockList;

