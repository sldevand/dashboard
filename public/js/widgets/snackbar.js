function showSnackbar(message) {
    let $snackbar = document.getElementById("snackbar");
    $snackbar.className = "show";
    $snackbar.innerHTML = `<span>${message}</span>`;
    setTimeout(
        () => {
            $snackbar.className = $snackbar.className.replace("show", "");
            $snackbar.innerHTML = `<span></span>`;
        }
        , 3000
    );
}
