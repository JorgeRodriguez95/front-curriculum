import { Conocimiento } from "./conocimiento";
import { Estudio } from "./estudio";
import { Experiencia } from "./experiencia";

export class Persona {
    id: number;
    nombre: string;
    apellido: string;
    segundoApellido: string;
    correo: string;
    presentacion: string;
    telefono: number;
    rut: number;
    edad: number;
    foto: string;
    experiencias: Experiencia[] = [];
    estudios: Estudio[] = [];
    conocimientos: Conocimiento[] = [];
    fotoPerfilHashCode: string;
    fotoBannerHashCode: string;
}
