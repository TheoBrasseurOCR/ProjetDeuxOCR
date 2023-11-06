const loginStatus = document.getElementById("login")
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')

// Affichage des éléments lorsque l'utilisateur est login
if (JSON.parse(sessionStorage.getItem("isConnected"))) {
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    portfolioModify.style.display = 'flex'
    filtreModify.style.display = 'none'

// Affichage des éléments  lorsque l'utilisateur est logout      
} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    portfolioModify.style.display = 'none'
    filtreModify.style.display = 'flex'
}

// Déconnexion lors du clic sur logout 
logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");
});