const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const heading = document.createElement("div");
  heading.className = "repository-heading";

  const link = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url;
  link.textContent = repository.name;

  const date = document.createElement("time");
  date.className = "starred-date";
  date.dateTime = repository.starredAt;
  date.textContent = `Starred ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const language = document.createElement("p");
  language.className = "repository-language";
  language.textContent = repository.language;

  heading.append(link, date);
  item.append(heading, description, language);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
    listStatus.textContent = repositories.length === 0
      ? "No starred repositories yet."
      : `${repositories.length} starred repositories`;
  } catch {
    listStatus.textContent = "Repositories could not be loaded. Please try again later.";
  }
}

loadRepositories();