const socket = io();

socket.on('initialComments', (initialComments) => {
    comments = initialComments;
    displayComments();
});

socket.on('updateComments', (updatedComments) => {
    comments = updatedComments;
    displayComments();
});

const movieSuggestions = {
    happy: [
        { title: "The Secret Life of Walter Mitty", link: "https://www.imdb.com/title/tt0359950/", trailer: "https://www.youtube.com/watch?v=QD6cy4PBQPI" },
        { title: "Forrest Gump", link: "https://www.imdb.com/title/tt0109830/", trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg" },
        { title: "Up", link: "https://www.imdb.com/title/tt1049413/", trailer: "https://www.youtube.com/watch?v=ORFWdXl_zJ4" },
        // Add more happy movies here
    ],
    sad: [
        { title: "The Pursuit of Happyness", link: "https://www.imdb.com/title/tt0454921/", trailer: "https://www.youtube.com/watch?v=89Kq8SDyvfg" },
        { title: "Schindler's List", link: "https://www.imdb.com/title/tt0108052/", trailer: "https://www.youtube.com/watch?v=gG22XNhtnoY" },
        { title: "The Green Mile", link: "https://www.imdb.com/title/tt0120689/", trailer: "https://www.youtube.com/watch?v=Ki4haFrqSrw" },
        // Add more sad movies here
    ],
    excited: [
        { title: "Mad Max: Fury Road", link: "https://www.imdb.com/title/tt1392190/", trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8" },
        { title: "Inception", link: "https://www.imdb.com/title/tt1375666/", trailer: "https://www.youtube.com/watch?v=8hP9D6kZseM" },
        { title: "The Dark Knight", link: "https://www.imdb.com/title/tt0468569/", trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY" },
        // Add more excited movies here
    ],
    calm: [
        { title: "A Beautiful Mind", link: "https://www.imdb.com/title/tt0268978/", trailer: "https://www.youtube.com/watch?v=aS_d0Ayjw4o" },
        { title: "The Theory of Everything", link: "https://www.imdb.com/title/tt2980516/", trailer: "https://www.youtube.com/watch?v=Salz7uGp72c" },
        { title: "Life of Pi", link: "https://www.imdb.com/title/tt0454876/", trailer: "https://www.youtube.com/watch?v=5Gb5O8pqmh4" },
        // Add more calm movies here
    ],
    romantic: [
        { title: "The Notebook", link: "https://www.imdb.com/title/tt0332280/", trailer: "https://www.youtube.com/watch?v=FC6biTjEyZw" },
        { title: "Pride and Prejudice", link: "https://www.imdb.com/title/tt0414387/", trailer: "https://www.youtube.com/watch?v=1dYv5u6v55Y" },
        { title: "La La Land", link: "https://www.imdb.com/title/tt3783958/", trailer: "https://www.youtube.com/watch?v=0pdqf4P9MB8" },
        // Add more romantic movies here
    ],
    adventurous: [
        { title: "Indiana Jones: Raiders of the Lost Ark", link: "https://www.imdb.com/title/tt0082971/", trailer: "https://www.youtube.com/watch?v=XkkzKHCx154" },
        { title: "Jumanji: Welcome to the Jungle", link: "https://www.imdb.com/title/tt2283362/", trailer: "https://www.youtube.com/watch?v=2QKg5SZ_35I" },
        { title: "The Hobbit: An Unexpected Journey", link: "https://www.imdb.com/title/tt0903624/", trailer: "https://www.youtube.com/watch?v=SDnYMbYB-nU" },
        // Add more adventurous movies here
    ],
    thrilled: [
        { title: "The Silence of the Lambs", link: "https://www.imdb.com/title/tt0102926/", trailer: "https://www.youtube.com/watch?v=W6Mm8Sbe__o" },
        { title: "Get Out", link: "https://www.imdb.com/title/tt5052448/", trailer: "https://www.youtube.com/watch?v=DzfpyUB60YY" },
        { title: "A Quiet Place", link: "https://www.imdb.com/title/tt6644200/", trailer: "https://www.youtube.com/watch?v=WR7cc5t7tv8" },
        // Add more thrilled movies here
    ],
    nostalgic: [
        { title: "Back to the Future", link: "https://www.imdb.com/title/tt0088763/", trailer: "https://www.youtube.com/watch?v=qvsgGtivCgs" },
        { title: "The Goonies", link: "https://www.imdb.com/title/tt0089218/", trailer: "https://www.youtube.com/watch?v=hJ2j4oWdQtU" },
        { title: "E.T. the Extra-Terrestrial", link: "https://www.imdb.com/title/tt0083866/", trailer: "https://www.youtube.com/watch?v=qYAETtIIClk" },
        // Add more nostalgic movies here
    ]
};

const dailyQuotes = [
    "“May the Force be with you.” – Star Wars",
    "“There's no place like home.” – The Wizard of Oz",
    "“I'm the king of the world!” – Titanic",
    // Add more quotes here
];

let comments = [];

const inappropriateWords = ["death", "threat", "racism", "homophobic", "curse", "badword1", "badword2"]; // Add more inappropriate words here

function recommendMovie(mood) {
    const recommendation = document.getElementById("recommendation");
    recommendation.innerHTML = '';

    const selectedMovies = movieSuggestions[mood];
    const randomMovie = selectedMovies[Math.floor(Math.random() * selectedMovies.length)];

    const movieLink = document.createElement('a');
    movieLink.href = randomMovie.link;
    movieLink.target = '_blank';
    movieLink.textContent = `🎬 ${randomMovie.title}`;
    recommendation.appendChild(movieLink);

    const trailerLink = document.createElement('a');
    trailerLink.href = randomMovie.trailer;
    trailerLink.target = '_blank';
    trailerLink.textContent = `📺 Watch Trailer`;
    recommendation.appendChild(trailerLink);

    displayQuote();
}

function rateMovie(rating) {
    const userDisplayName = document.getElementById("display-name").value || "Anonymous";
    const recommendation = document.getElementById("recommendation");
    const movieTitle = recommendation.querySelector('a').textContent.trim();

    if (!movieTitle) {
        console.error("No movie title found for rating.");
        return;
    }
    
    const ratingMessage = document.createElement('div');
    ratingMessage.classList.add('rating-message');
    ratingMessage.textContent = `${userDisplayName} rated ${movieTitle} ${rating} stars!`;
    document.body.appendChild(ratingMessage);

    setTimeout(() => {
        ratingMessage.remove();
    }, 3000); // Remove the message after 3 seconds
}

function displayQuote() {
    const dailyQuote = document.getElementById("daily-quote");
    const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
    dailyQuote.textContent = randomQuote;
}

function addComment() {
    const userDisplayName = document.getElementById("display-name").value || "Anonymous";
    const commentText = document.getElementById("comment-text").value;

    if (!commentText) {
        alert("Please enter a comment.");
        return;
    }

    if (containsInappropriateWords(commentText)) {
        alert("Your comment contains inappropriate content. Please revise it.");
        return;
    }

    const comment = { user: userDisplayName, text: commentText };
    socket.emit('addComment', comment);

    document.getElementById("comment-text").value = '';
}

function containsInappropriateWords(text) {
    return inappropriateWords.some(word => text.toLowerCase().includes(word));
}

function displayComments() {
    const commentsSection = document.getElementById("comments-section");
    commentsSection.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;
        commentsSection.appendChild(commentDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuote();
    displayComments();
});
