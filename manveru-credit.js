/* =====================================================================
   manveru-credit.js  —  Sello "Desarrollado por: [logo manveru]"

   CÓMO USARLO:
   1) Sube ESTE archivo y "manveru-logo.png" a UN solo repo (por ejemplo
      ManveruGames). Quedarán en:
        https://manveru-ainu.github.io/ManveruGames/manveru-credit.js
        https://manveru-ainu.github.io/ManveruGames/manveru-logo.png
   2) En cada proyecto, pega UNA línea antes de </body>:

        <script src="https://manveru-ainu.github.io/ManveruGames/manveru-credit.js"></script>

   Eso es todo. El sello aparece solo en la esquina. Para cambiarlo en
   TODOS los proyectos, edita solo este archivo.
   ===================================================================== */
(function(){
  "use strict";

  // ---- Ajustes (cámbialos si quieres) ----
  var LOGO_URL = "https://manveru-ainu.github.io/ManveruGames/manveru-logo.png";
  var LABEL    = "Desarrollado por";
  var POSITION = "bottom-right";   // bottom-right | bottom-left | bottom-center
  var WIDTH    = 150;              // ancho del logo en px
  var LINK     = "https://manveru-ainu.github.io/ManveruGames/"; // ponlo en "" para que no sea clic

  var posCss = {
    "bottom-right":  "right:14px; bottom:12px; align-items:flex-end; text-align:right;",
    "bottom-left":   "left:14px;  bottom:12px; align-items:flex-start; text-align:left;",
    "bottom-center": "left:50%; transform:translateX(-50%); bottom:12px; align-items:center; text-align:center;"
  }[POSITION] || "right:14px; bottom:12px; align-items:flex-end;";

  function build(){
    if(document.getElementById('manveru-credit')) return;

    var css =
      '#manveru-credit{position:fixed;z-index:2147483000;display:flex;flex-direction:column;'
      + posCss + 'gap:3px;opacity:.78;transition:opacity .2s ease;pointer-events:'
      + (LINK ? 'auto' : 'none') + ';user-select:none;}'
      + '#manveru-credit:hover{opacity:1;}'
      + '#manveru-credit .mc-label{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;'
      + 'font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;'
      + 'color:#c9a227;text-shadow:0 1px 3px rgba(0,0,0,.8);}'
      + '#manveru-credit img{width:' + WIDTH + 'px;height:auto;display:block;border-radius:8px;'
      + 'box-shadow:0 4px 14px rgba(0,0,0,.55);}'
      + '#manveru-credit a{display:block;line-height:0;}'
      + '@media (max-width:520px){#manveru-credit img{width:' + Math.round(WIDTH*0.72) + 'px;} #manveru-credit{opacity:.7;}}';

    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var wrap = document.createElement('div'); wrap.id = 'manveru-credit';
    var img = '<img src="' + LOGO_URL + '" alt="manveru" loading="lazy">';
    wrap.innerHTML =
      '<span class="mc-label">' + LABEL + '</span>'
      + (LINK ? '<a href="' + LINK + '" target="_blank" rel="noopener">' + img + '</a>' : img);
    document.body.appendChild(wrap);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  } else { build(); }
})();
