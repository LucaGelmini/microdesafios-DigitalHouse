const { argv } = require('process');
const readline = require('readline')
const tareas = require('./utils/funcionesDeTareas')
const {availableOptionsTemplate, actionRequired, unrecognisedCommand} = require('./utils/cLogTemplates')


async function mainSwitch(data, action, rl){
    switch (action){
        case 'opciones':
        case '?':
        case 'ayuda':
            console.clear();
            console.log(availableOptionsTemplate());
            rl.close();
            cli(data);
            break;
        case 'listar':
            tareas.listAllTasks(data)
            .then(()=>{
                rl.close();
                cli(data);
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
                    cli(data);
                })
            })
            break;
        case 'guardar':
            tareas.save(data);
            console.clear();
            rl.close();
            cli(data);
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
                            cli(data);
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
                        cli(data);
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
                    // console.log('adentro', await data)
                    rl.close();
                    cli(data);
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
            cli(data);
    }
    // console.log('afuera', await data)
    return data
}
function cli(data){
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
cli(data)

