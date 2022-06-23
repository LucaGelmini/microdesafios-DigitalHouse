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

async function mainSwitch(data, action, rl){
    switch (action){
        case 'opciones':
        case '?':
        case 'ayuda':
            console.clear();
            console.log(availableOptionsTemplate());
            rl.close();
            cli();
            break;
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
            tareas.save(data);
            console.clear();
            rl.close();
            cli();
            break;
        case 'buscar':
            const busqueda = () =>{
                rl.question('Ingrese el nombre de la tarea: ', async action3 =>{
                    await tareas.search(data, action3);
                    rl.question('¿Ir atras? [S/N]: ', action =>{
                        if( action === 'N'){
                            console.log(action)
                            busqueda();
                        }else{
                            console.clear();
                            rl.close();
                            cli();
                        }
                    })
                })
            }
            busqueda()
            break;
        case 'editar':
            const busquedaEditar = () =>{
                rl.question('Ingrese el nombre de la tarea a editar: ', async action4 =>{
                    const target = await tareas.search(data, action4);
                    rl.question('Ingrese nuevo estado: ', action => {
                        data = tareas.patch(data, target, action);
                        console.clear();
                        rl.close();
                        cli();
                    })
                    
                })
            }
            busquedaEditar()
            break;
        case 'eliminar':
            const busquedaEliminar = () =>{
                rl.question('Ingrese el nombre de la tarea a eliminar: ', async action5 =>{
                    const target = await tareas.search(data, action5);
                    data = tareas.delete(data, target);
                    // console.clear();
                    rl.close();
                    cli();
                })
            }
            busquedaEliminar()
            break;
        case 'salir':
            rl.close();
            break;
        default:
            console.clear();
            unrecognisedCommand();
            rl.close();
            cli();
    }
    console.log('afuera', await data)
    return data
}
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
            data = mainSwitch(data, action, rl)

        }
    })

}

console.clear();
let data = tareas.read()
 cli()

