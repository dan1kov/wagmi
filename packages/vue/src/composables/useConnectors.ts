import {
  type Config,
  type GetConnectorsReturnType,
  type ResolvedRegister,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'
import { type Ref, onScopeDispose, ref } from 'vue-demi'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectorsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConnectorsReturnType<config extends Config = Config> = Ref<
  GetConnectorsReturnType<config>
>

/** https://wagmi.sh/vue/api/composables/useConnectors */
export function useConnectors<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectorsParameters<config> = {},
): UseConnectorsReturnType<config> {
  const config = useConfig(parameters)

  const connectors = ref(getConnectors(config))
  const unsubscribe = watchConnectors(config, {
    onChange(data) {
      connectors.value = data as never
    },
  })
  onScopeDispose(() => unsubscribe())

  return connectors
}
