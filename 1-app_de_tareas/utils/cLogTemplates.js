const cLogTemplates = {
    availableOptions: ['ayuda','nueva','guardar','buscar','editar','eliminar','salir'],
    availableOptionsTemplate(){
        let availableOptions = cLogTemplates.availableOptions
        let templateActions = availableOptions.reduce((prev, next)=>{
            return `${prev}, ${next}`
        })
        return(
            `Las acciones disponibles son: ${templateActions}\n`
        )
    },
    actionRequired(){
        console.log(
            'Atención - Tienes que pasar una acción.\n'+cLogTemplates.availableOptionsTemplate()
        )
    },
    unrecognisedCommand(){

        console.log('No entiendo qué quieres hacer.\n'+cLogTemplates.availableOptionsTemplate())
    }
}

module.exports = cLogTemplates;