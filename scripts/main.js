async function loadComponent(id, path) {
  const res = await fetch(path)
  const html = await res.text()
  document.getElementById(id).innerHTML = html
}

// cargar navbar
async function init() {
  await loadComponent("navbar", "./components/NavBar.html");
  cargarNavbar();

  await loadComponent("footer", "./components/Footer.html");
  cargarDatos();

  await loadComponent("carrusel", "./components/Carrusel.html");
}

init();