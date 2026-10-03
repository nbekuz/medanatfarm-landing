import { apiClient } from '@/api/client'

export type CheckoutResult = {
  provider: string
  paymentId: string
  status: string
  confirmationUrl?: string | null
  externalId?: string
}

export type PaymentSyncResult = {
  payment?: {
    id?: string
    status?: string
  }
  subscription?: unknown
  status?: string
}

export const paymentsApi = {
  async checkout(input: {
    planCode: string
    returnUrl?: string
  }): Promise<CheckoutResult> {
    const { data } = await apiClient.post<CheckoutResult>('/payments/checkout', {
      planCode: input.planCode,
      returnUrl: input.returnUrl,
    })
    return data
  },

  async sync(paymentId: string): Promise<PaymentSyncResult> {
    const { data } = await apiClient.post<PaymentSyncResult>(
      `/payments/${paymentId}/sync`,
    )
    return data
  },
}
