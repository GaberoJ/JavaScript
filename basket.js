'use strict';

const basket = {};

const totalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const cartEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
cartEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const cartCountEl = document.querySelector('.cartIconWrap span');
const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    cartCountEl.textContent ++;
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    
    addToBasket(id, name, price);

});


function addToBasket(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id, name, price, count: 0};
    }
    basket[id].count++;
    totalValueEl.textContent = getTotalPrice();
    renderNewProduct(id);
}

function getTotalPrice() {
    return Object.values(basket)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderNewProduct(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent++;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].price * basket[id].count;
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>$${basket[productId].price}</div>
            <div>
                $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}