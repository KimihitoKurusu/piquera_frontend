import { type } from "os";

class Marca {
    id: string;
    nombre: string;
    tiempoKM: number;
    precioKM: number;

    constructor(id: string, nombre: string, tiempoKM: number, precioKM: number) {
        this.id = id;
        this.nombre = nombre;
        this.tiempoKM = tiempoKM;
        this.precioKM = precioKM;
    }
    
    toArray(): Array<any> {
        return [this.id, this.nombre, this.tiempoKM, this.precioKM];
    }

    toString(): string {
        return this.nombre;
    }
}

export type {Marca}