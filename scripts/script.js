const asistencias = {
  data: [
    { id: 1, nombre: "Preguntas Frecuentes" },
    { id: 2, nombre: "Productos" },
    { id: 3, nombre: "Pedidos" },
    { id: 4, nombre: "Métodos de pago" },
    { id: 5, nombre: "Envíos" },
  ],
};


async function cargarDatos() {

  const [
    generosRes,
    categoriasRes,
    coloresRes,
    marcasRes,
    proveedoresRes
  ] = await Promise.all([
    fetch("../JSON/genero.json"),
    fetch("../JSON/categorias.json"),
    fetch("../JSON/colores.json"),
    fetch("../JSON/marcas.json"),
    fetch("../JSON/proveedor.json")
  ])


  const contenedor = document.getElementById("productos");

  // traer datos
  const generos = await generosRes.json();
  const categorias = await categoriasRes.json();

  // generar HTML
  const htmlGeneros = generos.map(genero => `
    <li class="hover:underline">
      <a href="#">${genero.nombre}</a>
    </li>
  `).join("");

  const htmlCategorias = categorias.map(categoria => `
    <li class="hover:underline">
      <a href="#">${categoria.name}</a>
    </li>
  `).join("");

  // insertar en el DOM
  contenedor.innerHTML = htmlGeneros + htmlCategorias;


  // Insertar datos de colores
  const colores = await coloresRes.json();

  const contenedorColores = document.getElementById("colores");
  const htmlColores = colores.map(color => `
    <li class="hover:underline">
      <a href="#">${color.nombre}</a>
    </li>
  `).join("");
  contenedorColores.innerHTML = htmlColores;

  // Insertar datos de marcas
  const marcas = await marcasRes.json();
  
  const contenedorMarcas = document.getElementById("marcas");
  const htmlMarcas = marcas.map(marca => `
    <li class="hover:underline">
      <a href="#">${marca.nombre}</a>
    </li>
  `).join("");
  contenedorMarcas.innerHTML = htmlMarcas;

  // Insertar datos de asistencias
  const contenedorAsistencias = document.getElementById("asistencias");
  const htmlAsistencias = asistencias.data.map(asistencia => `
    <li class="hover:underline">
      <a href="#">${asistencia.nombre}</a>
    </li>
  `).join("");
  contenedorAsistencias.innerHTML = htmlAsistencias;

  // Insertar copy
  const copyContenedor = document.getElementById("copy");
  copyContenedor.textContent = `© ${new Date().getFullYear()} Luxury Clothes`;


  const contenedorProveedor = document.getElementById("proveedores")

  const proveedores = await proveedoresRes.json()

  const html = proveedores
    .filter(p => p.id !== 5) // 👈 equivalente a tu condición
    .map(proveedor => `
      <div class="flex items-center space-x-4">
        <div class="w-16 h-7 bg-white flex items-center justify-center rounded-lg">
          <img
            src="${proveedor.url}"
            alt="${proveedor.nombre}"
            class="w-12 h-7 object-cover scale-110"
          />
        </div>
      </div>
    `)
    .join("")

  contenedorProveedor.innerHTML = html
}

cargarDatos()