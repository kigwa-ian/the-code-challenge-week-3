
document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const moviePoster = document.getElementById('movie-poster');
    const movieTitle = document.getElementById('movie-title');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const movieTickets = document.getElementById('movie-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');
  
    
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => displayMovieDetails(movie));
  
    
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {
        filmsList.innerHTML = ''; 
        movies.forEach(movie => {
          const filmItem = document.createElement('li');
          filmItem.textContent = movie.title;
          filmItem.classList.add('film', 'item');
          filmItem.addEventListener('click', () => displayMovieDetails(movie));
          filmsList.appendChild(filmItem);
        });
      });
  
    function displayMovieDetails(movie) {
      moviePoster.src = movie.poster;
      movieTitle.textContent = movie.title;
      movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
      movieShowtime.textContent = `Showtime: ${movie.showtime}`;
      const availableTickets = movie.capacity - movie.tickets_sold;
      movieTickets.textContent = `Available Tickets: ${availableTickets}`;
      buyTicketButton.disabled = availableTickets === 0;
      buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
  
      buyTicketButton.onclick = () => {
        if (availableTickets > 0) {
          movie.tickets_sold++;
          displayMovieDetails(movie);
        }
      };
    }
  });
  buyTicketButton.onclick = () => {
    if (availableTickets > 0) {
      movie.tickets_sold++;
      displayMovieDetails(movie);
      fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets_sold: movie.tickets_sold,
        }),
      });
    }
  };
  movies.forEach(movie => {
    const filmItem = document.createElement('li');
    filmItem.textContent = movie.title;
    filmItem.classList.add('film', 'item');
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'DELETE',
      }).then(() => {
        filmItem.remove();
      });
    };
  
    filmItem.appendChild(deleteButton);
    filmsList.appendChild(filmItem);
  });
  