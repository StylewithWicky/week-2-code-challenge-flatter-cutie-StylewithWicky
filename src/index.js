// Your code here
function main(){
    console.log("Bob nagoja uone hii")
}

document.addEventListener("DOMContentLoaded",main);

    const baseUrl = "https://fantastic-potato-ysku-ke36pzuuy-yazzzs-projects.vercel.app/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const newCharacterForm = document.getElementById("character-form");

    // Ina fetch vitu 
    fetch(baseUrl)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => renderCharacterBar(character));
        });


//Ina create <span> element for each character na ina add their name.
    
function renderCharacterBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span);
    }
// ina update the section (detailed-info) by the character's name, image, and votes.
    
function displayCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterVotes.textContent = character.votes;
        detailedInfo.dataset.id = character.id;
    }
//Ina deal na the votes
    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentVotes = parseInt(characterVotes.textContent) || 0;
        const newVotes = parseInt(voteInput.value) || 0;
        const updatedVotes = currentVotes + newVotes;
        characterVotes.textContent = updatedVotes;
        voteInput.value = "";

        const characterId = detailedInfo.dataset.id;
        if (characterId) {
            updateVotesOnServer(characterId, updatedVotes);
        }
    });
//it updates the votes by kutuma a  PATCH request to update the  votes kwa server.
    function updateVotesOnServer(id, votes) {
        fetch(`${baseUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ votes })
        });
    }
//kaa chararcter na ukafinya the reset buton ama chaguiwa  inaupdate the  votes to 0.
    resetButton.addEventListener("click", () => {
        characterVotes.textContent = "0";
        const characterId = detailedInfo.dataset.id;
        if (characterId) {
            updateVotesOnServer(characterId, 0);
        }
    });

    newCharacterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newName = document.getElementById("new-name").value;
        const newImage = document.getElementById("new-image").value;
        const newCharacter = { name: newName, image: newImage, votes: 0 };
        
        fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCharacter)
        })
        .then(response => response.json())
        .then(character => {
            renderCharacterBar(character);
            displayCharacterDetails(character);
        });

        newCharacterForm.reset();
    });


// 