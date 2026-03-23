import { httpClient } from '@/shared/api/httpClient'
import type { Category, CategoryCommunitiesResponse } from '@/features/categories/types/category.types'

export const categoriesApi = {
  async list() {
    const response = await httpClient.get<Category[]>('/categories', { auth: false })
    return response.data
  },
  async communitiesBySlug(slug: string) {
    const response = await httpClient.get<CategoryCommunitiesResponse>(`/categories/${slug}/communities`, {
      auth: false,
    })
    return response.data
  },
}
