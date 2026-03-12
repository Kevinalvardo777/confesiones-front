import type { Section } from '../types/confession'

export const sections: Section[] = [
  {
    id: 'espol',
    name: 'Confesiones ESPOL',
    city: 'Guayaquil',
    headline: 'La vida en campus entre parciales, cafetines y rumores.',
    description: 'Comparte historias del laboratorio, la biblioteca o el bloque donde todo el mundo termina enterándose.',
    accent: '#ffb347',
  },
  {
    id: 'ucg',
    name: 'Confesiones UCG',
    city: 'Guayaquil',
    headline: 'Historias que nacen entre pasillos, amistades y drama universitario.',
    description: 'Una sección para anécdotas anónimas sobre clases, fiestas, crushes y caos académico.',
    accent: '#7bd389',
  },
  {
    id: 'udla',
    name: 'Confesiones UDLA',
    city: 'Quito',
    headline: 'Postgrados, proyectos y secretos que no llegan al aula.',
    description: 'Pensada para relatos intensos, confesiones inesperadas y el lado menos formal de la universidad.',
    accent: '#7aa6ff',
  },
]
