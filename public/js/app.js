var username = document.getElementById("github-username");
var value;

username.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        value = username.value;
        console.log(value);
        $.getJSON("https://api.github.com/users/" + value + "/repos?per_page=1000", function (data) {
            console.log(data);
        });
    }
});

