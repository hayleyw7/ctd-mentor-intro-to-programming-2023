// copyright

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `Hayley ${thisYear}`;
footer.appendChild(copyright);

// skills

const skills = ["JavaScript", "React", "jQuery", "HTML", "CSS", "Ruby", "Rails", "Cypress"];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];
  skillsList.appendChild(skill);
};

// message headings

const messageForm = document.querySelector('form[name="leave_message"]');

const messageSection = document.getElementById("messages");
messageSection.style.display = "none";

// message form focus

messageForm.addEventListener('focusin', (event) => {
  messageForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// message functionality

messageForm.addEventListener("submit", function(event) {

  // prevent refresh

  event.preventDefault();

  // create message

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  // add message

  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  const setMessageHtml = () => {
    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span>wrote: ${usersMessage}</span>
    `;
  };

  setMessageHtml();

  messageSection.style.display = "inline-block";
  messageList.append(newMessage);
  messageSection.scrollIntoView({ behavior: "smooth" });

  // create buttons

  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  const createRemoveButton = () => {
    removeButton.innerText = "remove";
    removeButton.type = "button";
    newMessage.append(removeButton); 
  };

  const createEditButton = () => {
    editButton.innerText = "edit";
    editButton.type = "button";
    newMessage.append(editButton);
  };

  createRemoveButton();
  createEditButton();

  // remove

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;

    entry.remove();

    // hide message header

    if (messageSection.style.display = "inline-block" && messageList.childElementCount == 0) {
      messageSection.style.display = "none";
    };
  });

  // edit

  editButton.addEventListener("click", function () {
    let editTextBox = document.createElement("textarea");
    const saveButton = document.createElement("button");

    removeButton.remove();
    editButton.remove();

    editTextBox.name = "editTextBox";
    editTextBox.required = true;
    editTextBox.value = usersMessage;
    newMessage.append(editTextBox);

    saveButton.innerText = "save";
    saveButton.type = "button";
    newMessage.append(saveButton);

    // save edit

    saveButton.addEventListener("click", function () {
      usersMessage = editTextBox.value;

      setMessageHtml();

      createRemoveButton();
      createEditButton();
    });
  });

  // reset form

  messageForm.reset();
});

// ajax request

// const githubRequest = new XMLHttpRequest();
// const url = "https://api.github.com/users/hayleyw7/repos";

// githubRequest.open("GET", url);
// githubRequest.send();

// githubRequest.addEventListener("load", function(){
//   const repos = JSON.parse(githubRequest.responseText);
//   const projectList = document.querySelector("#projects ul");

//   console.log(repos)

//   for (let i = 0; i < repos.length; i++) {
//     const repo = document.createElement("li");
//     const link = document.createElement("a");
//     const date = document.createElement("span"); 

//     link.innerText = repos[i].name;
//     link.href = repos[i].html_url;

//     const year = repos[i].created_at.split("-")[0];
//     date.innerText = ` - ${year}`;

//     repo.appendChild(link);
//     repo.appendChild(date);
//     projectList.appendChild(repo);
//   }
// });

// fetch

const url = "https://api.github.com/users/hayleyw7/repos";

fetch(url)
  .then(response => response.json())
  .then(repos => {
    const projectList = document.querySelector("#projects ul");

    console.log(repos)

    for (let i = 0; i < repos.length; i++) {
      const repo = document.createElement("li");
      const link = document.createElement("a");
      const date = document.createElement("span"); 

      link.innerText = repos[i].name;
      link.href = repos[i].html_url;

      const year = repos[i].created_at.split("-")[0];
      date.innerText = ` - ${year}`;

      repo.appendChild(link);
      repo.appendChild(date);
      projectList.appendChild(repo);
    }
  });
