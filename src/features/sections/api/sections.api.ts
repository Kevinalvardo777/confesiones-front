import { httpClient } from '@/shared/api/httpClient'
import type { Community } from '@/features/sections/types/section.types'

export const communitiesApi = {
  async list() {
    const response = await httpClient.get<Community[]>('/communities', { auth: false })
    return response.data
  },
}
