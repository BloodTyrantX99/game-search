const API_KEY = "c14abfad7e4142dc99625bc14d0e63b7";

document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  if (!query) return;

  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=10`);
    const data = await response.json();
    displayGames(data.results);
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Error loading games.</p>";
  }
});

function displayGames(games) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!games || games.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.background_image || 'https://via.placeholder.com/300x200?text=No+Image'}">
      <h3>${game.name}</h3>
      <p>⭐ ${game.rating || 'N/A'} | 📅 ${game.released || 'Unknown'}</p>
    `;
    resultsDiv.appendChild(card);
  });
}
