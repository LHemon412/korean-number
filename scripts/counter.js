function EcrireCookiefreecounterstat(nom, valeur, nombre) {
  var argv = EcrireCookiefreecounterstat.arguments;
  var argc = EcrireCookiefreecounterstat.arguments.length;
  var ladate = new Date();
  ladate.setTime(ladate.getTime() + Number(nombre));
  var path = "/";
  var domain = argc > 4 ? argv[4] : null;
  var secure = argc > 5 ? arg[5] : false;
  //toLocaleString
  document.cookie =
    nom +
    "=" +
    escape(valeur) +
    "; expires=" +
    ladate.toGMTString() +
    (path == null ? "" : "; path=" + path) +
    (domain == null ? "" : "; domain=" + domain) +
    (secure == true ? "; secure" : "");
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1) endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function EcrireCookieGeo(nom, valeur, nombre) {
  var argv = EcrireCookieGeo.arguments;
  var argc = EcrireCookieGeo.arguments.length;
  if (nombre == -1) {
    var ladate = nombre;
    valeur = "";
  } else {
    var ladate = new Date();
    ladate.setTime(ladate.getTime() + Number(nombre) * 1000);
  }
  var expires = argc > 2 ? argv[2] : null;
  var expires = nombre;
  var path = "/";
  var domain = argc > 4 ? argv[4] : null;
  var secure = argc > 5 ? arg[5] : false;
  document.cookie =
    nom +
    "=" +
    escape(valeur) +
    "; expires=" +
    ladate.toUTCString() +
    (path == null ? "" : "; path=" + path) +
    (domain == null ? "" : "; domain=" + domain) +
    (secure == true ? "; secure" : "");
}

function deleteCookie(name, path, domain) {
  if (GetCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? "; path=" + path : "") +
      (domain ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function GetCookiefreecounterstat(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieValfreecounterstat(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}
function getCookieValfreecounterstat(offset) {
  var endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1) endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
var date_init = new Date();
var test_cookie_value_freecounterstat;
var test_cookie_value_freecounterstat_nv;
var init_freecounterstat = 1;
var init_freecounterstat_nv = 1;
var acceptcookiefreecounterstat;

//tester si accepte cookies
acceptcookiefreecounterstat = GetCookiefreecounterstat(
  "acceptcookiefreecounterstat"
);
if (acceptcookiefreecounterstat == null) {
  date = new Date();
  date.setTime(date.getTime() + 1000);
  EcrireCookiefreecounterstat(
    "acceptcookiefreecounterstat",
    "ok",
    "31536000000"
  );
}
acceptcookiefreecounterstat = GetCookiefreecounterstat(
  "acceptcookiefreecounterstat"
);

if (acceptcookiefreecounterstat == "ok") {
  test_cookie_value_freecounterstat = GetCookiefreecounterstat("counter");
  test_cookie_value_freecounterstat_nv = GetCookiefreecounterstat("counter_nv");
  if (test_cookie_value_freecounterstat == null) {
    init_freecounterstat = 0;
    test_cookie_value_freecounterstat = "192a1f4ed7df5df1bf7ed57fe92ed9e5";
    EcrireCookiefreecounterstat(
      "counter",
      test_cookie_value_freecounterstat,
      "23810000"
    );
  }
  if (test_cookie_value_freecounterstat_nv == null) {
    test_cookie_value_freecounterstat_nv = "192a1f4ed7df5df1bf7ed57fe92ed9e5";
    EcrireCookiefreecounterstat(
      "counter_nv",
      test_cookie_value_freecounterstat_nv,
      "31536000000"
    );
    init_freecounterstat_nv = 0;
  }
} else {
  var test_cookie_value_freecounterstat = "no";
  acceptcookiefreecounterstat = "no";
}
init_freecounterstat = 0;
var html_div =
  '<a href="https://www.freecounterstat.com/geozoom.php?c=9e5bx6hl3ypc8ggm53swa6g6ee1w8hzs&base=counter4&type_clic=1" target="_blank"><img border="0" src="https://counter4.freecounterstat.com/private/counter.php?c=9e5bx6hl3ypc8ggm53swa6g6ee1w8hzs&init=' +
  date_init.getTime() +
  "&init_freecounterstat=" +
  init_freecounterstat +
  '&library=library_counters&coef=1.01&type=184&lenght=4&pv=0" border="0"  alt="Click to see detail of visits and stats for this site" title="Click to see detail of visits and stats for this site"/></a>';

var nb_couleur;
if (screen.colorDepth != undefined) {
  nb_couleur = screen.colorDepth;
} else if (screen.pixelDepth != undefined) {
  nb_couleur = screen.pixelDepth;
} else {
  nb_couleur = 0;
}
var browser = parseInt(navigator.appVersion);
if (browser >= 4) {
  var resolution = screen.height + "*" + screen.width;
} else {
  var resolution;
}
if (navigator.appName.indexOf("Microsoft Internet Explorer") != -1) {
  langue = navigator.systemLanguage;
} else {
  langue = navigator.language;
}
langue = langue.substring(0, 2);
var date_freecounterstat = new Date();

var ref = document.referrer;
var bro_nom = "safari";
//if (ref.indexOf(".swf")!=-1 && bro_nom.indexOf("chrome")!=-1){
//ref="https://lhemon412.github.io/";
//ref="NULL";

html_div +=
  '<img style="border:none" src = "https://counter4.optistats.ovh:4433/private/pointeur/pointeur.gif?|9e5bx6hl3ypc8ggm53swa6g6ee1w8hzs|' +
  escape(resolution) +
  "|" +
  escape(langue) +
  "|" +
  escape(nb_couleur) +
  "|" +
  Math.round(date_freecounterstat.getTime() / 1000) +
  "|" +
  test_cookie_value_freecounterstat +
  "|computer|mac|10.15.7|safari|605|Hong+Kong|HK|22.29080|114.15010|Central|China+Mobile+Hong+Kong|28800|" +
  init_freecounterstat_nv +
  "|1712222590|" +
  acceptcookiefreecounterstat +
  "|" +
  escape(document.URL) +
  "|" +
  escape(ref) +
  "|js|182.239.119.75|||&init=" +
  date_init.getTime() +
  '" border="0"  width="1" height="1">';

var xhrarray = {};
var extension1 = false;
var extension2 = false;
var extension3 = false;

function frameMe(u) {
  iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = u;
  document.body.appendChild(iframe);
}

document.getElementById("sfc9e5bx6hl3ypc8ggm53swa6g6ee1w8hzs").innerHTML =
  html_div;

freecounterstat_test_cookie_value = GetCookie("acceptcookie");
if (
  freecounterstat_test_cookie_value == null &&
  freecounterstat_test_cookie_value != "okg"
) {
  EcrireCookieGeo("acceptcookie", "ok", 86400);
}
