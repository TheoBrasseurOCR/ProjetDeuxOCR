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

// Affiche les works
fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createWorkFigure(work);
      imagesContainer.appendChild(figure);
    });
  });
    
//FILTRES

// filtreTous
function filtreTous(){

    //Display toute la galerie
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        element.style.display = 'block';
    });   
}
bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);

// filtreObjet  
function filtreObjet(){
    
    //Display Objects
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
      const categoryId = element.getAttribute('category-id');
      if (categoryId === '1') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
}
bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
     
// filtreAppartements
function filtreAppartements(){

    //Display Appartements
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '2') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}
bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);
       
// filtreHotelsRestaurants  
function filtreHotelsRestaurants(){

    //Display Hotels & restaurants
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
      const categoryId = element.getAttribute('category-id');
      if (categoryId === '3') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
}
bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);

//Fonction qui garde le filtre actif
const boutons = document.querySelectorAll('.bouton-css');

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() {
      boutons.forEach((bouton) => {
        bouton.classList.remove('selected');
      });
      this.classList.add('selected');
      sessionStorage.setItem('boutonSelectionne', this.id);
    });
  });