export * from './bindings';
export * from './helpers';

import { NativeContext } from './bindings';

import { Assembly } from './wasm.js';

export function createContext(opts: any = {}): Promise<NativeContext> {
    return WebAssembly.instantiate(Assembly, opts).then(res => new NativeContext(res));
}
