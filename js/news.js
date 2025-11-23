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
  newsList.forEach(news => {
    const preview = news.text.split("\n")[0].slice(0, 130) + "...";
    const date = formatDate(news.date);

    let thumb = "images/news/placeholder.jpg";
    if (news.images && news.images.length > 0) {
      const firstImage = news.images.find(img => !img.endsWith('.mp4')); // Или добавьте другие видео-расширения
      if (firstImage) {
        thumb = `images/news/${firstImage}`;
      }
    }
    
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
  const date = formatDate(news.date);
  const paragraphs = news.text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
  let contentHTML = '<div class="news-page__text">';
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.startsWith("·")) {
      if (index > 0) contentHTML = contentHTML.replace(/<\/p>$/, "");
      contentHTML += `<ul><li>${paragraph.slice(1).trim()}</li></ul>`;
      if (index < paragraphs.length - 1) contentHTML += '<p class="news-page__text">';
    }
    else if (/^\d+\./.test(paragraph)) {
      if (index > 0) contentHTML = contentHTML.replace(/<\/p>$/, "");
      contentHTML += `<ol><li>${paragraph.replace(/^\d+\.\s*/, "").trim()}</li></ol>`;
      if (index < paragraphs.length - 1) contentHTML += '<p class="news-page__text">';
    }
    else {
      contentHTML += `<p>${paragraph}</p>`;
    }
  });
  contentHTML += '</div>';
  
  let imagesHTML = "";
  if (news.images && news.images.length > 0) {
    imagesHTML = `<div class="news-page__image-container">`;
    news.images.forEach(img => {
      if (img.endsWith('.mp4')) { // Добавьте проверку на другие форматы, если нужно (e.g., || img.endsWith('.webm'))
        imagesHTML += `<video class="news-page__image" src="images/news/${img}" controls loading="lazy"></video>`;
      } else {
        imagesHTML += `<img class="news-page__image" src="images/news/${img}" loading="lazy" alt="">`;
      }
    });
    imagesHTML += `</div>`;
  }
  
  container.innerHTML = `
    <a href="news.html" class="news-page__link">Назад к списку</a>
    <h1 class="title title--small-window--little">${news.title}</h1>
    <p class="news-date">${date}</p>
    ${contentHTML}
    ${imagesHTML}
  `;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}