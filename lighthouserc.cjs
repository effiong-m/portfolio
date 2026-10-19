const rawBase = process.env.BASE_URL || '';

const base = rawBase
  ? `/${rawBase.replace(/^\/+|\/+$/g, '')}`
  : '';

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'pnpm astro preview',

      url: [
        `http://localhost:4321${base}/`,
        `http://localhost:4321${base}/projects/`,
        `http://localhost:4321${base}/experience/`,
      ],
    },

    upload: {
      target: 'temporary-public-storage',
    },
  },
};