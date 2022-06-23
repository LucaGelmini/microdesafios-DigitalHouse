const fs = require('fs').promises
const funcionesDeTareas = {

    read: async function (){
        let data = await fs.readFile('./data/tareas.json', 'utf-8');
        data = await JSON.parse(data);
        return data
    },

    allTasks: async function (){
        const data = await this.read()
        const tareas = data.map(tarea => tarea.titulo)
        console.log(tareas)
        return tareas
    },

    listAllTasks: async function(dataPromisse){
        const data = await dataPromisse;
        console.log('Todas las tareas\n-----------------');
        data.forEach((task, idx)=>{
            console.log(
                `${idx}. ${task.titulo}: ${task.estado}`
            )
        })
        console.log('\n')
    },

    newTask: (name, status) => {return {titulo: name, estado: status}},

    appendTask: async function(dataPromisse, newTask){
        const data = await dataPromisse;
        data.push(newTask)
        return data
    }

        


}
module.exports = funcionesDeTareas