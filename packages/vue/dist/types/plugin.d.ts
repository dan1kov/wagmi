import { type ResolvedRegister, type State } from '@wagmi/core';
export declare const configKey: unique symbol;
export type WagmiPluginOptions = {
    config: ResolvedRegister['config'];
    initialState?: State | undefined;
    reconnectOnMount?: boolean | undefined;
};
export declare const WagmiPlugin: {
    install(app: import("vue-demi").App<any>, options: WagmiPluginOptions): void;
};
//# sourceMappingURL=plugin.d.ts.map