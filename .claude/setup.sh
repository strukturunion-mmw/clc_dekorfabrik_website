#!/usr/bin/env bash
# Pre-install npm dependencies so Claude Code sessions start with a ready
# node_modules tree (and therefore can run lint/build without waiting).
set -euo pipefail

cd "$(dirname "$0")/.."

npm ci
