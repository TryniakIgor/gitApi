const ROOT = 'https://api.github.com';
const loader = document.getElementById("loader");
const reposDiv = document.getElementById("repos");
const userNameHeader = document.getElementById("userNameHeader");

const gitHubForm = document.querySelector('.gitHubForm');

async function getRepos() {
    loader.style.display = "block";
    reposDiv.innerHTML = "";
    try {
        const username = document.getElementById("username").value;
        const response = await fetch(
            ROOT + `/users/${username}/repos`
        );
        userNameHeader.innerHTML = username;
        const repositories = await response.json();
        console.log(repositories.message);
        createRepos(repositories);
        loader.style.display = "none";
    } catch (error) {
        console.log(error.message);
    }
}

function createRepos(repositories) {
    repositories.forEach((repo) => {
        console.log(repositories.message);
        const repoDiv = document.createElement("div");
        repoDiv.classList.add('item');
        const repoName = document.createElement("h2");
        repoName.innerText = repo.name;
        const repoLanguage = document.createElement("p");
        repoLanguage.innerText = `Language: ${repo.language}`;
        const repoDescription = document.createElement("p");
        repoDescription.innerText = `Description: ${repo.description ? repo.description : "N/A"
            }`;
        repoDiv.append(repoName, repoLanguage, repoDescription);
        reposDiv.append(repoDiv);

    });
}

gitHubForm.addEventListener('change', () => {
    getRepos();
})




