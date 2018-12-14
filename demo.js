import spandex from './src/spandex'

if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

spandex.init('.ride', 'letter')
spandex.init('.the', 'word')
spandex.init('.lightning', 'line')
