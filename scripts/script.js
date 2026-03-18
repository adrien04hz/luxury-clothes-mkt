const asistencias = {
  data: [
    { id: 1, nombre: "Preguntas Frecuentes" },
    { id: 2, nombre: "Productos" },
    { id: 3, nombre: "Pedidos" },
    { id: 4, nombre: "Métodos de pago" },
    { id: 5, nombre: "Envíos" },
    { id: 6, nombre: "Nosotros"},
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
    fetch("./JSON/genero.json"),
    fetch("./JSON/categorias.json"),
    fetch("./JSON/colores.json"),
    fetch("./JSON/marcas.json"),
    fetch("./JSON/proveedor.json")
  ])


  const contenedor = document.getElementById("productos");

  // traer datos
  const generos = await generosRes.json();
  const categorias = await categoriasRes.json();

  // generar HTML
  const htmlGeneros = generos.data.map(genero => `
    <li class="hover:underline">
      <a href="#">${genero.nombre}</a>
    </li>
  `).join("");

  const htmlCategorias = categorias.data.map(categoria => `
    <li class="hover:underline">
      <a href="#">${categoria.name}</a>
    </li>
  `).join("");

  // insertar en el DOM
  contenedor.innerHTML = htmlGeneros + htmlCategorias;


  // Insertar datos de colores
  const colores = await coloresRes.json();

  const contenedorColores = document.getElementById("colores");
  const htmlColores = colores.data.map(color => `
    <li class="hover:underline">
      <a href="#">${color.nombre}</a>
    </li>
  `).join("");
  contenedorColores.innerHTML = htmlColores;

  // Insertar datos de marcas
  const marcas = await marcasRes.json();
  
  const contenedorMarcas = document.getElementById("marcas");
  const htmlMarcas = marcas.data.map(marca => `
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

  const html = proveedores.data
    .filter(p => p.id !== 5) // 👈 equivalente a tu condición
    .map(proveedor => `
      <div class="flex items-center space-x-4">
        <div class="w-16 h-7 bg-white flex items-center justify-center rounded-lg">
          <img
            src="${proveedor.url}"
            alt="${proveedor.nombre}"
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    `)
    .join("")

  contenedorProveedor.innerHTML = html
}

// Ejecutar la función para cargar los datos al inicio

// Función para navbar
async function cargarNavbar() {
  const [generosRes, categoriasRes] = await Promise.all([
    fetch("./JSON/genero.json"),
    fetch("./JSON/categorias.json")
  ]);

  const contenedor = document.getElementById("categoriaNav")

  const categorias = await categoriasRes.json()

  const html = categorias.data.map(categoria => `
    <div>
      <p class="font-semibold mb-3">
        <a href="#">${categoria.name.toUpperCase()}</a>
      </p>

      <ul class="space-y-2 text-gray-600">
        ${categoria.subcategories.map(sub => `
          <li class="hover:underline cursor-pointer">
            <a href="#">${sub.nombre}</a>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("")

  contenedor.innerHTML = html


  // Contenedor de la UL principal del navbar
  const container = document.getElementById("principalUL");

  const generos = await generosRes.json()

  const html2 = generos.data.slice(0, 3).map(genero => `
    
    <li class="group hover:underline relative">
      <a href="#">${genero.nombre.toUpperCase()}</a>

      <!-- Mega menú -->
      <div class="
        fixed left-0 top-28 w-full
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-300
        bg-white text-black shadow-xl py-10
      ">
        <div class="max-w-6xl mx-auto grid grid-cols-3 gap-8 px-8">

          ${categorias.data.map(categoria => `
            <div>
              <p class="font-semibold mb-3">
                <a href="#">${categoria.name.toUpperCase()}</a>
              </p>

              <ul class="space-y-2 text-gray-600">
                ${categoria.subcategories.map(sub => `
                  <li class="hover:underline cursor-pointer">
                    <a href="#">${sub.nombre}</a>
                  </li>
                `).join("")}
              </ul>
            </div>
          `).join("")}

        </div>
      </div>

    </li>

  `).join("")
  
  container.insertAdjacentHTML("beforeend", html2);
}