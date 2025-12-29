gh-last-commit-patch commit:
  gh api repos/garretdgrant/anna-bakes-placerville/commits/{{commit}} --jq '.files[].patch' \
  > patches/{{commit}}.patch
