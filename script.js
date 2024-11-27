// === Página de Inicio (Login) ===
if (window.location.pathname.includes("index.html")) {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "USER" && password === "PASS") {
            document.getElementById("login-message").innerText = `Inicio de sesión exitoso como ${username}.`;
            sendLoginEmail(username); // Enviar correo con EmailJS
            setTimeout(() => {
                window.location.href = "pagina2.html";
            }, 1000);
        } else {
            document.getElementById("login-message").innerText = "Usuario o contraseña incorrectos.";
        }
    });

    function sendLoginEmail(user) {
        const params = {
            From_Name: "Sistema Web",
            to_email: "victorraul20002015@gmail.com", // Cambia por el correo destinatario
            message: `El usuario ${user} esta utilizando el sistema.`,
        };

        emailjs.send("service_3b29alp", "template_a8a29b5", params).then(
            () => {
                console.log("Correo enviado exitosamente.");
            },
            (error) => {
                console.error("Error al enviar el correo:", error);
            }
        );
    }
}

// === Envío de Correo con EmailJS (API Correo) ===
if (document.getElementById("email-form")) {
    document.getElementById("email-form").addEventListener("submit", sendEmail);
}

// Función para enviar correo
function sendEmail(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Captura los valores del formulario
    const to_email = document.getElementById("to_email").value;
    const message = document.getElementById("message").value;
    const datetime = new Date().toLocaleString();

    // Parámetros para el correo
    const params = {
        From_Name: "Sistema Web", // Nombre genérico para identificar el sistema
        datetime: datetime,
        to_email: to_email, // Correo ingresado por el usuario
        From_Mail: 'victormarin20002015@gmail.com', // Dirección genérica de envío
        message: message,
    };
   console.log(params);
    // Enviar el correo usando EmailJS
    emailjs.send("service_3b29alp", "template_a8a29b5", params).then(
        () => {
            alert("Correo enviado exitosamente.");
            document.getElementById("email-form").reset(); // Limpia el formulario
        },
        (error) => {
            alert("Error al enviar el correo: " + JSON.stringify(error));
            console.error("Error al enviar el correo:", error);
        }
    );
}

function loadImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "Cargando imágenes...";

    fetch("https://api.unsplash.com/photos?client_id=lDgw5d2DLwAAXO7sYU6WWWQDh1f-s576DNh69sdZNk8&per_page=6")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las imágenes: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            gallery.innerHTML = ""; // Limpia el contenido previo

            data.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image.urls.small;
                imgElement.alt = image.alt_description || "Imagen de Unsplash";
                imgElement.classList.add("gallery-image");
                gallery.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error("Error al cargar imágenes:", error);
            gallery.innerHTML = "Error al cargar imágenes.";
        });
}

// === Carga de Noticias desde Newsdata.io ===
// === Carga de Noticias desde Newsdata.io ===
function loadNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "Cargando noticias...";

    fetch("https://newsdata.io/api/1/news?apikey=pub_5388103859f1c8490bb9f69a37e96f46c5108&country=py")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las noticias: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.results;
            newsContainer.innerHTML = ""; // Limpia el contenedor

            if (articles) {
                articles.forEach(article => {
                    const articleElement = document.createElement("div");
                    articleElement.classList.add("article");

                    const titleElement = document.createElement("h2");
                    const linkElement = document.createElement("a");
                    linkElement.href = article.link;
                    linkElement.textContent = article.title;
                    linkElement.target = "_blank";
                    titleElement.appendChild(linkElement);

                    const descriptionElement = document.createElement("p");
                    descriptionElement.textContent = article.description || "Sin descripción disponible";

                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(descriptionElement);

                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = "No se encontraron noticias.";
            }
        })
        .catch(error => {
            console.error("Error al cargar noticias:", error);
            newsContainer.innerHTML = "Error al cargar noticias.";
        });
}



// Función para calcular el precio total (Precio x Cantidad)
function calcularPrecioTotal() {
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    if (isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
        alert("Por favor, ingrese valores válidos para el precio y la cantidad.");
        return;
    }

    const precioTotal = precio * cantidad;
    alert(`El precio total es: $${precioTotal.toFixed(2)}`);
}

// Función para calcular el 30% de descuento sobre el precio total
function calcularDescuento30() {
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    if (isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
        alert("Por favor, ingrese valores válidos para el precio y la cantidad.");
        return;
    }

    const precioTotal = precio * cantidad;
    const descuento = precioTotal * 0.30;
    const precioConDescuento = precioTotal - descuento;

    alert(`El precio con un descuento del 30% es: $${precioConDescuento.toFixed(2)}`);
}

// Función para calcular el 25% de descuento sobre el precio por cantidad
function calcularDescuento25() {
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    if (isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
        alert("Por favor, ingrese valores válidos para el precio y la cantidad.");
        return;
    }

    const precioTotal = precio * cantidad;
    const descuento = precioTotal * 0.25;
    const precioConDescuento = precioTotal - descuento;

    alert(`El precio con un descuento del 25% es: $${precioConDescuento.toFixed(2)}`);
}


// Evento para el envío del formulario
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se recargue al enviar

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("name").value; // Cambié el id de "nombre" a "name"
    const apellido = document.getElementById("surname").value; // Cambié el id de "apellido" a "surname"
    const celular = document.getElementById("cellphone").value; // Este id no estaba en el HTML pero supuse que lo necesitas, puedes cambiarlo si es diferente
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("observations").value; // Cambié el id de "mensaje" a "observations"
    const calificacion = document.getElementById("score").value;  // Este es el campo de calificación

    // Parametros a enviar a EmailJS
    const params = {
        nombre: nombre, // Nombre capturado desde el formulario
        apellido: apellido, // Apellido capturado desde el formulario
        celular: celular, // Celular capturado desde el formulario
        email: email, // Email capturado desde el formulario
        mensaje: mensaje, // Observaciones capturadas desde el formulario
        calificacion: calificacion, // Calificación capturada desde el formulario
        from_name: "Victor Marin", // Nombre de quien envía el correo (valor predeterminado)
        para_: "victorraul20002015@gmail.com", // Dirección predeterminada para el destinatario
    };

    // Enviar el correo usando EmailJS
    emailjs.send("service_3b29alp", "template_3zucqrr", params)
        .then((response) => {
            alert("Correo enviado exitosamente.");
            document.getElementById("form").reset(); // Limpiar el formulario después de enviarlo
        })
        .catch((error) => {
            alert("Error al enviar el correo: " + JSON.stringify(error));
            console.error("Error al enviar el correo:", error);
        });
});
