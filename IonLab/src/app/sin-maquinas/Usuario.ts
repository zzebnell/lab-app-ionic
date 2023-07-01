export class Usuario {

   nombre: string;
   ci: string;
   hora: string;

   constructor(nombre: string, ci: string, hora: string) {
      this.nombre = nombre;
      this.ci = ci;
      this.hora = hora;
   }

   toJSON() {
      return {
         nombre: this.nombre,
         ci: this.ci,
         hora: this.hora
      }
   }
}