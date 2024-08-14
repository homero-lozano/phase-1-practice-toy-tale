let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => renderToys(toys));
}
function renderToys(toys) {
  const toyCollection = document.getElementById('toy-collection');
  toys.forEach(toy => {
    const toyCard = createToyCard(toy);
    toyCollection.appendChild(toyCard);
  });
}
function createToyCard(toy) {
  const card = document.createElement('div');
  card.className = 'card';
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`;
  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.textContent = 'Like ❤️';
  card.append(h2, img, p, button);
  return card;
}
document.addEventListener('DOMContentLoaded', fetchToys);
document.querySelector('.add-toy-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const image = e.target.image.value;

  createToy(name, image);
});

function createToy(name, image) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(toy => {
    const toyCollection = document.getElementById('toy-collection');
    const toyCard = createToyCard(toy);
    toyCollection.appendChild(toyCard);
  });
}
function addLikeListener(button, toy) {
  button.addEventListener('click', () => {
    toy.likes += 1;
    updateLikes(toy);
  });
}

function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    const toyCard = document.getElementById(updatedToy.id).closest('.card');
    toyCard.querySelector('p').textContent = `${updatedToy.likes} Likes`;
  });
}

function createToyCard(toy) {
  const card = document.createElement('div');
  card.className = 'card';
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`;
  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.textContent = 'Like ❤️';
  addLikeListener(button, toy);
  card.append(h2, img, p, button);
  return card;
}

