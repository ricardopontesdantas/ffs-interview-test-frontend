const Products = {
    init: function() {
        this.cacheSelectors()
        this.buildProducts()
        this.bindEvents()
    },

    cacheSelectors: function() {
        this.$list = document.querySelector('[data-js="products-list"]')
        this.$form = document.querySelector('#form-products')
    },

    bindEvents: function() {
        this.$form.addEventListener('submit', this.Events.form_submit)
    },

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

    Events: {
        form_submit: function(event) {
            event.preventDefault()

            const name = this.name.value
            const price = Number(this.price.value)

            const product = { name, price }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }

            fetch('http://localhost:3000/api/products', options)
                .then(response => response.json())
                .then(data => {
                    alert(data.message)
                    this.reset()
                    Products.buildProducts()
                })
                .catch(console.error)
        },
    }
}

Products.init()