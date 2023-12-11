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
const reposite = container.querySelector(".repositorio");
console.log(reposite);
const baseUrl = `https://api.github.com/users`;

const getUserUrl = (inputValue) => `${baseUrl}/${inputValue}`;
const getUserRepo = (inputValue) => `${baseUrl}/${inputValue}/starred`;
 
// ${baseUrl}/${inputValue}/stars

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Não foi possivel obter os dados");
    }
    return response.json();
  } catch ({ name, message }) {
    alert(`${name}:${message}`);
  }
};

const getUserInfoData = (user) => fetchData(getUserUrl(user));
const getUserRepoData = (repo) => fetchData(getUserRepo(repo));

const showGitUserInfo = async (user) => {
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
  } = await getUserInfoData(user);
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
};
const showGitRepoInfo = async (user) => {
  const data = await getUserRepoData(user);
  const RepoData = await getUserRepoData(user);
  console.log(RepoData)
   RepoData.map((t)=>{
    reposite.innerHTML += `
    <div class="repo-container">
                <div class="posi">
                  <h3>${t.name}</h3>
                  <p>${t.description}</p>
                  <div class="descri">
                     <div class="stars">
                      <img src="./images/estrela.png" alt="stars">
                      <p>${t.stargazers_count}</p>
                     </div>
                      <p>${t.language}</p>
                      <a href="https://github.com/AnaCosta29">
                        <img src="./images/acao.png" alt="stars">
                      </a>
                  </div>
                </div>
              </div>
    `
   })



};
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const inputValue = searchInput.value;
  showGitUserInfo(inputValue);
  showGitRepoInfo(inputValue);
});
