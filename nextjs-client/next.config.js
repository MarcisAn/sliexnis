/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {},
  async redirects() {
    return [
      {
        source: "/src",
        destination: "https://github.com/marcis-andersons/sliexnis/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/github",
        destination: "https://github.com/marcis-andersons/sliexnis/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/rickastley/",
        permanent: false,
        basePath: false,
      },
    ];
  },
};
