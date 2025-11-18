document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("urlInput").value = window.location.href;
  document.getElementById("btnMostrar").addEventListener("click", cargarAjax);
});

function detectarPalindromo(){
  let t = document.getElementById("palInput").value.toLowerCase().replace(/[^a-z0-9áéíóú]/g,"");
  let inv = t.split("").reverse().join("");
  document.getElementById("palResultado").textContent = t===inv ? "Sí es palíndromo" : "No es palíndromo";
}

function calcularMayor(){
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  document.getElementById("mayorResultado").textContent = n1===n2 ? "Son iguales" : "El mayor es: " + (n1>n2?n1:n2);
}

function mostrarVocales(){
  let f = document.getElementById("fraseVocales").value.toLowerCase();
  let set = new Set();
  for(let c of f){ if("aeiouáéíóú".includes(c)) set.add(c.normalize("NFD")[0]); }
  document.getElementById("vocalesResultado").textContent = set.size? [...set].join(", "): "Sin vocales";
}

function contarVocales(){
  let f = document.getElementById("fraseConteo").value.toLowerCase();
  let c = {a:0,e:0,i:0,o:0,u:0};
  for(let x of f){
    if("aá".includes(x)) c.a++;
    if("eé".includes(x)) c.e++;
    if("ií".includes(x)) c.i++;
    if("oó".includes(x)) c.o++;
    if("uú".includes(x)) c.u++;
  }
  document.getElementById("conteoResultado").textContent =
    `a=${c.a}
e=${c.e}
i=${c.i}
o=${c.o}
u=${c.u}`;
}

function cargarAjax(){
  let url = document.getElementById("urlInput").value;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = ()=>{
    document.getElementById("estadoPeticion").textContent = xhr.readyState;
    if(xhr.readyState===4){
      document.getElementById("cabeceras").textContent = xhr.getAllResponseHeaders();
      document.getElementById("codigoEstado").textContent = xhr.status + " - " + xhr.statusText;
      document.getElementById("contenidos").textContent = xhr.responseText;
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
