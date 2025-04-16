import type { Preference, ProviderInterface, createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import type { Compute, Mutable, Omit } from '@wagmi/core/internal';
import type { CoinbaseWalletProvider as CBW_Provider, CoinbaseWalletSDK as CBW_SDK } from 'cbw-sdk';
import { type Address } from 'viem';
type Version = '3' | '4';
export type CoinbaseWalletParameters<version extends Version = '3'> = version extends '4' ? Compute<{
    headlessMode?: false | undefined;
    /** Coinbase Wallet SDK version */
    version?: version | '3' | undefined;
} & Version4Parameters> : Compute<{
    /**
     * @deprecated `headlessMode` will be removed in the next major version. Upgrade to `version: '4'`.
     */
    headlessMode?: true | undefined;
    /**
     * Coinbase Wallet SDK version
     * @deprecated Version 3 will be removed in the next major version. Upgrade to `version: '4'`.
     * @default '4'
     */
    version?: version | '4' | undefined;
} & Version3Parameters>;
export declare function coinbaseWallet<version extends Version>(parameters?: CoinbaseWalletParameters<version>): version extends '4' ? ReturnType<typeof version4> : ReturnType<typeof version3>;
export declare namespace coinbaseWallet {
    var type: "coinbaseWallet";
}
type Version4Parameters = Mutable<Omit<Parameters<typeof createCoinbaseWalletSDK>[0], 'appChainIds' | 'preference'> & {
    /**
     * Preference for the type of wallet to display.
     * @default 'all'
     */
    preference?: Preference['options'] | Compute<Preference> | undefined;
}>;
declare function version4(parameters: Version4Parameters): import("@wagmi/core").CreateConnectorFn<ProviderInterface & {
    close?(): void;
}, {
    connect(parameters?: {
        chainId?: number | undefined;
        instantOnboarding?: boolean | undefined;
        isReconnecting?: boolean | undefined;
    }): Promise<{
        accounts: readonly Address[];
        chainId: number;
    }>;
}, Record<string, unknown>>;
type Version3Parameters = Mutable<Omit<ConstructorParameters<typeof CBW_SDK>[0], 'reloadOnDisconnect'>> & {
    /**
     * Fallback Ethereum JSON RPC URL
     * @default ""
     */
    jsonRpcUrl?: string | undefined;
    /**
     * Fallback Ethereum Chain ID
     * @default 1
     */
    chainId?: number | undefined;
    /**
     * Whether or not to reload dapp automatically after disconnect.
     * @default false
     */
    reloadOnDisconnect?: boolean | undefined;
};
declare function version3(parameters: Version3Parameters): import("@wagmi/core").CreateConnectorFn<CBW_Provider, Record<string, unknown>, Record<string, unknown>>;
export {};
//# sourceMappingURL=coinbaseWallet.d.ts.map