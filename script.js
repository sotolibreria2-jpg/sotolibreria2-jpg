// ======================================
// MENÚ RESPONSIVE
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    const abierto = navbar.classList.toggle("open");

    menuToggle.textContent = abierto ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", abierto);

});

// CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ======================================
// FILTRAR PRODUCTOS
// ======================================

const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

let activeFilter = "todos";

function filterProducts() {

    const search = searchInput.value.toLowerCase().trim();

    let visibleProducts = 0;

    products.forEach(product => {

        const category = product.dataset.category;
        const text = product.innerText.toLowerCase();

        const categoryMatch =
            activeFilter === "todos" ||
            category === activeFilter;

        const searchMatch = text.includes(search);

        const visible = categoryMatch && searchMatch;

        product.hidden = !visible;

        if (visible) visibleProducts++;

    });

    emptyState.hidden = visibleProducts > 0;

}


// ======================================
// BOTONES DE FILTROS
// ======================================

function selectFilter(category) {

    activeFilter = category;

    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === category
        );

    });

    filterProducts();

}

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectFilter(button.dataset.filter);

    });

});


// ======================================
// BUSCADOR
// ======================================

searchInput.addEventListener("input", filterProducts);


// ======================================
// CATEGORÍAS DE LA PORTADA
// ======================================

document.querySelectorAll(".category").forEach(category => {

    category.addEventListener("click", () => {

        selectFilter(category.dataset.category);

    });

});


// ======================================
// FAVORITOS
// ======================================

const counter = document.getElementById("cartCount");

let favorites = [];

try {

    favorites = JSON.parse(
        localStorage.getItem("sotoFavorites")
    ) || [];

} catch (error) {

    favorites = [];

}

function updateFavorites() {

    counter.textContent = favorites.length;

    localStorage.setItem(
        "sotoFavorites",
        JSON.stringify(favorites)
    );

}

products.forEach((product, index) => {

    const button = product.querySelector(".add");

    const isFavorite = favorites.includes(index);

    button.textContent = isFavorite
        ? "✓ En favoritos"
        : "Agregar a favoritos ♡";

    button.classList.toggle("selected", isFavorite);

    button.addEventListener("click", () => {

        if (favorites.includes(index)) {

            favorites = favorites.filter(id => id !== index);

            button.textContent = "Agregar a favoritos ♡";

        } else {

            favorites.push(index);

            button.textContent = "✓ En favoritos";

        }

        button.classList.toggle(
            "selected",
            favorites.includes(index)
        );

        updateFavorites();

    });

});

updateFavorites();


// ======================================
// BOTÓN DE BÚSQUEDA DEL ENCABEZADO
// ======================================

document.getElementById("searchButton")
.addEventListener("click", () => {

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });

    searchInput.focus();

});


// ======================================
// MENSAJE DE BIENVENIDA
// ======================================

console.log(
    "🌴 Bienvenido a SOTO | Librería & Papelería Futurista 💜"
);