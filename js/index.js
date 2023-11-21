////////////////////////////////////////////////////////////////
////////////////////////// copyright ///////////////////////////
////////////////////////////////////////////////////////////////

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Hayley ${thisYear}`
footer.appendChild(copyright);

////////////////////////////////////////////////////////////////
//////////////////////////// skills ////////////////////////////
////////////////////////////////////////////////////////////////

const skills = ["JavaScript", "HTML", "CSS", "React", "Ruby on Rails"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul")

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

////////////////////////////////////////////////////////////////
////////////////////////// messages ////////////////////////////
////////////////////////////////////////////////////////////////

// target heading elements

const messageForm = document.querySelector('form[name="leave_message"]');
const messageSection = document.getElementById("messages");


messageSection.style.display = "none";

// form functionality

messageForm.addEventListener("submit", function(event) {

  // prevent refresh

  event.preventDefault();

  // target info entered in fields

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  // target message list elements

  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  // function to add message

  const addMessage = () => {

    // set message html

    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span>wrote: ${usersMessage}</span>
    `;

    // show message html

    showMessagesSection();
    messageList.append(newMessage);
  };

  // functions to create buttons

  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");
  const saveButton = document.createElement("button");

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

  const createSaveButton = () => {
    saveButton.innerText = "save";
    saveButton.type = "button";
    newMessage.append(saveButton);
  };

  // functions to toggle display of messages section

  const showMessagesSection = () => {
    messageSection.style.display = "inline-block";
  };

  const hideMessagesSection = () => {
    messageSection.style.display = "none";
  };

  // set message html

  addMessage();

  // create remove and edit buttons

  createRemoveButton();
  createEditButton();

  // remove button functionality

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;

    // remove message

    entry.remove();

    // hide messages header if 0 messages

    if (messageSection.style.display = "inline-block" && messageList.childElementCount == 0) {
      hideMessagesSection();
    };
  });

  // edit button functionality

  editButton.addEventListener("click", function () {
    
    // hide remove and edit buttons

    removeButton.remove();
    editButton.remove();

    // hide previous message

    const messageSpan = newMessage.querySelector("span");   
    messageSpan.innerText = "wrote: ";

    // show edit box

    let editTextBox = document.createElement("textarea");
    editTextBox.name = "editTextBox";
    editTextBox.required = true;
    editTextBox.value = usersMessage;
    newMessage.append(editTextBox);

    // show save button

    createSaveButton();

    // save edit

    saveButton.addEventListener("click", function () {
      usersMessage = editTextBox.value;

      // reset message html

      addMessage();

      // re-show remove and edit buttons

      createRemoveButton();
      createEditButton();
    });
  });

  // reset form

  messageForm.reset();
});
