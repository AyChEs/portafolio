// Tokens de movimiento para JavaScript. La fuente es el bloque «TOKENS DE MOVIMIENTO» de
// src/styles/global.css: aquí solo se leen, para que CSS y GSAP compartan los mismos números.
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const num = (n: string, fallback: number) => {
  // El minificador de CSS reescribe `.07s` como `70ms`: sin convertir, un retardo de 70 ms se leía como 70 s
  // y los elementos de un grupo tardaban un minuto en aparecer.
  const raw = css(n), v = parseFloat(raw);
  if (!Number.isFinite(v)) return fallback;
  return /ms\s*$/.test(raw) ? v / 1000 : v;
};
const bezier = (n: string, fallback: string) => (/cubic-bezier\(([^)]+)\)/.exec(css(n))?.[1] ?? fallback).replace(/\s/g, '');

export type Tokens = {
  fast: number; base: number; slow: number; brand: number; page: number; scramble: number; step: number; scene: number;
};

export function tokens(): Tokens {
  return {
    fast: num('--d-fast', 0.2), base: num('--d-base', 0.45), slow: num('--d-slow', 0.9), brand: num('--d-brand', 1.1),
    page: num('--d-page', 0.7), scramble: num('--d-scramble', 0.3), step: num('--step', 0.07), scene: num('--scene', 0.22),
  };
}

// Las curvas se registran en GSAP con los mismos nombres que en CSS: 'out', 'brand' e 'io'.
export function registerEases() {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('out', bezier('--ease-out', '.16,1,.3,1'));
  CustomEase.create('brand', bezier('--ease', '.23,1,.32,1'));
  CustomEase.create('io', bezier('--ease-io', '.65,0,.35,1'));
}
