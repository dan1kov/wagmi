import { watchBlockNumber, } from '@wagmi/core';
import { computed, watchEffect } from 'vue-demi';
import { deepUnref } from '../utils/cloneDeep.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/vue/api/composables/useWatchBlockNumber */
export function useWatchBlockNumber(parameters_ = {}) {
    const parameters = computed(() => deepUnref(parameters_));
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    watchEffect((onCleanup) => {
        const { chainId = configChainId.value, enabled = true, onBlockNumber, config: _, ...rest } = parameters.value;
        if (!enabled)
            return;
        if (!onBlockNumber)
            return;
        const unwatch = watchBlockNumber(config, {
            ...rest,
            chainId,
            onBlockNumber,
            emitOnBegin: true,
        });
        onCleanup(unwatch);
    });
}
//# sourceMappingURL=useWatchBlockNumber.js.map