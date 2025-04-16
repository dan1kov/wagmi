import { type GetConnectionsReturnType } from '@wagmi/core';
import { type Ref } from 'vue-demi';
import type { ConfigParameter } from '../types/properties.js';
export type UseConnectionsParameters = ConfigParameter;
export type UseConnectionsReturnType = Ref<GetConnectionsReturnType>;
/** https://wagmi.sh/vue/api/composables/useConnections */
export declare function useConnections(parameters?: UseConnectionsParameters): UseConnectionsReturnType;
//# sourceMappingURL=useConnections.d.ts.map