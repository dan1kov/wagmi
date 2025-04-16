import { hydrate } from '@wagmi/core';
import { isVue2 } from 'vue-demi';
export const configKey = Symbol();
export const WagmiPlugin = {
    install(app, options) {
        const { config, reconnectOnMount = true } = options;
        if (isVue2) {
            app.mixin({
                beforeCreate() {
                    // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/master/src/apis/inject.ts#L30
                    if (!this._provided) {
                        const provideCache = {};
                        Object.defineProperty(this, '_provided', {
                            get: () => provideCache,
                            set: (v) => Object.assign(provideCache, v),
                        });
                    }
                    this._provided[configKey] = config;
                },
            });
        }
        else {
            app.provide(configKey, config);
        }
        // TODO: check this works in SSR env.
        //       - reconnect on mount.
        //       - hydrate initial state.
        const { onMount } = hydrate(config, { ...options, reconnectOnMount });
        onMount();
    },
};
//# sourceMappingURL=plugin.js.map