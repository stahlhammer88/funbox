import React, { Component } from 'react';
import Parser from 'html-react-parser';
import catImage from '../img/cat.png';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,     
            hovered: false       
        }        

        this.clickHandler = this.clickHandler.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
    }

    render() {
        let comment = <span>Чего сидишь? Порадуй котэ,&nbsp;
                        <span onClick={this.clickHandler} className='pseudo'>купи</span>.
                      </span>

        if (this.state.selected) {
            comment = <span>{this.props.product.comment}</span>
        }
        if (this.props.product.disabled) {
            comment = <span>Печалька, {this.props.product.flavor} закончился.</span>
        }

        let present;
        if (this.props.product.mice) {
            present = <span className="item__present">{Parser(this.getCountable(this.props.product.mice, 'мышь'))} в подарок</span>
        }

        return(
            <article className={this.getClassName()}>
                <div 
                    onClick={this.clickHandler} 
                    onMouseLeave={this.hoverHandler}
                    className="item__wrapper">
                    <div className="item__head">
                        <span className="item__tag">Сказочное заморское яство</span>
                    </div>           
                    <div className="item__body">                        
                        <span className="item__title">Нямушка</span>
                        <span className="item__subtitle">{this.props.product.flavor}</span>
                        <div className="item__description">
                            <span className="item__portions">{Parser(this.getCountable(this.props.product.portions, 'порция'))}</span>
                            {present}
                        </div>                        
                        <img src={catImage} alt="" className="item__image"/>
                        <div className="item__weight"><span>{this.props.product.weight}</span><span>кг</span></div>
                    </div>                                            
                </div>                    
                <div className="item__comment">{comment}</div>  
            </article>            
        );
    }

    getCountable(number, word) {        
        let declencedWord = word;      
        let lastDigit =  String(number).slice(-1); 
        
        if (+lastDigit > 1 || +lastDigit === 0) {
            declencedWord = this.getDeclension(word, null);
            if (number < 10 || number > 20) {
                switch (lastDigit) {
                    case '2':
                    case '3':
                    case '4':
                        declencedWord = this.getDeclension(word, true);
                        break;   
                    default:
                        break;              
                }                
            }                           
        }   
        if (number === 1 && word === 'мышь') {
            return `${declencedWord}`;
        }
        return `<strong>${number}</strong> ${declencedWord}`;
    }

    getDeclension(word, declensionCase){
        let noEnding = word.slice(0, -1);
        let lastLetter = word.slice(-1);
       
        if (declensionCase) {
            return noEnding + 'и';
        }
        else {
            return noEnding + (lastLetter === 'ь' ? 'ей' : 'й');
        }        
    }

    getClassName() {
        let cssClass = ['item'];

        if (this.props.product.disabled)
            cssClass.push('item--disabled');
        if (this.state.selected)
            cssClass.push('item--selected');
        if(this.state.hovered)
            cssClass.push('item--no-hover');
        return cssClass.join(' ');
    }

    clickHandler() {
        this.setState({            
            selected: !this.state.selected
        }, () => {            
            if (!this.state.selected) {
                this.setState({                
                    hovered: true
                })
            }
        });        
    }

    hoverHandler() {
        this.setState({
            hovered: false
        })
    }
}

export default Item;