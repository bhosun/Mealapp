import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenus(req, res) {
        const allMenus = menuService.fetchAllMenus();
        return allMenus
            .then(menu => {
                res.status(201).json({
                status: "success",
                data: menu
                });
            })
            .catch(err => console.log(err));    
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

        return add
            .then(menu => {
                    res.status(201).json({
                    status: "success",
                    data: menu
                    })
            })
            .catch(err => console.log(err))
        }  
}

export default menuController;