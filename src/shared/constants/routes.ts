export const appRoutes = {
  home: '/',
  categoryDetail: (slug: string) => `/categoria/${slug}`,
  ranking: '/ranking',
  about: '/nosotros',
  login: '/auth/login',
  register: '/auth/registro',
  guest: '/auth/invitado',
  sectionDetail: (sectionId: string) => `/comunidad/${sectionId}`,
  confessionDetail: (sectionId: string, confessionId: string) =>
    `/comunidad/${sectionId}/confesiones/${confessionId}`,
  moderation: '/moderacion',
}
