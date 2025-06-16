/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ['main', 'beta'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'breaking', release: 'major' },
          { type: 'feature', release: 'minor' },
          { type: 'refactor', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'dependabot', release: 'patch' },
          { type: 'test', release: false },
          { type: 'docs', release: false }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        presetConfig: {
          types: [
            { type: 'breaking', section: '🔥 Breaking Changes' },
            { type: 'feature', section: '🎉 Features' },
            { type: 'refactor', section: '🤓 Refactoring' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'ci', section: '💻 CI Changes' },
            { type: 'dependabot', section: '🤖 Dependabot' },
            { type: 'test', section: '🔎 Tests' },
            { type: 'docs', section: '📑 Documentation' }
          ]
        }
      }
    ],
    '@semantic-release/github'[
      ('@semantic-release/exec',
      {
        successCmd: `
          TAG=$(git describe --tags --abbrev=0)
          git tag -f $(echo $TAG | cut -d. -f1)
          git tag -f $(echo $TAG | cut -d. -f1-2)
          git push origin $(echo $TAG | cut -d. -f1) --force
          git push origin $(echo $TAG | cut -d. -f1-2) --force
        `
      })
    ]
  ]
}
