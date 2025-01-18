
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/cominvi_practica',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/cominvi_practica/ordenes"
  },
  {
    "renderMode": 2,
    "route": "/cominvi_practica/usuarios"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cominvi_practica/ordenes",
    "route": "/cominvi_practica/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24956, hash: 'a4d050b0f4a210b07015147b7eecb34ed84599d65c4a29889330281a57f9bf06', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17943, hash: '2e858a2db0c8d69e8c0a2b6c98eaf58705858d59621c2617e59655b1c99bf5c8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'usuarios/index.html': {size: 29710, hash: 'e0c06acf0fe3b541904628bcb886006d1e53350022fde7f687ddd5e35d4f1346', text: () => import('./assets-chunks/usuarios_index_html.mjs').then(m => m.default)},
    'ordenes/index.html': {size: 29478, hash: 'eee06439ff713dd49dc57c8aa13dd0849be53c2d170ae9c5f31bb6fa3b683f6e', text: () => import('./assets-chunks/ordenes_index_html.mjs').then(m => m.default)},
    'main-VWNZLXGY.css': {size: 73287, hash: 'fFT2J0MguRk', text: () => import('./assets-chunks/main-VWNZLXGY_css.mjs').then(m => m.default)},
    'main.server.css': {size: 73287, hash: 'fFT2J0MguRk', text: () => import('./assets-chunks/main_server_css.mjs').then(m => m.default)},
    'styles-WHPXZCWF.css': {size: 7611, hash: '3e6StsAyv8M', text: () => import('./assets-chunks/styles-WHPXZCWF_css.mjs').then(m => m.default)}
  },
};
