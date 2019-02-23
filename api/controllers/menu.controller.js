import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenus(req, res) {
        const allMenus = menuService.fetchAllMenus();
        return res.status(201).json({
            status: "success",
            data: allMenus
        })
    },

    addMenu(req, res) {
        const dbody = req.body;
        
        if(!dbody.names || !dbody.price) {
            return res.status(400).json({
                status: "error",
                message: 'Input the Right Parameters'
            })
        }

        const add = menuService.addMenu(dbody);

        return res.status(201).json({
            status: "success",
            data: add
        })
    }
}

export default menuController;