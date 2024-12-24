let movieSuggestions = [
    { mood: 'happy', title: 'The Hangover', link: 'https://www.imdb.com/title/tt1119646/' },
    { mood: 'happy', title: 'Superbad', link: 'https://www.imdb.com/title/tt0829482/' },
    { mood: 'happy', title: 'The Secret Life of Walter Mitty', link: 'https://www.imdb.com/title/tt0359950/' },
    { mood: 'sad', title: 'Forrest Gump', link: 'https://www.imdb.com/title/tt0109830/' },
    { mood: 'sad', title: 'The Pursuit of Happyness', link: 'https://www.imdb.com/title/tt0454921/' },
    { mood: 'sad', title: 'A Beautiful Mind', link: 'https://www.imdb.com/title/tt0268978/' },
    { mood: 'excited', title: 'Mad Max: Fury Road', link: 'https://www.imdb.com/title/tt1392190/' },
    { mood: 'excited', title: 'John Wick', link: 'https://www.imdb.com/title/tt2911666/' },
    { mood: 'excited', title: 'Inception', link: 'https://www.imdb.com/title/tt1375666/' },
    { mood: 'relaxed', title: 'The Secret Life of Walter Mitty', link: 'https://www.imdb.com/title/tt0359950/' },
    { mood: 'relaxed', title: 'A Beautiful Mind', link: 'https://www.imdb.com/title/tt0268978/' },
    { mood: 'relaxed', title: 'Eat Pray Love', link: 'https://www.imdb.com/title/tt0879870/' },
    { mood: 'scared', title: 'The Conjuring', link: 'https://www.imdb.com/title/tt1457767/' },
    { mood: 'scared', title: 'It', link: 'https://www.imdb.com/title/tt1396484/' },
    { mood: 'scared', title: 'Hereditary', link: 'https://www.imdb.com/title/tt7784604/' },
    { mood: 'romantic', title: 'Pride and Prejudice', link: 'https://www.imdb.com/title/tt0414387/' },
    { mood: 'romantic', title: 'The Notebook', link: 'https://www.imdb.com/title/tt0332280/' },
    { mood: 'romantic', title: 'La La Land', link: 'https://www.imdb.com/title/tt3783958/' },
    { mood: 'angry', title: 'Gladiator', link: 'https://www.imdb.com/title/tt0172495/' },
    { mood: 'angry', title: 'Kill Bill: Vol. 1', link: 'https://www.imdb.com/title/tt0266697/' },
    { mood: 'angry', title: 'Fight Club', link: 'https://www.imdb.com/title/tt0137523/' },
    { mood: 'bored', title: 'The Truman Show', link: 'https://www.imdb.com/title/tt0120382/' },
    { mood: 'bored', title: 'Groundhog Day', link: 'https://www.imdb.com/title/tt0107048/' },
    { mood: 'bored', title: 'The Grand Budapest Hotel', link: 'https://www.imdb.com/title/tt2278388/' }
];

function enableChat() {
    const username = document.getElementById('username-input').value;
    const chatInput = document.getElementById('chat-input');
    const sendButton = chatInput.nextElementSibling;

    if (username) {
        chatInput.disabled = false;
        sendButton.disabled = false;
    } else {
        chatInput.disabled = true;
        sendButton.disabled = true;
    }
}

function suggestMovie(mood) {
    let filteredMovies = movieSuggestions.filter(movie => movie.mood === mood);
    let randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
    let suggestion = randomMovie.title;
    let imdbLink = randomMovie.link;

    document.getElementById('movie-suggestion').innerHTML = `<a href="${imdbLink}" target="_blank">${suggestion}</a>`;
    document.getElementById('rating-select').disabled = false;
    document.getElementById('rate-button').disabled = false;
}

function sendMessage() {
    const username = document.getElementById('username-input').value;
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<<< <span style="color: black;">${username}</span>: <span style="color: white;">${message}</span>`;
    chatBox.appendChild(messageElement);
    chatInput.value = '';
}

function rateMovie() {
    const username = document.getElementById('username-input').value;
    const rating = document.getElementById('rating-select').value;
    const movieSuggestion = document.getElementById('movie-suggestion').innerText;
    const ratingMessage = document.createElement('p');
    ratingMessage.innerHTML = `<<< <span style="color: black;">${username}</span> rated <span style="color: white;">${movieSuggestion} ${rating} stars</span>.`;
    document.getElementById('chat-box').appendChild(ratingMessage);
    document.getElementById('rating-message').innerText = `You rated the movie ${rating} stars.`;
}
