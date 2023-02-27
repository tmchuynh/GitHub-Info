var username = document.getElementById("github-username");
var graph = document.querySelector(".graph");
var display = document.querySelector(".display-section");
var value;

username.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        value = username.value;
        createGraph(value);
        $.getJSON("https://api.github.com/users/" + value + "/repos?per_page=500", function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                creatCards(data[i]);
            }
        });

    }
});

function createGraph(username) {
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild);
    }

    var img = document.createElement("img");
    img.setAttribute("src", "https://ghchart.rshah.org/aa130d/" + username);
    graph.appendChild(img);
}

function creatCards(info) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("animated");
    card.classList.add("fadeIn");

    var card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card.appendChild(card_body);

    var card_title = document.createElement("h5");
    card_title.classList.add("card-title");
    card_title.innerHTML = info.name;
    card_body.appendChild(card_title);

    var card_subtitle = document.createElement("h6");
    card_subtitle.className = "card-subtitle mb-2 text-muted";
    card_subtitle.innerHTML = info.pushed_at;
    card_body.appendChild(card_subtitle);

    var card_text = document.createElement("p");
    card_text.classList.add("card-text");
    card_text.innerHTML = "placeholder for languages";
    getLanguages(card_text, info);
    card_body.appendChild(card_text);

    var card_link = document.createElement("a");
    card_link.classList.add("card-link");
    card_link.setAttribute("href", info.html_url);
    card_link.innerHTML = "GitHub Repository";
    card_body.appendChild(card_link);

    var topics = document.createElement("div");
    topics.classList.add("topics");
    topics.classList.add("d-flex");
    topics.classList.add("mt-3");
    topics.classList.add("flex-wrap");

    if (info.topics.length > 0) {
        for (var i = 0; i < info.topics.length; i++) {
            var badge = document.createElement("span");
            badge.classList.add("badge");
            badge.classList.add("rounded-pill");
            badge.classList.add("text-bg-secondary");
            badge.classList.add("m-1");
            badge.innerHTML = info.topics[i];
            topics.appendChild(badge);
        }
    }
    card_body.appendChild(topics);
    display.appendChild(card);
}

function getLanguages(card_text, info) {
    $.getJSON(info.languages_url, function (data) {
        Object.keys(data).forEach(function (key) {
            console.log(key.toLowerCase());
            key = key.toLowerCase();
            var i = document.createElement("i");
            i.classList.add("bi");
            if (key === "javascript") {
                i.classList.add("bi-filetype-js");
            } else if (key === "python") {
                i.classList.add("bi-filetype-py");
            } else if (key === "c#") {
                i.classList.add("bi-filetype-cs");
            }
            i.classList.add("bi-filetype" + key);
            card_text.appendChild(i);
        });
    });
}