// Variable API
const api = 'http://localhost:5678/api/'

// Login
const element = {
	password: document.querySelector("#password"),
	email: document.querySelector("#email"),
	submit: document.querySelector("#submitUserInfo"),
};

const loginMdpError = document.querySelector(".LoginMdpError");

// Au clic sur le bouton se connecter
let boutonLogin = element.submit.addEventListener("click", (event) => {
	event.preventDefault();

	// Appel de l'API + users/login en fin d'url
	fetch(api + 'users/login', {
			// Méthode POST permet d'envoyer des datas au serveur
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			// Convertit en JSON
			body: JSON.stringify({
				email: element.email.value,
				password: element.password.value,
			}),
		})
		.then((response) => response.json())
		// Fonction fléchée qui envoie les data vers le sessionStorage
		.then((data) => {
			sessionStorage.setItem("Token", data.token);

			// Comparaison des token -> si valide :
			if (data.token) {
				sessionStorage.setItem("isConnected", JSON.stringify(data.token));
				window.location.replace("index.html");

				// Comparaison des token -> si non valide :
			} else {
				const p = document.createElement("p");
				p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
				loginMdpError.appendChild(p)
			}
		})
});