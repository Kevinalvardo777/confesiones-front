import { appEnv } from '@/shared/constants/env'
import { AppError } from '@/shared/lib/errors'
import { sanitizeText } from '@/shared/lib/sanitize'
import { getDb, updateDb, type MockCommentRecord, type MockDatabase, type MockSessionRecord } from '@/shared/mocks/db'
import type { ApiSuccess, RequestOptions } from '@/shared/types/api'

function delay() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, appEnv.mockDelayMs)
  })
}

function ok<T>(data: T, meta?: ApiSuccess<T>['meta']) {
  return { data, meta }
}

function parseQuery(path: string) {
  const [pathname, queryString] = path.split('?')
  return {
    pathname,
    params: new URLSearchParams(queryString ?? ''),
  }
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function createSlug(value: string, suffix: string) {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)

  return `${normalized || 'confesion'}-${suffix}`
}

function getSessionFromHeaders(headers: Record<string, string> | undefined, db: MockDatabase) {
  const token = headers?.Authorization?.replace('Bearer ', '')
  if (!token) {
    return null
  }

  return db.sessions.find((session) => session.accessToken === token) ?? null
}

function requireSession(headers: Record<string, string> | undefined, db: MockDatabase) {
  const session = getSessionFromHeaders(headers, db)

  if (!session) {
    throw new AppError({
      code: 'UNAUTHORIZED',
      message: 'Tu sesion no es valida. Inicia sesion otra vez.',
      status: 401,
    })
  }

  return session
}

function buildCurrentUser(session: MockSessionRecord, db: MockDatabase) {
  const user = db.users.find((item) => item.id === session.userId)
  if (!user) {
    throw new AppError({
      code: 'USER_NOT_FOUND',
      message: 'No fue posible recuperar el usuario actual.',
      status: 404,
    })
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isGuest: user.role === 'guest',
  }
}

function averageOf(record: { ratingTotal: number; ratingVotes: number }) {
  return record.ratingVotes ? Number((record.ratingTotal / record.ratingVotes).toFixed(1)) : 0
}

