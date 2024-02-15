export default {
  build: {
    define: {
      "import.meta.env.VITE_SERVERURL": JSON.stringify(process.env.VITE_SERVERURL),
    },
  },
};
