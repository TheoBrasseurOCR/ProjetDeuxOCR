// Variable API
const api = 'http://localhost:5678/api/'

// Variable imagesContainer = .gallery
const imagesContainer = document.querySelector('.gallery')

// Fonction qui crée l'élément figure
function createWorkFigure(work) {
	const figure = document.createElement('figure')
	const figureCaption = document.createElement('figcaption')
	const figureImage = document.createElement('img')

	figureImage.src = work.imageUrl
	figureImage.alt = work.title
	figureCaption.innerHTML = work.title
	figure.setAttribute('data-id', work.id);
	figure.setAttribute('category-id', work.categoryId)

	figure.appendChild(figureImage)
	figure.appendChild(figureCaption)

	return figure;
}

// AFICHE LES WORKS
// Appel de l'url api + "works" en fin d'url
fetch(api + 'works') // Méthode GET par défaut - permet de demander au serveur une ressource
	.then((response) => response.json())
	.then((data) => {
		// Pour chaque work, création d'un élément afin de display la galerie
		data.forEach((work) => {
			const figure = createWorkFigure(work);
			imagesContainer.appendChild(figure);
		});
	});

//FILTRES
// filtreTous
function filtreTous() {
	//Display toute la galerie
	const elements = document.querySelectorAll('div.gallery figure');
	elements.forEach((element) => {
		// Affiche tous les element avec un display block
		element.style.display = 'block';
	});
}
bouton = document.getElementById('btnTous');
// Au clic sur le bouton, la fonction filtreTous se lance
bouton.addEventListener('click', filtreTous);

// filtreObjet  
function filtreObjet() {
	//Display Objets
	const elements = document.querySelectorAll('div.gallery figure');
	elements.forEach((element) => {
		const categoryId = element.getAttribute('category-id');
		// Si ID de l'element = 1, alors element affichés avec un display block
		if (categoryId === '1') {
			element.style.display = 'block';
			// Si ID =/= 1, alors element cachés avec un display none
		} else {
			element.style.display = 'none';
		}
	});
}
bouton = document.getElementById('btnObjet');
// Au clic sur le bouton, la fonction filtreObjet se lance
bouton.addEventListener('click', filtreObjet);

// filtreAppartements
function filtreAppartements() {
	//Display Appartements
	const elements = document.querySelectorAll('div.gallery figure');
	elements.forEach((element) => {
		const categoryId = element.getAttribute('category-id');
		// Si ID de l'element = 2, alors element affichés avec un display block
		if (categoryId === '2') {
			element.style.display = 'block';
			// Si ID =/= 2, alors element cachés avec un display none
		} else {
			element.style.display = 'none';
		}
	});
}
bouton = document.getElementById('btnAppartement');
// Au clic sur le bouton, la fonction filtreAppartement se lance
bouton.addEventListener('click', filtreAppartements);

// filtreHotelsRestaurants  
function filtreHotelsRestaurants() {
	//Display Hotels & restaurants
	const elements = document.querySelectorAll('div.gallery figure');
	elements.forEach((element) => {
		const categoryId = element.getAttribute('category-id');
		// Si ID de l'element = 3, alors element affichés avec un display block
		if (categoryId === '3') {
			element.style.display = 'block';
			// Si ID =/= 3, alors element cachés avec un display none
		} else {
			element.style.display = 'none';
		}
	});
}
bouton = document.getElementById('btnHotelRestaurant');
// Au clic sur le bouton, la fonction filtreHotelsRestaurants se lance
bouton.addEventListener('click', filtreHotelsRestaurants);

//Fonction qui garde le filtre actif
const boutons = document.querySelectorAll('.bouton-css');

boutons.forEach((bouton) => {
	bouton.addEventListener('click', function() {
		boutons.forEach((bouton) => {
			// L'ancien bouton sélectionné n'est plus selected
			bouton.classList.remove('selected');
		});
		// La classe du bouton cliqué devient selected
		this.classList.add('selected');
		sessionStorage.setItem('boutonSelectionne', this.id);
	});
});