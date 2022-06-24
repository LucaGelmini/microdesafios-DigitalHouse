# App de notas

Esta app permite anotar, editar y elminiar tareas y sus estados.

## Instrucciones de uso

1. descargarse node.js
2. Encontrarse en el directorio de la apliación
3. Ejecutar la aplicación mediante la línea de comandos: "node app.js"

## Idea

Ésta es una refactorización de uno de los primeros microdesafíos que nos propuso Digital House en el curso de desarrollo full stack con node.js. El objetivo original era crear una simple app de notas que cumpla con los requisitos de una app del tipo CRUD (create, read, update, delete). En un principio se pasaban las acciónes como argumentos en la linea de node para ejecutar el programa.

En esta refactorización utilicé el módulo readline para crear un cli que funcione como asistente en la consola y de esa manera tener una mejor UX al usar esta app muy básica. Al mismo tiempo aproveché esta oportunidad para darme el gusto de utilizar los comandos async y await de javaScript para escribir un código no bloqueante al leer y escribir la información del disco de la PC.

This is a refactor of one of the first mini challenges we made in the full Stack web development course with node.js in Digital House academy. The main goal of this challenge was to create a super simple note app that matches the requisites of a CRUD type app (create, read, update, delete). Originaly the commands was passed by arguments when we execute this program.

In this refactor I used the readline module to make a CLI and enhance the user experience of this super simple app. At the same time i took this oportunity to write the functions of this program in a non blocking way using javaScript  "async" and "await" methods.
