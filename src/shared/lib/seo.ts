import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { appEnv } from '@/shared/constants/env'

const defaultTitle = 'Confesiones EC'
const defaultDescription =
  'Explora comunidades de Ecuador, comparte confesiones anonimas y sigue conversaciones por categoria y comunidad.'
const defaultImageAlt = 'Vista previa de Confesiones EC'

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')

    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value)
    }

    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(selector: string, attributes: Record<string, string>, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')

    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value)
    }

    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function resolveAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl
  }

  const origin = appEnv.siteUrl || window.location.origin
  return new URL(pathOrUrl, origin).toString()
}

interface PageMetaOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  canonicalPath?: string
  noIndex?: boolean
}

export function usePageMeta(titleOrOptions?: string | PageMetaOptions, description = defaultDescription) {
  const location = useLocation()

  useEffect(() => {
    const options =
      typeof titleOrOptions === 'string'
        ? { title: titleOrOptions, description }
        : (titleOrOptions ?? {})
    const pageTitle = options.title
    const pageDescription = options.description ?? defaultDescription
    const fullTitle = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
    const canonicalUrl = resolveAbsoluteUrl(options.canonicalPath ?? location.pathname)
    const imageUrl = resolveAbsoluteUrl(options.image ?? appEnv.defaultOgImage)
    const robots = options.noIndex ? 'noindex, nofollow' : 'index, follow'

    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description' }, pageDescription)
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website')
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, defaultTitle)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, pageDescription)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl)
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, options.imageAlt ?? defaultImageAlt)
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, pageDescription)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl)
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, options.imageAlt ?? defaultImageAlt)
    upsertLink('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl)
  }, [description, location.pathname, titleOrOptions])
}
