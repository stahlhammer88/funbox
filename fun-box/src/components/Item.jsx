import React, { Component } from 'react';
import Parser from 'html-react-parser';
import catImage from '../img/cat.png';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,            
        }
    }

    render() {
        return(
            <article className="item">
                <div className="item__head">
                    <span className="item__tag">Сказочное заморское яство</span>
                </div>           
                <div className="item__body">                        
                    <span className="item__title">Нямушка</span>
                    <span className="item__subtitle">{this.props.product.flavor}</span>
                    <div className="item__description">
                        <span className="item__portions"><strong>{this.props.product.portions}</strong> порций</span>
                        <span className="item__present">{Parser(this.getMice(this.props.product.mice))} в подарок</span>
                    </div>                        
                    <img src={catImage} alt="" className="item__image"/>
                    <div className="item__weight"><span>{this.props.product.weight}</span><span>кг</span></div>
                </div>                                            
                <span className="item__comment">{Parser(this.getComment())}</span>  
            </article>            
        );
    }

    getMice(miceAmount) {        
        if (miceAmount) {
            switch (String(miceAmount).slice(-1)) {
                case '1':
                    return `<strong>${miceAmount}</strong> мышь`;
                case '2':
                case '3':
                case '4':
                    return `<strong>${miceAmount}</strong> мыши`;
                default:
                    return `<strong>${miceAmount}</strong> мышей`;
            }
        }    
        else
            return 'мышь';
    }

    getComment() {
        if (this.state.selected)
            return this.props.product.comment;
        else if(this.props.product.disabled) 
            return `Печалька, ${this.props.product.flavor} закончился.`;
        else 
            return "Чего сидишь? Порадуй котэ, <a href='#' class='pseudo'>купи</a>."
    }
}

export default Item;