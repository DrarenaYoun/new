function menudd() {
    var dd = document.getElementsByClassName("myMenu");
    if (dd.class == "menu") {
        dd.className += "responsive";
    } else {
        dd.className = "menu";
    }
}