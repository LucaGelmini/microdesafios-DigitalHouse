const { argv } = require('process');
const readline = require('readline')
const tareas = require('./utils/funcionesDeTareas')
const {availableOptionsTemplate, actionRequired, unrecognisedCommand} = require('./utils/tareasIO')

// function isPromise(p) {
//     if (
//       p !== null &&
//       typeof p === 'object' &&
//       typeof p.then === 'function' &&
//       typeof p.catch === 'function'
//     ) {
//       return true;
//     }
  
//     return false;
//   }

function mainSwitch(data, action, rl){
    switch (action){
            case 'listar':
                tareas.listAllTasks(data)
                .then(()=>{
                    rl.close();
                    cli();
                })
            case 'nueva':
                rl.question('Inserte el nombre de la tarea: ', action1 =>{
                    const nombre = action1;
                    rl.question('Inserte el estado de la tarea: ', action2 =>{
                        const estado = action2;
                        const nuevaTarea = tareas.newTask(nombre, estado);
                        data =  tareas.appendTask(data, nuevaTarea);
                        console.log('\n')
                        console.clear();
                        rl.close();
                        cli();
                    })
                })
                break;
            case 'guardar':
                
    
            case 'salir':
                rl.close();
                break;
            default:
                unrecognisedCommand();
                console.clear();
                rl.close();
                cli();
    }
}


let data = tareas.read()
// argv[2] == undefined ? actionRequired() : data = mainSwitch(data)
function cli(){
    const rl =readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('¿Qué acción desea ejecutar? ', action=>{
        if(!action) {
            rl.close();
            actionRequired();
            cli();
        }else{
            mainSwitch(data, action, rl)

        }
    })

}
 cli()


// readline.question(`What's your name?`, name => {
//     tareas.listAllTasks(data)
//     console.log(`Hi ${name}!`);
//     readline.close();
// });