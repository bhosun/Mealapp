import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenus(req, res) {
        const allMenus = menuService.fetchAllMenus();
        return res.json({
            status: "success",
            data: allMenus
        }).status(201);
    },

    addMenu(req, res) {
        const dbody = req.body;
        const add = menuService.addMenu(dbody);
        return res.json({
            status: "success",
            data: add
        }).status(201);
    }
}

export default menuController;