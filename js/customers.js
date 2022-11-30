const Customers = {
    init: function() {
        this.cacheSelectors()
        this.buildCustomers()
    },

    cacheSelectors: function() {
        this.$list = document.querySelector('[data-js="customers-list"]')
    },

    bindEvents: function() {},

    buildCustomers: async function() {
        const response = await fetch('http://localhost:3000/api/customers')
        const customers = await response.json()

        const customersHTML = customers.map(({ name, email, phone, address }) => {
            return `
                <li>${name} | ${email} | ${phone} | ${address}</li>
            `
        }).join('')

        this.$list.innerHTML = customersHTML
    },

    Events: {}
}

Customers.init()