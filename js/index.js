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

// target message elements

const messageForm = document.querySelector('form[name="leave_message"]');
const messageSection = document.getElementById("messages");

// functions to toggle display of the messages section

const showMessagesSection = () => {
  messageSection.style.display = "block";
};

const hideMessagesSection = () => {
  messageSection.style.display = "none";
};

// initially hide message section

hideMessagesSection();

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

    // create remove and edit buttons

    setupRemoveButton();
    setupEditButton();
  };

  const removeDisplayedButtons = () => {
    const buttons = newMessage.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    };
  }

  // remove button functionality

  const setupRemoveButton = () => {

    // create and append button

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";
    newMessage.append(removeButton);

    // functionality

    removeButton.addEventListener("click", function() {

      // remove message

      newMessage.remove();

      // hide messages header if 0 messages

      if (messageList.childElementCount == 0) {
        hideMessagesSection();
      }
    });
  };

  // edit button functionality

  const setupEditButton = () => {

    // create and append button

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.type = "button";
    newMessage.append(editButton);

    // functionality

    editButton.addEventListener("click", function() {

      // remove remove and delete buttons

      removeDisplayedButtons();

      // hide previous message

      const messageSpan = newMessage.querySelector("span");
      messageSpan.innerText = "wrote: ";

      // show edit box

      const editTextBox = document.createElement("textarea");
      editTextBox.name = "editTextBox";
      editTextBox.required = true;
      editTextBox.value = usersMessage;
      newMessage.append(editTextBox);

      // show save button

      setupSaveButton(editTextBox, messageSpan);
    });
  };

  // save button functionality

  const setupSaveButton = (editTextBox, messageSpan) => {

    // create and append button

    const saveButton = document.createElement("button");
    saveButton.innerText = "save";
    saveButton.type = "button";
    newMessage.append(saveButton);

    // save edit

    saveButton.addEventListener("click", function() {

      // declare new message text

      usersMessage = editTextBox.value;

      // reset message html

      messageSpan.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> wrote: ${usersMessage}`;
      editTextBox.remove();
      removeDisplayedButtons();
      setupRemoveButton();
      setupEditButton();
    });
  };

  // set message html and add buttons

  addMessage();

  // reset form

  messageForm.reset();
});
