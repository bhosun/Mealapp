import orderService from '../services/order.service';
import order from '../utils/order';

const orderController = {
    fetchAllOrders(req, res) {
        const allOrders = orderService.getAllOrders();
        return res.status(201).json({
            status: "success",
            data: allOrders
        })
    },
    
    addOrder(req, res) {
        const orderyea = req.body;

        if(!orderyea.food || !orderyea.address || !orderyea.quantity || !orderyea.price) {
            return res.status(201).json({
                status: 'error',
                message: 'fill in the right details'
            })
        }

        const add = orderService.addOrder(orderyea);
        return res.json({
            status: "success",
            data: add
        }).status(200);
    },

    editOrder(req, res) {
        const id = req.params.id;
        const nilo = req.body;

        if (Number.isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Please make sure you input a Number'
            })
        }

        const uyi = orderService.updateOrder(nilo, id);
        return res.json({
            status: "success",
            data: uyi
        }).status(200);
    }
}

export default orderController;