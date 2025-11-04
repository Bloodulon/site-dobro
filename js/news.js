// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-container");
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get("id");

  fetch("data/news.json")
    .then(r => r.json())
    .then(newsList => {
      if (newsId) {
        showSingleNews(newsList, newsId);
      } else {
        showNewsList(newsList);
      }
    })
    .catch(() => {
      container.innerHTML = "<p>Ошибка загрузки новостей.</p>";
    });
});

function showNewsList(newsList) {
  const container = document.getElementById("news-container");
  let html = `<h1 class="title title--small-window--little">Новости</h1><div class="news-grid">`;

  newsList.reverse().forEach(news => {
    const preview = news.text.split("\n")[0].slice(0, 130) + "...";
    const date = formatDate(news.date);
    const thumb = news.images?.[0] ? `images/news/${news.images[0]}` : "images/news/placeholder.jpg";

    html += `
      <article class="news-card">
        <img src="${thumb}" alt="" class="news-card__img">
        <div class="news-card__content">
          <h3><a href="news.html?id=${news.id}">${news.title}</a></h3>
          <p class="news-card__date">${date}</p>
          <p class="news-card__preview">${preview}</p>
        </div>
      </article>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function showSingleNews(newsList, id) {
  const news = newsList.find(n => n.id === id);
  const container = document.getElementById("news-container");

  if (!news) {
    container.innerHTML = "<p>Новость не найдена.</p>";
    return;
  }

  const paragraphs = news.text.split("\n").filter(p => p.trim());
  let content = "<p class=\"news-page__text\">";

  paragraphs.forEach(p => {
    if (p.match(/^\d+\./)) {
      content = content.replace(/<\/p>$/, "");
      content += `<ol><li>${p.replace(/^\d+\.\s*/, "")}</li></ol><p class="news-page__text">`;
    } else if (p.startsWith("·")) {
      content = content.replace(/<\/p>$/, "");
      content += `<ul><li>${p.slice(1).trim()}</li></ul><p class="news-page__text">`;
    } else {
      content += p + "<br><br>";
    }
  });
  content += "</p>";

  const images = news.images?.map(img => 
    `<img class="news-page__image" src="images/news/${img}" alt="">`
  ).join("") || "";

  container.innerHTML = `
    <a href="news.html" class="news-page__link">Назад</a>
    <h1 class="title title--small-window--little">${news.title}</h1>
    <p class="news-date">${formatDate(news.date)}</p>
    ${content}
    <div class="news-page__image-container">${images}</div>
  `;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}