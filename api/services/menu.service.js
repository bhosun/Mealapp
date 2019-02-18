import menuData from '../utils/menuData';
import Menu from '../models/menu.model';

const menuService = {
    fetchAllMenus() {
        const validMenu = menuData.menus.map((menu) => {
            const newMenu = new Menu();
            newMenu.id = menu.id;
            newMenu.names = menu.names;
            newMenu.price = menu.price;
            return newMenu;
        });
        return validMenu;
    },

    addMenu(menu) {
        const menuLength = menuData.menus.length;
        const lastId = menuData.menus[menuLength - 1].id;
        const newId = lastId + 1;
        menu.id = newId;
        menuData.menus.push(menu);
        return menu;
    }
}

export default menuService;