const Products = {
    init: function() {
        this.cacheSelectors()
        this.buildProducts()
    },

    cacheSelectors: function() {
        this.$list = document.querySelector('[data-js="products-list"]')
    },

    bindEvents: function() {},

    buildProducts: async function() {
        const response = await fetch('http://localhost:3000/api/products')
        const products = await response.json()

        const productsHTML = products.map(({ name, price }) => {
            return `
                <li>${name} | ${price}</li>
            `
        }).join('')

        this.$list.innerHTML = productsHTML
    },

    Events: {}
}

Products.init()