const form = document.querySelector("form#search-container"),
inputUser = form.querySelector("#input-user"),
usernameGithub = document.querySelector(".username-github"),
containerCardsRepositories = document.querySelector("#repositories-container"),
imageUser = document.querySelector("#image-user");

async function getUserRepositories(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        
        if(response.status === 200) {
            const data = await response.json();
            return data;
        }

        else if(response.status === 404) {
            alert("Not Found");
        }

        else {
            alert("Server Error")
        }
    }

    catch(error) {
        console.log(error)
    }
}

function Put_As_Son(container, child) {
    container.appendChild(child);
}

async function renderUserRepositories(user) {
    const data = await getUserRepositories(user);

    fetch(`https://api.github.com/users/${user}`)
    .then(res => res.json())
    .then(profileData => {
        imageUser.src = profileData.avatar_url;
        usernameGithub.textContent = profileData.login;
    })

    for(let dataJson of data) {
        const cardRepository = document.createElement("a");
        cardRepository.classList.add("card");
        Put_As_Son(containerCardsRepositories, cardRepository);
        cardRepository.setAttribute("href", dataJson.html_url);

        const nameRepository = document.createElement("h2");
        Put_As_Son(cardRepository, nameRepository);
        nameRepository.textContent = dataJson.name;
        nameRepository.classList.add("style-name-repository");

        const descriptionRepository = document.createElement("p");
        Put_As_Son(cardRepository, descriptionRepository);
        descriptionRepository.textContent = `${dataJson.description || 'No Description'}`
        descriptionRepository.classList.add("style-description-repository");

        const visibilityRepository = document.createElement("h5");
        Put_As_Son(cardRepository, visibilityRepository);
        visibilityRepository.textContent = dataJson.visibility;
        visibilityRepository.classList.add("style-visibility-repository");

        const watchersRepository = document.createElement("h5");
        Put_As_Son(cardRepository, watchersRepository);
        watchersRepository.innerHTML = `${dataJson.watchers} <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="2" />
        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
      </svg>`;
        watchersRepository.classList.add("style-watchers-repository");

        const createdRepository = document.createElement("h5");
        Put_As_Son(cardRepository, createdRepository);
        createdRepository.textContent = `Created: ${dataJson.created_at.slice(0, 10)}`;
        createdRepository.classList.add("style-created-repository");
    }
}

renderUserRepositories("Gabriel4g");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderUserRepositories(inputUser.value);
    inputUser.value = "";
    containerCardsRepositories.innerHTML = "";
})