export async function mockRequest<T>(path: string, options: RequestOptions = {}): Promise<ApiSuccess<T>> {
  await delay()

  const method = options.method ?? 'GET'
  const { pathname, params } = parseQuery(path)
  const db = getDb()

  if (pathname === '/auth/me' && method === 'GET') {
    const session = requireSession(options.headers, db)
    return ok(buildCurrentUser(session, db)) as ApiSuccess<T>
  }

  if (pathname === '/auth/login' && method === 'POST') {
    const body = options.body as { email: string; password: string }
    const user = db.users.find((item) => item.email === body.email && item.password === body.password)

    if (!user) {
      throw new AppError({
        code: 'INVALID_CREDENTIALS',
        message: 'Correo o contrasena invalidos.',
        status: 401,
      })
    }

    const session: MockSessionRecord = {
      accessToken: `token-${createId('access')}`,
      refreshToken: `token-${createId('refresh')}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      userId: user.id,
    }

    updateDb((current) => ({
      ...current,
      sessions: [...current.sessions.filter((item) => item.userId !== user.id), session],
    }))

    return ok({
      user: buildCurrentUser(session, getDb()),
      session: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiresAt: session.expiresAt,
      },
    }) as ApiSuccess<T>
  }

  if (pathname === '/auth/register' && method === 'POST') {
    const body = options.body as { name: string; email: string; password: string }
    const email = body.email.toLowerCase()

    if (db.users.some((item) => item.email === email)) {
      throw new AppError({
        code: 'EMAIL_TAKEN',
        message: 'Ese correo ya esta registrado.',
        status: 409,
      })
    }

    const user = {
      id: createId('user'),
      name: sanitizeText(body.name),
      email,
      password: body.password,
      role: 'user' as const,
    }

    const session: MockSessionRecord = {
      accessToken: `token-${createId('access')}`,
      refreshToken: `token-${createId('refresh')}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      userId: user.id,
    }

    updateDb((current) => ({
      ...current,
      users: [...current.users, user],
      sessions: [...current.sessions, session],
    }))

    return ok({
      user: buildCurrentUser(session, getDb()),
      session: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiresAt: session.expiresAt,
      },
    }) as ApiSuccess<T>
  }

  if (pathname === '/auth/guest' && method === 'POST') {
    const guestUser = {
      id: createId('guest'),
      name: 'Invitado',
      email: `${createId('guest')}@guest.local`,
      password: '',
      role: 'guest' as const,
    }

    const session: MockSessionRecord = {
      accessToken: `token-${createId('access')}`,
      refreshToken: `token-${createId('refresh')}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
      userId: guestUser.id,
    }

    updateDb((current) => ({
      ...current,
      users: [...current.users, guestUser],
      sessions: [...current.sessions, session],
    }))

    return ok({
      user: buildCurrentUser(session, getDb()),
      session: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiresAt: session.expiresAt,
      },
    }) as ApiSuccess<T>
  }

  if (pathname === '/auth/refresh' && method === 'POST') {
    const body = options.body as { refreshToken: string }
    const session = db.sessions.find((item) => item.refreshToken === body.refreshToken)

    if (!session) {
      throw new AppError({
        code: 'REFRESH_FAILED',
        message: 'No fue posible refrescar la sesion.',
        status: 401,
      })
    }

    const refreshed = {
      ...session,
      accessToken: `token-${createId('access')}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    }

    updateDb((current) => ({
      ...current,
      sessions: current.sessions.map((item) => (item.refreshToken === session.refreshToken ? refreshed : item)),
    }))

    return ok({
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      expiresAt: refreshed.expiresAt,
    }) as ApiSuccess<T>
  }

  if (pathname === '/auth/logout' && method === 'POST') {
    const session = getSessionFromHeaders(options.headers, db)

    if (session) {
      updateDb((current) => ({
        ...current,
        sessions: current.sessions.filter((item) => item.accessToken !== session.accessToken),
      }))
    }

    return ok({ success: true }) as ApiSuccess<T>
  }

  if (pathname === '/sections' && method === 'GET') {
    return ok(
      db.sections.map((section) => ({
        ...section,
        confessionsCount: db.confessions.filter((item) => item.sectionId === section.id && item.status !== 'hidden').length,
      })),
    ) as ApiSuccess<T>
  }

  if (pathname === '/confessions' && method === 'GET') {
    const sectionId = params.get('sectionId')
    const createdAt = params.get('createdAt')
    const sort = params.get('sort') ?? 'recent'
    let records = db.confessions.filter((item) => item.status !== 'hidden')

    if (sectionId) {
      records = records.filter((item) => item.sectionId === sectionId)
    }

    if (createdAt) {
      records = records.filter((item) => item.createdAt.slice(0, 10) === createdAt)
    }

    records = records.sort((left, right) => {
      if (sort === 'top') {
        const ratingDiff = averageOf(right) - averageOf(left)
        if (ratingDiff !== 0) {
          return ratingDiff
        }
      }

      return Date.parse(right.createdAt) - Date.parse(left.createdAt)
    })

    return ok({
      items: records.map((item) => ({
        ...item,
        averageRating: averageOf(item),
      })),
      page: 1,
      pageSize: records.length,
      total: records.length,
    }) as ApiSuccess<T>
  }

  if (pathname.startsWith('/confessions/') && !pathname.endsWith('/vote') && method === 'GET') {
    const confessionIdentifier = pathname.split('/')[2]
    const record = db.confessions.find(
      (item) => item.id === confessionIdentifier || item.slug === confessionIdentifier,
    )

    if (!record) {
      throw new AppError({
        code: 'CONFESSION_NOT_FOUND',
        message: 'La confesion no existe o fue eliminada.',
        status: 404,
      })
    }

    return ok({
      ...record,
      averageRating: averageOf(record),
    }) as ApiSuccess<T>
  }

  if (pathname === '/confessions' && method === 'POST') {
    requireSession(options.headers, db)
    const body = options.body as { sectionId: string; alias?: string; content: string }
    const id = createId('conf')
    const record = {
      id,
      slug: createSlug(body.alias || body.content, id.slice(-4)),
      sectionId: body.sectionId as MockDatabase['sections'][number]['id'],
      alias: sanitizeText(body.alias || 'Anonimo') || 'Anonimo',
      content: sanitizeText(body.content),
      createdAt: new Date().toISOString(),
      ratingTotal: 0,
      ratingVotes: 0,
      commentsCount: 0,
      status: 'published' as const,
    }

    updateDb((current) => ({
      ...current,
      confessions: [record, ...current.confessions],
    }))

    return ok({
      ...record,
      averageRating: 0,
    }) as ApiSuccess<T>
  }

  if (pathname.endsWith('/vote') && method === 'POST') {
    requireSession(options.headers, db)
    const confessionId = pathname.split('/')[2]
    const body = options.body as { stars: number }
    let updatedRecord = db.confessions.find((item) => item.id === confessionId)

    if (!updatedRecord) {
      throw new AppError({
        code: 'CONFESSION_NOT_FOUND',
        message: 'No pudimos votar esa confesion.',
        status: 404,
      })
    }

    updateDb((current) => ({
      ...current,
      confessions: current.confessions.map((item) => {
        if (item.id !== confessionId) {
          return item
        }

        updatedRecord = {
          ...item,
          ratingTotal: item.ratingTotal + body.stars,
          ratingVotes: item.ratingVotes + 1,
        }

        return updatedRecord
      }),
    }))

    return ok({
      ...updatedRecord,
      averageRating: averageOf(updatedRecord),
    }) as ApiSuccess<T>
  }

  if (pathname === '/comments' && method === 'GET') {
    const confessionId = params.get('confessionId')
    const items = db.comments
      .filter((item) => item.confessionId === confessionId)
      .sort((left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt))

    return ok(items) as ApiSuccess<T>
  }

  if (pathname === '/comments' && method === 'POST') {
    requireSession(options.headers, db)
    const body = options.body as { confessionId: string; content: string; parentId?: string | null; authorName: string }
    const comment: MockCommentRecord = {
      id: createId('comment'),
      confessionId: body.confessionId,
      parentId: body.parentId ?? null,
      authorName: sanitizeText(body.authorName || 'Anonimo') || 'Anonimo',
      content: sanitizeText(body.content),
      createdAt: new Date().toISOString(),
    }

    updateDb((current) => ({
      ...current,
      comments: [...current.comments, comment],
      confessions: current.confessions.map((item) =>
        item.id === body.confessionId ? { ...item, commentsCount: item.commentsCount + 1 } : item,
      ),
    }))

    return ok(comment) as ApiSuccess<T>
  }

  if (pathname === '/reports' && method === 'POST') {
    requireSession(options.headers, db)
    const body = options.body as { targetType: 'confession' | 'comment'; targetId: string; reason: string; details: string }
    const report = {
      id: createId('report'),
      targetType: body.targetType,
      targetId: body.targetId,
      reason: sanitizeText(body.reason),
      details: sanitizeText(body.details),
      createdAt: new Date().toISOString(),
      status: 'open' as const,
    }

    updateDb((current) => ({
      ...current,
      reports: [report, ...current.reports],
      confessions: current.confessions.map((item) =>
        item.id === body.targetId && body.targetType === 'confession' ? { ...item, status: 'reported' } : item,
      ),
    }))

    return ok(report) as ApiSuccess<T>
  }

  if (pathname === '/reports' && method === 'GET') {
    const session = requireSession(options.headers, db)
    const user = buildCurrentUser(session, db)

    if (!['moderator', 'admin'].includes(user.role)) {
      throw new AppError({
        code: 'FORBIDDEN',
        message: 'No tienes permisos para revisar reportes.',
        status: 403,
      })
    }

    return ok(db.reports) as ApiSuccess<T>
  }

  if (pathname.startsWith('/reports/') && method === 'PATCH') {
    const session = requireSession(options.headers, db)
    const user = buildCurrentUser(session, db)

    if (!['moderator', 'admin'].includes(user.role)) {
      throw new AppError({
        code: 'FORBIDDEN',
        message: 'No tienes permisos para moderar reportes.',
        status: 403,
      })
    }

    const reportId = pathname.split('/')[2]
    let updated = db.reports.find((item) => item.id === reportId)

    if (!updated) {
      throw new AppError({
        code: 'REPORT_NOT_FOUND',
        message: 'El reporte ya no existe.',
        status: 404,
      })
    }

    updateDb((current) => ({
      ...current,
      reports: current.reports.map((item) => {
        if (item.id !== reportId) {
          return item
        }

        updated = {
          ...item,
          status: 'reviewed',
        }
        return updated
      }),
    }))

    return ok(updated) as ApiSuccess<T>
  }

  if (pathname === '/ranking' && method === 'GET') {
    const scope = params.get('scope') ?? 'global'
    const sectionId = params.get('sectionId')
    const items = db.confessions
      .filter((item) => item.status !== 'hidden')
      .filter((item) => (scope === 'section' && sectionId ? item.sectionId === sectionId : true))
      .sort((left, right) => {
        const averageDiff = averageOf(right) - averageOf(left)
        if (averageDiff !== 0) {
          return averageDiff
        }

        return right.ratingVotes - left.ratingVotes
      })
      .slice(0, 6)
      .map((item) => ({
        ...item,
        averageRating: averageOf(item),
      }))

    return ok(items) as ApiSuccess<T>
  }

  throw new AppError({
    code: 'MOCK_ROUTE_NOT_FOUND',
    message: `No existe un mock para ${method} ${pathname}.`,
    status: 404,
  })
}
