import { storageKeys, readStorage, writeStorage } from '@/shared/lib/storage'

export type UserRole = 'guest' | 'user' | 'moderator' | 'admin'

export interface MockUserRecord {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}

export interface MockSectionRecord {
  id: 'espol' | 'ucg' | 'udla'
  name: string
  city: string
  headline: string
  description: string
  accent: string
}

export interface MockConfessionRecord {
  id: string
  sectionId: MockSectionRecord['id']
  alias: string
  content: string
  createdAt: string
  ratingTotal: number
  ratingVotes: number
  commentsCount: number
  imageUrl?: string
  status: 'published' | 'hidden' | 'reported'
}

export interface MockCommentRecord {
  id: string
  confessionId: string
  parentId: string | null
  authorName: string
  content: string
  createdAt: string
}

export interface MockReportRecord {
  id: string
  targetType: 'confession' | 'comment'
  targetId: string
  reason: string
  details: string
  createdAt: string
  status: 'open' | 'reviewed'
}

export interface MockSessionRecord {
  accessToken: string
  refreshToken: string
  expiresAt: string
  userId: string
}

export interface MockDatabase {
  users: MockUserRecord[]
  sections: MockSectionRecord[]
  confessions: MockConfessionRecord[]
  comments: MockCommentRecord[]
  reports: MockReportRecord[]
  sessions: MockSessionRecord[]
}

function createSeedDatabase(): MockDatabase {
  return {
    users: [
      {
        id: 'user-1',
        name: 'Ana Rios',
        email: 'ana@campussecret.app',
        password: 'Password123',
        role: 'user',
      },
      {
        id: 'mod-1',
        name: 'Marco Vega',
        email: 'mod@campussecret.app',
        password: 'Password123',
        role: 'moderator',
      },
    ],
    sections: [
      {
        id: 'espol',
        name: 'Confesiones ESPOL',
        city: 'Guayaquil',
        headline: 'Historias entre parciales, laboratorios y rumores del campus.',
        description: 'Publicaciones anonimas sobre clases, biblioteca, cafetines y secretos del dia a dia.',
        accent: '#ffb347',
      },
      {
        id: 'ucg',
        name: 'Confesiones UCG',
        city: 'Guayaquil',
        headline: 'Drama universitario, amistades y anecdotas de pasillo.',
        description: 'Una comunidad para confesiones ligeras, intensas o absurdamente reales.',
        accent: '#7bd389',
      },
      {
        id: 'udla',
        name: 'Confesiones UDLA',
        city: 'Quito',
        headline: 'Postgrados, proyectos y secretos que no se dicen en clase.',
        description: 'Pensada para relatos intensos y confesiones inesperadas con tono de comunidad real.',
        accent: '#7aa6ff',
      },
    ],
    confessions: [
      {
        id: 'conf-1',
        sectionId: 'espol',
        alias: 'Fantasma de FIEC',
        content: 'Me cambie de asiento todo el semestre para sentarme cerca de alguien y nunca me atrevi a hablarle.',
        createdAt: '2026-03-08T14:30:00.000Z',
        ratingTotal: 18,
        ratingVotes: 5,
        commentsCount: 2,
        status: 'published',
      },
      {
        id: 'conf-2',
        sectionId: 'espol',
        alias: 'Cafe 24/7',
        content: 'Entregue el proyecto final con el nombre provisional del archivo y el profesor penso que era conceptual.',
        createdAt: '2026-03-11T10:15:00.000Z',
        ratingTotal: 22,
        ratingVotes: 5,
        commentsCount: 1,
        status: 'published',
      },
      {
        id: 'conf-3',
        sectionId: 'ucg',
        alias: 'Pasillo Norte',
        content: 'Fingi que iba a una tutoria para encontrarme con mi ex y termine entrando de verdad a la tutoria.',
        createdAt: '2026-03-09T19:05:00.000Z',
        ratingTotal: 20,
        ratingVotes: 5,
        commentsCount: 3,
        status: 'reported',
      },
      {
        id: 'conf-4',
        sectionId: 'ucg',
        alias: 'Sin Nombre',
        content: 'Todo el curso cree que soy ordenado, pero mi tesis vive en una carpeta llamada cosas_importantes_final_final.',
        createdAt: '2026-03-10T17:45:00.000Z',
        ratingTotal: 14,
        ratingVotes: 4,
        commentsCount: 0,
        status: 'published',
      },
      {
        id: 'conf-5',
        sectionId: 'udla',
        alias: 'Biblioteca Sur',
        content: 'Le recomende a medio salon una fuente academica y despues note que era un blog cualquiera.',
        createdAt: '2026-03-06T12:00:00.000Z',
        ratingTotal: 17,
        ratingVotes: 4,
        commentsCount: 1,
        status: 'published',
      },
    ],
    comments: [
      {
        id: 'comment-1',
        confessionId: 'conf-1',
        parentId: null,
        authorName: 'Lectora',
        content: 'Esto duele mas de lo que deberia.',
        createdAt: '2026-03-08T16:00:00.000Z',
      },
      {
        id: 'comment-2',
        confessionId: 'conf-1',
        parentId: 'comment-1',
        authorName: 'Anon',
        content: 'Todos hemos estado ahi.',
        createdAt: '2026-03-08T16:18:00.000Z',
      },
      {
        id: 'comment-3',
        confessionId: 'conf-2',
        parentId: null,
        authorName: 'QA del caos',
        content: 'El nombre del archivo siempre te persigue.',
        createdAt: '2026-03-11T12:00:00.000Z',
      },
    ],
    reports: [
      {
        id: 'report-1',
        targetType: 'confession',
        targetId: 'conf-3',
        reason: 'Contenido ofensivo',
        details: 'Tiene lenguaje agresivo hacia otra persona.',
        createdAt: '2026-03-12T10:00:00.000Z',
        status: 'open',
      },
    ],
    sessions: [],
  }
}

let database = readStorage<MockDatabase>(storageKeys.mockDb) ?? createSeedDatabase()

export function getDb() {
  return database
}

export function updateDb(updater: (current: MockDatabase) => MockDatabase) {
  database = updater(database)
  writeStorage(storageKeys.mockDb, database)
  return database
}

export function resetDb() {
  database = createSeedDatabase()
  writeStorage(storageKeys.mockDb, database)
  return database
}
