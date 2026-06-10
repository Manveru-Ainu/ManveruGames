/* =====================================================================
   manveru-credit.js  —  Sello "Desarrollado por: [logo manveru]"

   CÓMO USARLO:
   1) Sube ESTE archivo y "manveru-logo.png" a UN solo repo (ej. ManveruGames):
        https://manveru-ainu.github.io/ManveruGames/manveru-credit.js
        https://manveru-ainu.github.io/ManveruGames/manveru-logo.png
   2) En cada proyecto, pega UNA línea antes de </body>:
        <script src="https://manveru-ainu.github.io/ManveruGames/manveru-credit.js"></script>

   Para cambiarlo en TODOS los proyectos, edita solo este archivo.
   ===================================================================== */
(function(){
  "use strict";

  // ---- Ajustes ----
  var MODE     = "footer";   // "footer" = al pie de página (no estorba) | "floating" = esquina flotante
  var LOGO_URL = "https://manveru-ainu.github.io/ManveruGames/manveru-logo.png";
  var LABEL    = "Developed by";
  var LINK     = "https://manveru-ainu.github.io/ManveruGames/"; // "" para que NO sea clic
  var FOOTER_LOGO_W   = 150;  // ancho del logo en el pie (px)
  var FLOATING_LOGO_W = 150;  // ancho del logo en modo flotante (px)
  var FLOATING_POS    = "bottom-right"; // solo aplica en modo flotante

  function build(){
    if(document.getElementById('manveru-credit')) return;
    var img = '<img src="' + LOGO_URL + '" alt="manveru" loading="lazy">';
    var inner = '<span class="mc-label">' + LABEL + '</span>'
              + (LINK ? '<a href="' + LINK + '" target="_blank" rel="noopener">' + img + '</a>' : img);
    var st = document.createElement('style');

    if(MODE === "floating"){
      var pos = {
        "bottom-right":  "right:14px; bottom:12px; align-items:flex-end;",
        "bottom-left":   "left:14px;  bottom:12px; align-items:flex-start;",
        "bottom-center": "left:50%; transform:translateX(-50%); bottom:12px; align-items:center;"
      }[FLOATING_POS] || "right:14px; bottom:12px; align-items:flex-end;";
      st.textContent =
        '#manveru-credit{position:fixed;z-index:2147483000;display:flex;flex-direction:column;' + pos
        + 'gap:3px;opacity:.8;transition:opacity .2s;pointer-events:' + (LINK?'auto':'none') + ';user-select:none;}'
        + '#manveru-credit:hover{opacity:1;}'
        + '#manveru-credit .mc-label{font-family:"Segoe UI",system-ui,sans-serif;font-size:10px;letter-spacing:.14em;'
        + 'text-transform:uppercase;font-weight:700;color:#c9a227;text-shadow:0 1px 3px rgba(0,0,0,.8);}'
        + '#manveru-credit img{width:' + FLOATING_LOGO_W + 'px;height:auto;display:block;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.55);}'
        + '#manveru-credit a{display:block;line-height:0;}';
      var wrap = document.createElement('div'); wrap.id='manveru-credit'; wrap.innerHTML = inner;
      document.body.appendChild(wrap);

    } else { // ----- FOOTER (al pie, en flujo normal, NO tapa el juego) -----
      st.textContent =
        '#manveru-credit{position:static;width:100%;box-sizing:border-box;display:flex;align-items:center;'
        + 'justify-content:center;gap:14px;flex-wrap:wrap;padding:16px 12px;margin-top:24px;'
        + 'background:rgba(0,0,0,.92);border-top:1px solid rgba(201,151,40,.45);user-select:none;}'
        + '#manveru-credit .mc-label{font-family:"Segoe UI",system-ui,sans-serif;font-size:11px;letter-spacing:.16em;'
        + 'text-transform:uppercase;font-weight:700;color:#c9a227;}'
        + '#manveru-credit img{width:' + FOOTER_LOGO_W + 'px;height:auto;display:block;border-radius:6px;}'
        + '#manveru-credit a{display:block;line-height:0;}';
      var foot = document.createElement('footer'); foot.id='manveru-credit'; foot.innerHTML = inner;
      document.body.appendChild(foot);
    }
    document.head.appendChild(st);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  } else { build(); }
})();
