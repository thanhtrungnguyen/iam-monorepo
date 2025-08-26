module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'kebab-case'],
    // enforce app/lib scopes e.g., feat(web): ...
  },
};
