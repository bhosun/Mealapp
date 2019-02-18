import order from '../utils/order';
import Order from '../models/order.model';

const orderService = {
    getAllOrders() {
        const validOrder = order.orders.map((ort) => {
            const newOrder = new Order();
            newOrder.id = ort.id;
            newOrder.address = ort.address;
            newOrder.food = ort.food;
            newOrder.quantity = ort.quantity;
            newOrder.price = ort.price;
            return newOrder;
        })
        return validOrder;
    },

    addOrder(bodyOrder) {
        const orderLength = order.orders.length;
        const lastId = order.orders[orderLength - 1].id;
        const newId = lastId + 1;
        bodyOrder.id = newId;
        order.orders.push(bodyOrder);
        return bodyOrder;
    },

    updateOrder(body, id) {
        const oldId = order.orders[id - 1];
        oldId.address = body.address;
        oldId.food = body.food;
        oldId.quantity = body.quantity;
        oldId.price = body.price;
        return body || {};
    }
}

export default orderService;