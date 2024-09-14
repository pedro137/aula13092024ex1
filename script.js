document.addEventListener('deviceready', function () {
    const cardContainer = document.getElementById('card-container');
    let currentPage = 1;

    function fetchCards(page) {
        fetch(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=3`)
            .then(response => response.json())
            .then(data => {
                data.forEach(photo => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const img = document.createElement('img');
                    img.src = photo.thumbnailUrl;
                    img.alt = photo.title;

                    const title = document.createElement('div');
                    title.className = 'card-title';
                    title.textContent = photo.title;

                    card.appendChild(img);
                    card.appendChild(title);
                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching cards:', error));
    }

    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) { // Slightly before reaching the bottom
            currentPage++;
            fetchCards(currentPage);
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initial fetch
    fetchCards(currentPage);
});
