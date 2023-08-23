const reponse = await fetch("pieces-autos.json")
const pieces = await reponse.json()

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
}

const btnTrier = document.querySelector(".btn-trier");
btnTrier.addEventListener("click", () => {
    piecesTriees = Array.from(pieces);
    pieces.sort(function(a,b) {
        return a.prix - b.prix
    });
    console.log(pieces);
})
