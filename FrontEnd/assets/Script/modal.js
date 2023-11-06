// Modale
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');

// Fonction qui permet d'afficher la modale
function showModal() {
  modal.style.display = 'block';
}

// Fonction qui permet de cacher la modale
function hideModal() {
  modal.style.display = 'none';
}

// Ferme la modale lors du click sur la croix
modalClose.addEventListener('click', hideModal);

// Categories 
const selectCategory = document.getElementById('modal-photo-category');

// Appel de l'API + categories en fin d'url
const reponseCategory = fetch(api + 'categories')
.then((response) => response.json())
.then((data) => {
  data.forEach((category) => {
    const categoryOption = document.createElement('option')
    const categoryLabel = document.createElement('label')

    categoryOption.setAttribute('value', category.id)
    categoryLabel.innerHTML = category.name

    selectCategory.appendChild(categoryOption)
    categoryOption.appendChild(categoryLabel)
  });
});

// Bouton ajouter une photo
const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector("#modal-photo-close");

// Au click sur le bouton...
newPhotoBtn.addEventListener('click', function() {
  // modalContent n'est plus visible
  modalContent.style.display = 'none';
  // afin de laisser apparaitre modalPhoto
  modalPhoto.style.display = 'block';
});

// Au click sur le bouton retour...
returnBtn.addEventListener('click', function(){
  // modalContent est de nouveau visible
  modalContent.style.display = 'flex';
  // modalPhoto n'est plus visible
  modalPhoto.style.display = 'none';
})

// Au click sur la croix, ne plus rendre visible la modal
modalPhotoClose.addEventListener('click', hideModal);

// Ajout de work à la modale
const imagesModalContainer = document.querySelector('.gallery-modal')

// Fonction creatModalWorkFigure
function createModalWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')
  const deleteIcon = document.createElement('i') 
        
  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = "éditer"
  figure.setAttribute('data-id', work.id);
  deleteIcon.className = "fa-regular fa-trash-can" 

  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)
  figure.appendChild(deleteIcon)

  // Ajout d'un delete event lors du clic sur la poubelle
  deleteIcon.addEventListener('click', (event) => {
    event.preventDefault();
    deleteWorkById(work.id);
  });

  return figure;
}

// Appel de l'api + works en fin d'url
fetch(api + 'works')
  .then((response) => response.json())
  .then((data) => {
    // Pour chaque work...
    data.forEach((work) => {
      // Création d'une ModalWorkFigure
      const figure = createModalWorkFigure(work);
      imagesModalContainer.appendChild(figure);
    });
  });


// Supression d'un work
function deleteWorkById(workId) {
  const token = sessionStorage.getItem("Token");
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  if (confirmation) {
    // Appel de l'api + works + le workId ciblé en fin d'url
    fetch(api + `works/${workId}`, {
      // method DELETE pour la suppression
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(response => {
      // Si la réponse n'est pas celle attendue pour effectuer la suppression...
      if (response !== response.ok){
      throw new error ('La supression du travai a echoué.');
    }
    const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    // Suppression d'un work dans la modale
    if (modalWorkToRemove) {
      modalWorkToRemove.remove();
      
    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    // suppression d'un work sans la gallery
    if (galleryWorkToRemove) {
        galleryWorkToRemove.remove();
    // En cas d'erreur
    } else {
        console.error('Élément à supprimer non trouvé dans la galerie principale');
      }
    // En cas d'erreur
    } else {
        console.error('Élément à supprimer non trouvé dans la modale');
    }
  })
  .catch(error => console.error(error));
  }    
}  

// Fonction de supression de toute la galerie
function deleteGallery() {
  const token = sessionStorage.getItem("Token");
  const galleryWorks = document.querySelectorAll('.gallery-modal figure, .gallery figure');
  // Cible la gallery entière
  galleryWorks.forEach((galleryWork) => {
    const workId = galleryWork.getAttribute('data-id');
    // Appel de l'api + works + le workId ciblé en fin d'url
    fetch(api + `works/${workId}`, {
      // method DELETE pour la suppression
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    });
    // Suppression de la gallery grace à remove()
    galleryWork.remove();
  });
}

// Au click du bouton supprimer la galerie
document.getElementById("delete-gallery").addEventListener("click", function() {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer la galerie ?");
  // Si confirmation...
  if (confirmation) {
    // delete la gallery
    deleteGallery();
  }
});

// Bouton valider vert avant ajout d'un nouveau work
const titleInput = document.getElementById('modal-photo-title');
const categorySelect = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('modal-valider');

// Fonction checkForm
function checkForm() {
  // Si les champs requis sont renseignés...
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    // changement de couleur de background du bouton
    submitButton.style.backgroundColor = '#1D6154';
    // Sinon, le bouton reste tel qu'il est
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


// Ajout d'un nouveau work
const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

// Fonction d'ajout d'un nouveau work
function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("Token");

  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("image").files[0];
  const errForm = document.querySelector(".rempForm"); 
  // Si les champs requis ne sont pas renseignés
  if(!title || !category || !image) {
    // Crée un message d'erreur dans le DOM
    const p = document.createElement("p");
    p.innerHTML = "Veuillez remplir tous les champs du formulaire.";
    errForm.appendChild(p);
  }

  // Vérifie si l'image n'excéde pas 4MO
  if (image.size > 4 * 1024 * 1024) {
    // Si l'image dépasse 4MO, crée un message d'erreur dans le DOM
    const p = document.createElement("p");
    p.innerHTML = "La taille de l'image ne doit pas dépasser 4 Mo.";
    errForm.appendChild(p);
  }
  
  // Création d'un nouveau FormData
  const formData = new FormData();
  // Le titre du nouveau FormData devient le titre renseigné
  formData.append("title", title);
  // La catégorie du nouveau FormData devient la catégorie renseignée
  formData.append("category", category);
  // L'image du nouveau FormData devient l'image renseignée
  formData.append("image", image);

  // Appel de l'api + works en fin d'url
  fetch(api + "works", {
    // Méthode POST permet d'envoyer des datas au serveur
    method: "POST",
    body: formData,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => response.json()) 
  .then(work => {
    // crée et ajoute le nouveau work à la galerie
    const figure = createWorkFigure(work);
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(figure);
  
    // crée et ajoute le nouveau work à la modale galerie
    const figureModal = createModalWorkFigure(work);
    const galleryModal = document.querySelector('.gallery-modal');
    galleryModal.appendChild(figureModal);
  
  })
  .catch(error => console.error(error));
}

// Image preview
const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#iModalImage");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "100%";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iModalImage.style.display = "none";
  document.getElementById("form-photo-div").appendChild(imgPreview);
});