import orderService from '../services/order.service';
import order from '../utils/order';

const orderController = {
    fetchAllOrders(req, res) {
        const allOrders = orderService.getAllOrders();
        return res.json({
            status: "success",
            data: allOrders
        }).status(201);
    },

    addOrder(req, res) {
        const orderyea = req.body;
        const add = orderService.addOrder(orderyea);
        return res.json({
            status: "success",
            data: add
        }).status(200);
    },

    editOrder(req, res) {
        const id = req.params.id;
        const nilo = req.body;
        const uyi = orderService.updateOrder(nilo, id);
        return res.json({
            status: "success",
            data: uyi
        }).status(200);
    }
}

export default orderController;