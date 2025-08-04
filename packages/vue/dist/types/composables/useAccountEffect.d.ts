import { type GetAccountReturnType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import type { ConfigParameter } from '../types/properties.js';
import type { DeepMaybeRef } from '../types/ref.js';
export type UseAccountEffectParameters = Compute<DeepMaybeRef<{
    onConnect?(data: Compute<Pick<Extract<GetAccountReturnType, {
        status: 'connected';
    }>, 'address' | 'addresses' | 'chain' | 'chainId' | 'connector'> & {
        isReconnected: boolean;
    }>): void;
    onDisconnect?(): void;
} & ConfigParameter>>;
/** https://wagmi.sh/vue/api/composables/useAccountEffect */
export declare function useAccountEffect(parameters?: UseAccountEffectParameters): void;
//# sourceMappingURL=useAccountEffect.d.ts.map