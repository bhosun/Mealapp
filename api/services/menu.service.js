import Menu from '../models/menu.model';

const menuService = {
    fetchAllMenus() {
        return Menu.findAll();
    },

    addMenu(menu) {
        return Menu.create(menu);
    }
}

export default menuService;