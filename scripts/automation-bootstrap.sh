#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

say() {
  printf '[bootstrap] %s\n' "$*"
}

fail() {
  printf '[bootstrap] ERROR: %s\n' "$*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

need_cmd git
need_cmd npm

run_repo_cmd() {
  local workdir="$1"
  shift

  if command -v direnv >/dev/null 2>&1; then
    (
      cd "$workdir"
      direnv allow . >/dev/null 2>&1 || true
      direnv exec . "$@"
    )
  else
    (cd "$workdir" && "$@")
  fi
}

detect_git_remote_failure() {
  local stderr_file="$1"

  if grep -qi 'Could not resolve host' "$stderr_file"; then
    fail "cannot reach git remote origin (DNS/network failure resolving github.com)"
  fi

  if grep -qi 'Could not read from remote repository' "$stderr_file"; then
    fail "cannot read from git remote origin; check GitHub access and repository permissions"
  fi

  fail "git fetch origin failed: $(tr '\n' ' ' < "$stderr_file" | sed 's/[[:space:]]\\+/ /g')"
}

stderr_file="$(mktemp)"
trap 'rm -f "$stderr_file"' EXIT

say "repo: $ROOT_DIR"

if ! git fetch origin --prune 2>"$stderr_file"; then
  detect_git_remote_failure "$stderr_file"
fi
say "origin/main fetched"

WORKTREE_PATH="${AUTOMATION_WORKTREE_PATH:-/private/tmp/dekorfabrik-automation-main}"
WORKTREE_REF="${AUTOMATION_WORKTREE_REF:-origin/main}"

if git worktree list --porcelain | rg -q "^worktree ${WORKTREE_PATH}$"; then
  say "removing existing worktree at $WORKTREE_PATH"
  git worktree remove --force "$WORKTREE_PATH"
elif [[ -e "$WORKTREE_PATH" ]]; then
  fail "worktree path already exists and is not managed by git worktree: $WORKTREE_PATH"
fi

git worktree add --detach "$WORKTREE_PATH" "$WORKTREE_REF" >/dev/null
say "fresh worktree ready at $WORKTREE_PATH"

if [[ ! -d "$WORKTREE_PATH/node_modules" ]]; then
  say "node_modules missing in worktree; running npm ci"
  run_repo_cmd "$WORKTREE_PATH" npm ci
else
  say "node_modules already present in worktree"
fi

say "running automation preflight in fresh worktree"
run_repo_cmd "$WORKTREE_PATH" npm run automation:preflight

say "bootstrap passed"
printf '%s\n' "$WORKTREE_PATH"
