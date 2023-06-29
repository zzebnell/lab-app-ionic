export class Maquina {
   ocupada: boolean;
   nombre: string;
 
   constructor(ocupada: boolean, nombre: string) {
     this.ocupada = ocupada;
     this.nombre = nombre;
   }
 
   toJSON() {
     return {
       ocupada: this.ocupada,
       nombre: this.nombre
     };
   }
 }
 