// copyright

const today = new Date();

const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `Hayley ${thisYear}`

footer.appendChild(copyright);

// skills

const skills = ["JavaScript", "HTML", "CSS", "React", "Ruby on Rails"];

const skillsSection = document.getElementById("skills");

const skillsList = skillsSection.querySelector("ul")

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}
