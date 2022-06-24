const fs = require('fs')
const path = require('path')


const menuJSON = fs.readFileSync(path.resolve(__dirname, '../data/menu.json'));
const contentJSON = fs.readFileSync(path.resolve(__dirname, '../data/content.json'));


const menu = JSON.parse(menuJSON);
const content = JSON.parse(contentJSON);


const indexController = {
    index: (req,res) => {
        about = content.find(obj => obj.section === "about");
        res.render('index', {menu, about});
    },
    detalle:(req,res) =>{
        id = req.params.id;
        res.render('detalleMenu', {menu, id});
    }
}

module.exports = indexController;