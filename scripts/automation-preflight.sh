#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

say() {
  printf '[preflight] %s\n' "$*"
}

fail() {
  printf '[preflight] ERROR: %s\n' "$*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

need_cmd git
need_cmd node
need_cmd npm
need_cmd gh
need_cmd curl

detect_git_remote_failure() {
  local stderr_file="$1"

  if grep -qi 'Could not resolve host' "$stderr_file"; then
    fail "cannot reach git remote origin (DNS/network failure resolving github.com)"
  fi

  if grep -qi 'Could not read from remote repository' "$stderr_file"; then
    fail "cannot read from git remote origin; check GitHub access and repository permissions"
  fi

  fail "cannot reach git remote origin: $(tr '\n' ' ' < "$stderr_file" | sed 's/[[:space:]]\\+/ /g')"
}

ensure_writable_dir() {
  local dir="$1"

  [[ -n "$dir" ]] || return 1

  if [[ -d "$dir" ]]; then
    [[ -w "$dir" ]]
    return
  fi

  mkdir -p "$dir" >/dev/null 2>&1 && [[ -w "$dir" ]]
}

resolve_codex_home() {
  local requested="${CODEX_HOME:-}"
  local resolved=""
  local -a candidates=()

  if [[ -n "$requested" ]]; then
    candidates+=("$requested")
  fi

  candidates+=(
    "$HOME/.codex"
    "$HOME/.codex/automations"
    "$ROOT_DIR/.codex"
  )

  for candidate in "${candidates[@]}"; do
    if ensure_writable_dir "$candidate"; then
      resolved="$candidate"
      break
    fi
  done

  [[ -n "$resolved" ]] || fail "could not find or create a writable CODEX_HOME; tried: ${candidates[*]}"

  if [[ -n "$requested" && "$resolved" != "$requested" ]]; then
    say "CODEX_HOME fallback: $requested is unavailable, using $resolved"
  fi

  export CODEX_HOME="$resolved"
}

expected_node="$(tr -d '[:space:]' < .nvmrc)"
actual_node="$(node -p 'process.versions.node')"
actual_major="${actual_node%%.*}"

say "repo: $ROOT_DIR"
say "node: $actual_node"
say "npm: $(npm -v)"

[[ "$actual_major" == "$expected_node" ]] || fail "Node major $actual_major does not match .nvmrc ($expected_node)"

resolve_codex_home
say "CODEX_HOME: $CODEX_HOME"

git remote get-url origin >/dev/null 2>&1 || fail "git remote 'origin' is not configured"
stderr_file="$(mktemp)"
trap 'rm -f "$stderr_file"' EXIT
if ! git ls-remote --exit-code origin HEAD >/dev/null 2>"$stderr_file"; then
  detect_git_remote_failure "$stderr_file"
fi
say "git remote origin reachable"

gh auth status >/dev/null 2>&1 || fail "gh is not authenticated for GitHub"
say "GitHub auth OK"

curl -fsSIL https://www.notion.so >/dev/null 2>&1 || fail "cannot reach Notion"
say "Notion reachable"

if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "git worktree is dirty; automation should start from a clean checkout"
fi
say "git worktree clean"

if [[ ! -d node_modules ]]; then
  fail "node_modules missing; run npm ci before automation"
fi
say "node_modules present"

say "preflight passed"
