#!/usr/bin/env bash
# Brand-name gate for The Jordan Insurance Agency.
# Usage: scripts/check-brand-name.sh <file-or-folder> [...]
# Fails (exit 1) if a forbidden variant appears in any file's contents or in any file/folder name.
# Rules: references/brand-name-rules.md (the only file skipped).
set -uo pipefail

[ $# -eq 0 ] && { echo "usage: $0 <file-or-folder> [...]"; exit 2; }

# Perl regexes. Lookbehind enforces a capital "The" directly before the full name.
patterns=(
  '(?<!The )Jordan Insurance Agency'
  '\bJordan Insurance\b(?! Agency)'
  '\bJordan Agency\b'
  '(?i)\bt?jia\b'
)

fail=0
files=$(find "$@" -type f ! -path '*/.git/*' ! -name 'brand-name-rules.md' ! -name 'check-brand-name.sh')

# 1. File and folder names
while IFS= read -r path; do
  [ -z "$path" ] && continue
  if printf '%s' "$path" | grep -qiP '(^|[^a-z])t?jia([^a-z]|$)'; then
    echo "NAME   $path"
    fail=1
  fi
done < <(find "$@" ! -path '*/.git/*')

# 2. Text contents (binary files skipped)
for f in $files; do
  grep -Iq . "$f" 2>/dev/null || continue
  for p in "${patterns[@]}"; do
    hits=$(grep -nP "$p" "$f" 2>/dev/null)
    if [ -n "$hits" ]; then
      while IFS= read -r h; do echo "TEXT   $f:$h"; done <<< "$hits"
      fail=1
    fi
  done
done

if [ $fail -eq 1 ]; then
  echo
  echo "FAILED: the only allowed name is \"The Jordan Insurance Agency\" (slug: the-jordan-insurance-agency)."
  exit 1
fi
echo "PASS: brand name is correct everywhere checked."
