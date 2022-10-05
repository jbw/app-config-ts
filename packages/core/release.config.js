module.exports = {
  pkgRoot: 'dist',
  branches: ['main', { name: 'beta', prerelease: true }, { name: 'alpha', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    {
      assets: ['CHANGELOG.md'],
    },
  ],
};
