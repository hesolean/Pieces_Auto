const reponse = await fetch("pieces-autos.json")
const pieces = await reponse.json()

/**
 * generation des fiches d'articles en fonction d'une liste de pieces
 * @param {pieces} liste des pieces 
 */
function genererPieces(pieces) {
    for (let i = 0 ; i < pieces.length ; i++) {
        // recupère du DOM la section qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // creation balise pour les pièces auto
        const pieceElement = document.createElement("article");
        // creation de la balise img
        const imageElement = document.createElement("img");
        // recuperation de tous les elements de la fiche
        imageElement.src = pieces[i].image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
        const descritionElement = document.createElement("p");
        descritionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
        
        // on rattache les balises au bon endroit
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descritionElement);
        pieceElement.appendChild(disponibiliteElement);

        document.body.appendChild(sectionFiches);
    }
    // creation d'un nouveau tableau pour n'avoir que les pieces de prix inferieur à 35 euros
    const piecesNoms = pieces.map((piece) => piece.nom + " - " + piece.prix + " €.");
    for (let i = pieces.length-1; i >=0; i--) {
        if (pieces[i].prix > 35) {
            piecesNoms.splice(i,1);
        }
    }

    //Création de la liste
    const abordablesElements = document.createElement('ul');
    //Ajout de chaque nom à la liste
    for(let i=0; i < piecesNoms.length ; i++){
        const nomElement = document.createElement('li');
        nomElement.innerText = piecesNoms[i];
        abordablesElements.appendChild(nomElement)
    }
    // Ajout de l'en-tête puis de la liste au bloc résultats filtres
    document.querySelector('.abordables')
        .appendChild(abordablesElements);
}

// premier affichage de la page
genererPieces(pieces);

// recuperer le bouton tirer
const btnTrier = document.querySelector(".btn-trier");
// ajout écouteur sur le bouton de trie
btnTrier.addEventListener("click", () => {
    const piecesTriees = Array.from(pieces);
    piecesTriees.sort(function(a,b) {
        return a.prix - b.prix
    });
    // effacement de l'ecran et regeneration de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesTriees);
})

// recuperer le bouton filtrer
const btnFiltrer = document.querySelector(".btn-filtrer");
// ajout écouteur sur le bouton de filtre
btnFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    // effacement de l'ecran et regeneration de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})

// recuperer le bouton description
const btnDescription = document.querySelector(".btn-description");
// ajout écouteur sur le bouton de description
btnDescription.addEventListener("click", () => {
    const piecesDescription = pieces.filter(function(piece) {
        return piece.description != "";
    });
 // effacement de l'ecran et regeneration de la page
 document.querySelector(".fiches").innerHTML = "";
 genererPieces(piecesDescription);
})


// recuperer la valeur de l'input range
const valeurRange = document.getElementById("indexPrix");
// ajout de l'ecouteur
valeurRange.addEventListener("input", () => {
    console.log(valeurRange.value);

    const piecesRange = pieces.filter(function(piece) {
        return piece.prix <= valeurRange.value;
    })
    // effacement de l'ecran et regeneration de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesRange);
})


