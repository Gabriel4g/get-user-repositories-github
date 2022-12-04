const buttonSearch = document.querySelector("#btn-search");
const inputSearch = document.querySelector("#input-user");
const repositoriesContainer = document.querySelector("#repositories-container");

async function getDataFromRepositories(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const data = await response.json();

        return data;
    }

    catch (error) {
        alert(error)
    }
}

async function renderInfoFromRepositories(user) {
    const data = await getDataFromRepositories(user);
    console.log(data);

    data.forEach((item) => {
        const contentRepositories = document.createElement("a");
        contentRepositories.classList.add("card");
        repositoriesContainer.append(contentRepositories);
        contentRepositories.setAttribute("href", item.html_url);
        contentRepositories.setAttribute("target", "__blank");

        const nameRepositorie = document.createElement("h3");
        contentRepositories.append(nameRepositorie);
        nameRepositorie.textContent = item.name;
        nameRepositorie.classList.add("style-name-repositorie");

        const descriptionRepositorie = document.createElement("p");
        contentRepositories.append(descriptionRepositorie);
        descriptionRepositorie.classList.add("style-description-repositorie");
        descriptionRepositorie.textContent = `${item.description || "No Description"}`;

        const publicRepositorie = document.createElement("span");
        contentRepositories.append(publicRepositorie);
        publicRepositorie.classList.add("style-public-text");
        publicRepositorie.textContent = item.visibility;
    })
}

buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();

    renderInfoFromRepositories(inputSearch.value);
    inputSearch.value = "";
    repositoriesContainer.innerHTML = "";
})