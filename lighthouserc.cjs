const base = process.env.BASE_URL || '';

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'pnpm astro preview',
      url: [
        `http://localhost:4321${base}/`,
        `http://localhost:4321${base}/projects/`,
        `http://localhost:4321${base}/experience/`,
      ].map((url) => url.replace(/([^:])\/\//g, '$1/')),
    },
    upload: {
      target: 'temporary-public-storage',
      // target: 'lhci',
      // serverBaseUrl: process.env.PUBLIC_LHCI_BASE_URL,
      // token: process.env.LHCI_TOKEN,
    },
  },
};
