
class App {
    constructor() {
        this.container = document.querySelector('.products__container');
        this.products = payload.map((product, i) => {
            let itemElement = new Item(product);
            this.container.appendChild(itemElement.createElement(i));
            return itemElement;
        });        
        this.addClickHandler();
    }

    addClickHandler() {
        this.container.addEventListener('click', event => {                                                        
            let elem = this.findProductItem(event.target);
            if (elem) {
                let product = this.products[elem.dataset.index];
                if (!product.disabled) {
                    product.selected = !product.selected;
                    product.setProductState(true);
                }                
            }
        })
    }

    findProductItem (elem) {                
        if (!elem)
            return false;
        if (elem.dataset && elem.dataset.index !== undefined)
            return elem;
        else
            return this.findProductItem(elem.parentNode);
    }
}

class Item {
    constructor(product) {
        this.selected = false;
        this.disabled = product.disabled;
        this.available = true;
        this.markup = `            
            <div class="item__head">
                <span class="item__tag">Сказочное заморское яство</span>
            </div>           
            <div class="item__body">                        
                <span class="item__title">Нямушка</span>
                <span class="item__subtitle">${product.flavor}</span>
                <div class="item__description">
                    <span class="item__portions"><strong>${product.portions}</strong> порций</span>
                    <span class="item__present">${this.getMice(product.mice)} в подарок</span>
                </div>                        
                <img src="./img/cat.png" alt="" class="item__image">
                <div class="item__weight"><span>${product.weight}</span><span>кг</span></div>
            </div>                                            
            <span class="item__comment">
                ${product.comment}
            </span>            
        `;
        this.product;        
    }

    createElement(index) {           
        this.product = document.createElement('article');
        this.product.classList.add('item');
        this.product.dataset.index = index;                
        this.product.innerHTML = this.markup;                      
        this.setProductState();
        this.addLeaveHandler();
        return this.product;
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

    setProductState(isClicked) {
        if (this.selected) 
            this.product.classList.add('item--selected');
        else {
            this.product.classList.remove('item--selected');
            if (isClicked)
                this.product.classList.add('item--no-hover');
        }

        this.disabled ? 
            this.product.classList.add('item--disabled') : 
            this.product.classList.remove('item--disabled');
    }

    addLeaveHandler() {
        this.product.addEventListener('mouseleave', event => {            
            if (!this.selected)
                this.product.classList.remove('item--no-hover');
        })
    }
}

let cats = new App();