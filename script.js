const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const repoList = document.querySelector('#repo-list');
const errorMessage = document.querySelector('#error-message');

function clearResults() {
    repoList.innerHTML = '';
}

function showError(message) {
    errorMessage.textContent = message;
}

function hideError() {
    errorMessage.textContent = '';
}

function renderResults(results) {
    clearResults();
    
    if (results.length === 0) {
        showError('No results found.');
        return;
    }
    
    for (let i = 0; i < Math.min(results.length, 10); i++) {
        const result = results[i];
    
        const repo = document.createElement('div');
        repo.classList.add('repo');
    
        const name = document.createElement('div');
        name.classList.add('repo-name');
    
        const link = document.createElement('a');
        link.classList.add('repo-link');
            link.href = result.html_url;
        link.target = '_blank';
        link.textContent = result.name;
    
        const description = document.createElement('div');
        description.classList.add('repo-description');
        description.textContent = result.description;
    
        const language = document.createElement('div');
        language.classList.add('repo-language');
        language.textContent = result.language;
    
        name.appendChild(link);
        repo.appendChild(name);
        repo.appendChild(description);
        repo.appendChild(language);
    
        repoList.appendChild(repo);
    }
}

function searchRepositories() {
    const query = searchInput.value;

    if (!query) {
        showError('Please enter a search query.');
        return;
    }

    hideError();

    fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Not Found') {
                showError('No results found.');
                return;
            }

            renderResults(data.items);
        })
        .catch(() => showError('An error occurred. Please try again later.'));
}

searchButton.addEventListener('click', searchRepositories);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchRepositories();
    }
});