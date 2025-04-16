import { hasInjectionContext, inject, unref } from 'vue-demi';
import { WagmiInjectionContextError, WagmiPluginNotFoundError, } from '../errors/plugin.js';
import { configKey } from '../plugin.js';
/** https://wagmi.sh/vue/api/composables/useConfig */
export function useConfig(parameters_ = {}) {
    const parameters = unref(parameters_);
    // passthrough config if provided
    if (parameters.config)
        return parameters.config;
    // ensures that `inject()` can be used
    if (!hasInjectionContext())
        throw new WagmiInjectionContextError();
    const config = inject(configKey);
    if (!config)
        throw new WagmiPluginNotFoundError();
    return config;
}
//# sourceMappingURL=useConfig.js.map