class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const item = new ShoppingCartItem(product, quantity);
        this.items.push(item);
        this.updateDOM();
    }
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateDOM();
    }
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
    displayItems() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';

        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.product.name} (x${item.quantity}): ${item.getTotalPrice().toFixed(2)} $`;
            cartItemsDiv.appendChild(itemDiv);
        });
    }

    updateDOM() {
        this.displayItems();
        document.getElementById('total-items').textContent = `Total items: ${this.getTotalItems()}`;
        document.getElementById('total-price').textContent = `Total price: ${this.getTotalPrice().toFixed(2)} $`;
    }
}

const cart = new ShoppingCart();

function addToCart(id, name, price) {
    const product = new Product(id, name, price);
    cart.addItem(product, 1);
}
