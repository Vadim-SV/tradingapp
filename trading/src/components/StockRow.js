import React, {Component} from 'react';
import {iex} from '../config/iex.js';
import {stock} from '../resources/stock.js';


class StockRow extends Component {
    constructor (props) {
        super(props)
        this.state = {
            price:'',
            date:'',
            time:'',
            dollar_change: '',
            percent_change: ''
           
        }
    }
    
    changeStyle () {
        return {
        color: (this.state.dollar_change > 0) ? '#4caf50':'#e53935',
        fontSize: '0.8rem',
        marginLeft: 5
         }
    }

    applyData (data) {
        const formattedPrice = (data.price === undefined) ? null : data.price.toFixed(2)
            this.setState({
            price: formattedPrice,
            date: data.date,
            time: data.time,
       });
    }
     
        componentDidMount () {
            stock.latestPrice(this.props.ticker, this.applyData.bind(this))
        }
        componentDidUpdate(prevProps) {
        if (prevProps.lastTradingDate ==null&& this.props.lastTradingDate !=null){
            this.setState({
                canSetClose: true
            
        })
        }

        if (this.state.canSetClose && this.state.price !==null) {

        stock.getYesterdayClose = (this.props.ticker, this.props.lastTradingDate, (yesterday)=> {
        const dollar_change = (this.state.price - yesterday.price).toFixed(2);
        const percent_change = (100 * dollar_change/yesterday.price).toFixed(2);
        this.setState({
            
            dollar_change: `${dollar_change}`,
            percent_change: `(${percent_change}%)`,
            canSetClose: false
          })
     })
    }
}
  
   render(){
    return ( 
        <li className = 'list-group-item'>
                <b>{this.props.ticker}</b>${this.state.price}
                <span className = 'change' style = {this.changeStyle()}>
                  {this.state.dollar_change}
                  {this.state.percent_change}                
                  
                </span>
                </li>

        )
    }
}




export default StockRow;