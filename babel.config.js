/* Transpilador de código al igual que typescript, Pasa el código a una versión que el navegador entienda */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
