// predefinidos.model.ts

export interface Predefinidos {
    marca: Marca[];
    categoria: Categoria[];
    unidad_medida: UnidadMedida[];
    color: Color[];
  }
  
  export interface Marca {
    // Define las propiedades que esperas para la marca
    id: number;
    nombre: string;
    // Otras propiedades
  }
  
  export interface Categoria {
    // Define las propiedades que esperas para la categoría
    id: number;
    nombre: string;
    // Otras propiedades
  }
  
  export interface UnidadMedida {
    // Define las propiedades que esperas para la unidad de medida
    id: number;
    nombre: string;
    // Otras propiedades
  }
  
  export interface Color {
    // Define las propiedades que esperas para el color
    id: number;
    nombre: string;
    tono: string;
    // Otras propiedades
  }
  