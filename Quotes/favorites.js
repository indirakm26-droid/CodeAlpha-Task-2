const container =
  document.getElementById("favorites-container");

const favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {

  container.innerHTML =
    "<p>No favorite quotes yet.</p>";

} else {

  favorites.forEach(item => {

    const div = document.createElement("div");

    div.classList.add("favorite-item");

    div.innerHTML = `
      <p>"${item.quote}"</p>
      <h4>— ${item.author}</h4>
    `;

    container.appendChild(div);
  });
}

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
];

document.body.style.backgroundImage =
  `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;