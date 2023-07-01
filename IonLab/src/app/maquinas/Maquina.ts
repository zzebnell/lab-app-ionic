export class Maquina {
   ocupada: boolean;
   nombre: string;
   usuario: string;
   usuarioCI: string;
   usuarioHora: string;
 
   constructor(ocupada: boolean, nombre: string) {
     this.ocupada = ocupada;
     this.nombre = nombre;
     this.usuario = "";
     this.usuarioCI = "";
     this.usuarioHora = "";
   }
 
   toJSON() {
     return {
       ocupada: this.ocupada,
       nombre: this.nombre,
       usuario: this.usuario,
       usuarioCI: this.usuarioCI,
       usuarioHora: this.usuarioHora
     };
   }
 }
 