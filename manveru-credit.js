/* =====================================================================
   manveru-credit.js  —  Sello "Developed by: [logo manveru]"

   CÓMO USARLO:
   1) Sube ESTE archivo y "manveru-logo.png" a UN solo repo (ej. ManveruGames).
   2) En cada proyecto, pega UNA línea antes de </body>:
        <script src="https://manveru-ainu.github.io/ManveruGames/manveru-credit.js"></script>

   Esta versión se RE-INYECTA sola si el juego reconstruye la página.
   Para cambiarlo en TODOS los proyectos, edita solo este archivo.
   ===================================================================== */
(function(){
  "use strict";

  // ---- Ajustes ----
  var MODE     = "footer";   // "footer" = al pie de página | "floating" = esquina flotante
  var LOGO_URL = "https://manveru-ainu.github.io/ManveruGames/manveru-logo.png";
  var LABEL    = "Developed by";
  var LINK     = "https://manveru-ainu.github.io/ManveruGames/"; // "" para que NO sea clic
  var FOOTER_LOGO_W   = 150;
  var FLOATING_LOGO_W = 150;
  var FLOATING_POS    = "bottom-right";

  var STYLE_ID = "manveru-credit-style";
  var EL_ID    = "manveru-credit";

  function injectStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var st = document.createElement('style'); st.id = STYLE_ID;
    if(MODE === "floating"){
      var pos = {
        "bottom-right":  "right:14px; bottom:12px; align-items:flex-end;",
        "bottom-left":   "left:14px;  bottom:12px; align-items:flex-start;",
        "bottom-center": "left:50%; transform:translateX(-50%); bottom:12px; align-items:center;"
      }[FLOATING_POS] || "right:14px; bottom:12px; align-items:flex-end;";
      st.textContent =
        '#'+EL_ID+'{position:fixed;z-index:2147483000;display:flex;flex-direction:column;' + pos
        + 'gap:3px;opacity:.8;transition:opacity .2s;pointer-events:' + (LINK?'auto':'none') + ';user-select:none;}'
        + '#'+EL_ID+':hover{opacity:1;}'
        + '#'+EL_ID+' .mc-label{font-family:"Segoe UI",system-ui,sans-serif;font-size:10px;letter-spacing:.14em;'
        + 'text-transform:uppercase;font-weight:700;color:#c9a227;text-shadow:0 1px 3px rgba(0,0,0,.8);}'
        + '#'+EL_ID+' img{width:' + FLOATING_LOGO_W + 'px;height:auto;display:block;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.55);}'
        + '#'+EL_ID+' a{display:block;line-height:0;}';
    } else {
      st.textContent =
        '#'+EL_ID+'{position:static;width:100%;box-sizing:border-box;display:flex;align-items:center;'
        + 'justify-content:center;gap:14px;flex-wrap:wrap;padding:16px 12px;margin-top:24px;'
        + 'background:rgba(0,0,0,.92);border-top:1px solid rgba(201,151,40,.45);user-select:none;}'
        + '#'+EL_ID+' .mc-label{font-family:"Segoe UI",system-ui,sans-serif;font-size:11px;letter-spacing:.16em;'
        + 'text-transform:uppercase;font-weight:700;color:#c9a227;}'
        + '#'+EL_ID+' img{width:' + FOOTER_LOGO_W + 'px;height:auto;display:block;border-radius:6px;}'
        + '#'+EL_ID+' a{display:block;line-height:0;}';
    }
    (document.head || document.documentElement).appendChild(st);
  }

  function makeEl(){
    var img = '<img src="' + LOGO_URL + '" alt="manveru" loading="lazy">';
    var inner = '<span class="mc-label">' + LABEL + '</span>'
              + (LINK ? '<a href="' + LINK + '" target="_blank" rel="noopener">' + img + '</a>' : img);
    var el = document.createElement(MODE === "floating" ? 'div' : 'footer');
    el.id = EL_ID; el.innerHTML = inner;
    return el;
  }

  // Reinyecta el sello si no está presente (por si el juego reconstruye la página)
  function ensure(){
    if(!document.body) return;
    injectStyle();
    if(!document.getElementById(EL_ID)){
      document.body.appendChild(makeEl());
    }
  }

  function start(){
    ensure();
    // Vigila cambios en la página y reinyecta si el juego borró el sello
    try{
      var pending = false;
      var obs = new MutationObserver(function(){
        if(pending) return;
        pending = true;
        requestAnimationFrame(function(){ pending = false; ensure(); });
      });
      obs.observe(document.documentElement, {childList:true, subtree:true});
    }catch(e){}
    // Refuerzo: revisa de nuevo cuando todo terminó de cargar
    window.addEventListener('load', ensure);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
})();
