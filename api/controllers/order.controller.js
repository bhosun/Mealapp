import orderService from '../services/order.service';

const orderController = {
    fetchAllOrders(req, res) {
        const allOrders = orderService.getAllOrders();
        return allOrders
            .then(all => {
                res.status(201).json({
                status: "success",
                data: all
                })
            })
            .catch(err => console.log(err));
    },
    
    addOrder(req, res) {
        const orderyea = req.body;

        if(!orderyea.order || !orderyea.billing_address || !orderyea.quantity || !orderyea.totalPrice) {
            return res.status(400).json({
                status: 'error',
                message: 'fill in the right details'
            })
        }

        const add = orderService.addOrder(orderyea);
        return add
            .then(adds => {
                res.status(201).json({
                status: "success",
                data: adds
            })
        })
        .catch(err => console.log(err));
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
        return uyi
            .then(edit => {res.status(200).json({
                status: "success",
                data: edit
                });
            })
            .catch(err => console.log(err));
    }
}

export default orderController;