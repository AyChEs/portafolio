#!/bin/sh
# Construye las piezas de Rive (solo RML, sin scripts) y copia los .riv a public/rive/.
# Un archivo sin scripts funciona en los runtimes web sin firmar: no hace falta login ni --publish.
# Uso: sh rive/build.sh   (o npm run rive:build). La CLI se busca en $RIVE o en ~/.rive/bin/rive.
set -e
cd "$(dirname "$0")"
RIVE="${RIVE:-$HOME/.rive/bin/rive}"
mkdir -p ../public/rive
for d in */; do
  d="${d%/}"
  "$RIVE" "$d" --verify
  "$RIVE" "$d" --once
  cp "$d/build/$d.riv" "../public/rive/$d.riv"
done
ls -l ../public/rive/*.riv
