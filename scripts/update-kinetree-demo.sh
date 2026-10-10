#!/usr/bin/env bash
# Rebuilds the kinetree Flutter web demo and copies it into public/kinetree-demo.
# Needs podman (or docker: set ENGINE=docker); no local Flutter install required.
# The official Flutter SDK is downloaded once into the "kinetree-flutter-sdk" volume.
#
#   scripts/update-kinetree-demo.sh [path-to-kinetree]   (default: ../kinetree)
#   FLUTTER_VERSION=3.47.7 scripts/update-kinetree-demo.sh   (pin an SDK version)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KINETREE="$(cd "${1:-$ROOT/../kinetree}" && pwd)"
OUT="$ROOT/public/kinetree-demo"
ENGINE="${ENGINE:-podman}"
IMAGE="${BUILD_IMAGE:-ghcr.io/cirruslabs/flutter:stable}"  # used for its build deps
FLUTTER_VERSION="${FLUTTER_VERSION:-latest}"

rm -rf "$OUT"
mkdir -p "$OUT"

# Build from a copy so the kinetree checkout is never touched.
"$ENGINE" run --rm \
  -e FLUTTER_VERSION="$FLUTTER_VERSION" \
  -v kinetree-flutter-sdk:/sdk \
  -v "$KINETREE:/src:ro" \
  -v "$OUT:/out" \
  "$IMAGE" bash -euc '
    base=https://storage.googleapis.com/flutter_infra_release/releases
    archive=$(curl -fsSL "$base/releases_linux.json" | python3 -c "
import json, os, sys
d = json.load(sys.stdin)
v = os.environ[\"FLUTTER_VERSION\"]
h = d[\"current_release\"][\"stable\"]
for r in d[\"releases\"]:
    if r[\"channel\"] == \"stable\" and (r[\"version\"] == v or (v == \"latest\" and r[\"hash\"] == h)):
        print(r[\"archive\"]); break
")
    [ -n "$archive" ] || { echo "Flutter version $FLUTTER_VERSION not found" >&2; exit 1; }
    if [ "$(cat /sdk/archive 2>/dev/null)" != "$archive" ]; then
      rm -rf /sdk/flutter
      curl -fsSL "$base/$archive" | tar -C /sdk -xJf -
      echo "$archive" > /sdk/archive
    fi
    export PATH=/sdk/flutter/bin:$PATH
    git config --global --add safe.directory /sdk/flutter
    flutter --version

    mkdir /work
    tar -C /src --exclude=.git --exclude=build --exclude=.dart_tool -cf - . | tar -C /work -xf -
    cd /work
    flutter pub get
    flutter build web --release --base-href /kinetree-demo/
    cp -r build/web/. /out/
  '

# The app loads CanvasKit from Google's CDN (useLocalCanvasKit is off), so the
# 37 MB local copy is never fetched; keep it out of the portfolio repo.
rm -rf "$OUT/canvaskit"
sed -i 's|<title>[^<]*</title>|<title>Kinetree (demo)</title>|' "$OUT/index.html"
echo "kinetree demo built into $OUT"
