const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-btn");
const favBtn = document.getElementById("fav-btn");
const viewFavBtn = document.getElementById("view-fav");

const toast = document.getElementById("toast");

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b"
];

let currentQuote = "";
let currentAuthor = "";

function showToast(message) {

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);
}

async function getQuote() {

  try {

    quoteText.style.opacity = "0";

    const response =
      await fetch("https://dummyjson.com/quotes/random");

    const data = await response.json();

    currentQuote = data.quote;
    currentAuthor = data.author;

    setTimeout(() => {

      quoteText.innerText = `"${currentQuote}"`;
      authorText.innerText = `— ${currentAuthor}`;

      quoteText.style.opacity = "1";

    }, 300);

    changeBackground();

  } catch (error) {

    quoteText.innerText = "Failed to load quote.";
  }
}

function changeBackground() {

  const randomBg =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  document.body.style.backgroundImage =
    `url(${randomBg})`;
}

newQuoteBtn.addEventListener("click", getQuote);

copyBtn.addEventListener("click", () => {

  navigator.clipboard.writeText(
    `${currentQuote} — ${currentAuthor}`
  );

  showToast("📋 Quote Copied!");
});

favBtn.addEventListener("click", () => {

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.push({
    quote: currentQuote,
    author: currentAuthor
  });
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  showToast("❤️ Added to Favorites!");
});

viewFavBtn.addEventListener("click", () => {

  window.location.href = "favorites.html";
});

getQuote();
