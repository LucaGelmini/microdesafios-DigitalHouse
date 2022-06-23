const tareasIO = {
    availableOptions: ['listar', 'nueva', 'salir'],
    availableOptionsTemplate(){
        let availableOptions = tareasIO.availableOptions
        let templateActions = availableOptions.reduce((prev, next)=>{
            return `${prev}, ${next}`
        })
        return(
            `Las acciones disponibles son: ${templateActions}\n`
        )
    },
    actionRequired(){
        console.log(
            'Atención - Tienes que pasar una acción.\n'+tareasIO.availableOptionsTemplate()
        )
    },
    unrecognisedCommand(){

        console.log('No entiendo qué quieres hacer.\n'+tareasIO.availableOptionsTemplate())
    }
}

module.exports = tareasIO;