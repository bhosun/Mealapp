// import order from '../utils/order';
import Order from '../models/order.model';

const orderService = {
    getAllOrders() {
        return Order.findAll();
    },

    addOrder(bodyOrder) {
        return Order.create(bodyOrder);
    },

    updateOrder(body, id) {
        return Order.update(
            {
                order: body.order,
                billing_address: body.billing_address,
                totalPrice: body.totalPrice,
                quantity:   body.quantity
            },
            {
                where: {id: id}
            }
        )
    }
}

export default orderService;