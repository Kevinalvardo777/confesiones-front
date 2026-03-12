import type { Confession } from '../types/confession'

export const initialConfessions: Confession[] = [
  {
    id: 'espol-001',
    sectionId: 'espol',
    authorAlias: 'Anon de FIEC',
    content: 'Me cambié de asiento todo el semestre solo para sentarme cerca de alguien y jamás me atreví a hablarle.',
    createdAt: '2026-03-08T14:30:00.000Z',
    ratingTotal: 18,
    ratingVotes: 5,
  },
  {
    id: 'espol-002',
    sectionId: 'espol',
    authorAlias: 'Café 24/7',
    content: 'Entregué el proyecto final usando el nombre provisional del archivo y el profe creyó que era conceptual.',
    createdAt: '2026-03-11T10:15:00.000Z',
    ratingTotal: 22,
    ratingVotes: 5,
  },
  {
    id: 'ucg-001',
    sectionId: 'ucg',
    authorAlias: 'Pasillo Norte',
    content: 'Fingí que iba a una tutoría para encontrarme con mi ex y terminé entrando de verdad a la tutoría.',
    createdAt: '2026-03-09T19:05:00.000Z',
    ratingTotal: 20,
    ratingVotes: 5,
  },
  {
    id: 'ucg-002',
    sectionId: 'ucg',
    authorAlias: 'Sin Nombre',
    content: 'Todo el curso cree que soy extremadamente ordenado, pero mi tesis vive en una carpeta que dice cosas_importantes_final_final.',
    createdAt: '2026-03-10T17:45:00.000Z',
    ratingTotal: 14,
    ratingVotes: 4,
  },
  {
    id: 'udla-001',
    sectionId: 'udla',
    authorAlias: 'Biblioteca Sur',
    content: 'Le recomendé a medio salón una fuente académica y recién después noté que era un blog cualquiera.',
    createdAt: '2026-03-06T12:00:00.000Z',
    ratingTotal: 17,
    ratingVotes: 4,
  },
]
