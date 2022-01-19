const container = document.querySelector("main");
const mode = container.querySelector("#mode");
const searchBtn = container.querySelector("#search");
const searchInput = container.querySelector("#searchInput");
const gitName = container.querySelector("#gitName");
const gitTag = container.querySelector("#gitTag");
const gitBio = container.querySelector("#gitBio");
const gitJoined = container.querySelector("#gitJoined");
const gitRepos = container.querySelector("#gitRepos");
const gitFollowers = container.querySelector("#gitFollowers");
const gitFollowing = container.querySelector("#gitFollowing");
const gitLocation = container.querySelector("#gitLocation");
const gitTwitter = container.querySelector("#gitTwitter");
const gitWebsite = container.querySelector("#gitWebsite");
const gitCompany = container.querySelector("#gitCompany");
const gitImage = container.querySelector("#gitImage");
const modeType = container.querySelector("#modeType");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const inputValue = searchInput.value;
  const getUserUrl = (inputValue) =>
    `https://api.github.com/users/${inputValue}`;

  const getUserData = async (user) => {
    try {
      const userUrl = getUserUrl(user);
      const response = await fetch(userUrl);

      if (!response.ok) {
        throw new Error("Não e possivel obter os dados");
      }
      const {
        name,
        login,
        followers,
        following,
        public_repos,
        location,
        bio,
        avatar_url,
        twitter_username,
        company
      } = await response.json();

      gitName.textContent = name;
      gitImage.src = avatar_url;
      gitTag.textContent = `${"@"}` + login;
      gitFollowers.textContent = followers;
      gitFollowing.textContent = following;
      gitRepos.textContent = public_repos;
      gitLocation.textContent = location;
      gitBio.textContent = bio;
      gitCompany.textContent = company;
      gitTwitter.textContent = twitter_username;
    } catch ({ name, message }) {
      alert(`${name}:${message}`);
    }
    const newDate = new Date();
    const day = new Intl.DateTimeFormat("br", { day: "2-digit" }).format(
      newDate
    );
    const month = new Intl.DateTimeFormat("br", { month: "short" }).format(
      newDate
    );
    const year = new Intl.DateTimeFormat("br", { year: "numeric" }).format(
      newDate
    );
    gitJoined.textContent = `Joined ${day} ${month} ${year}`;
  };
  getUserData(inputValue);
});
mode.addEventListener("click", () => {
  container.classList.toggle("dark");
  container.classList.contains("dark")
    ? (modeType.innerHTML = "LIGHT")
    : (modeType.innerHTML = "DARK");
});
