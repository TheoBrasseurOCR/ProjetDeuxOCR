// Login
const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};

// Au clic sur le bouton se connecter
let boutonLogin = element.submit.addEventListener("click", (event) => {
    event.preventDefault();

    // Appel de l'API
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: element.email.value,
        password: element.password.value,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("Token", data.token);

            // Comparaison des token -> si non valide :
            if (!data.token) {
                alert("Erreur dans l'identifiant ou le mot de passe");

            // Comparaison des token -> si valide :
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
                alert("Vous êtes maintenant connecté");
            }
        })
});

