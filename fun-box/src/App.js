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
        <div className="products__container">
          {this.state.products.map((product, i) => {
            return <Item product={product} key={i} />
          })}         
        </div>              
    );
  }
}

export default App;
