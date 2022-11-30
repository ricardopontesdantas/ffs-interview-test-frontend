const Orders = {
    init: function() {
        this.cacheSelectors()
        this.buildProducts()
    },

    cacheSelectors: function() {
        this.$list = document.querySelector('[data-js="orders-list"]')
    },

    bindEvents: function() {},

    buildProducts: async function() {
        const responseOrders = await fetch('http://localhost:3000/api/orders')
        const orders = await responseOrders.json()

        const responseCustomers = await fetch(`http://localhost:3000/api/customers`)
        const customers = await responseCustomers.json()

        const ordersHTML = orders.map(({ createdAt, customerId, products, status }) => {
            const productsHTML = products.map(({ name, price }) => `<li>${name} | ${price}</li>`).join('')
            const { name, address, phone, email } = customers.find(customer => customer._id === customerId)

            return `
                <li>
                    <div>Pedido feito por: ${name}</div>
                    <div>Relizado em: ${createdAt}</div>
                    <div>Status do pedido: ${status}</div>
                    <div>
                        Detalhes do Pedido:
                        <ul>${productsHTML}</ul>
                    </div>
                    <div>Endereço do cliente: ${address}</div>
                    <div>Contato do cliente: ${phone} | ${email}</div>
                </li>
            `
        }).join('')

        this.$list.innerHTML = ordersHTML
    },

    Events: {}
}

Orders.init()