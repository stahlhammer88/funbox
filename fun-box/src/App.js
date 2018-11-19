import React, { Component } from 'react';
import Item from './components/Item';
import payload from './payload';

class App extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      products: payload
    }
  }
  render() {
    return (      
        <section className="products">
            <h1 className="products__header">Ты сегодня покормил кота?</h1>
            <div className="products__container">
              {this.state.products.map((product, i) => {
                return <Item product={product} key={i} />
              })}         
            </div>
        </section>      
    );
  }
}

export default App;
