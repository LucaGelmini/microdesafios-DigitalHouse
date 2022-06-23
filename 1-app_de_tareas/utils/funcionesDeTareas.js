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
    },
    save: async function(dataPromisse){
        const data = await dataPromisse;
        await fs.writeFile('./data/tareas.json', JSON.stringify(data));
    },
    search: async function(dataPromisse, title){
        let data = await dataPromisse;
        data = data.map((task, idx) => {
            return {
                ...task,
                indice: idx
            }
        });
        const targetTasks = data.filter((tarea)=> (tarea.titulo == title));
        targetTasks.length >0 ?
        targetTasks.forEach(targetTask=>console.log(`%cTarea número ${targetTask.indice+1}. Estado: ${targetTask.estado}\n`, color='green')) :
        console.log(`%cNo existen tareas que coincidan`, color='red');
        return targetTasks
    },
    patch: async function(dataPromisse,targetTask, newState){
        let data = await dataPromisse;
        if (targetTask.length != 1){
            console.log('Su búsqueda coincide con varias tareas, debe elegir una tarea')
            return data
        }
        targetTask = targetTask[0]
        data[targetTask.indice] = {titulo:data[targetTask.indice].titulo, estado:newState}
        return data
    },
    delete: async function(dataPromisse, targetTask){
        let data = await dataPromisse;
        if (targetTask.length != 1){
            console.log('Su búsqueda coincide con varias tareas, debe elegir una tarea')
            return data
        }
        targetTask = targetTask[0]
        data = data.filter((task, idx)=>idx!=targetTask.indice)
        return data
    }

}
module.exports = funcionesDeTareas