// Runtime de Rive (@rive-app/canvas-lite, MIT). Este módulo va en su propio paquete:
// solo se descarga cuando una pieza entra en pantalla (ver scripts/rive.ts).
// El WebAssembly se sirve desde la propia web, no desde una CDN.
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from '@rive-app/canvas-lite';
import wasmUrl from '@rive-app/canvas-lite/rive.wasm?url';

RuntimeLoader.setWasmUrl(wasmUrl);
export { Rive, Layout, Fit, Alignment };
