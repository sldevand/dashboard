$(document).ready(() => {
    const form = $('#formcon');
    const resultElement = $('#resultCon');

    resultElement.slideUp('fast');
    form.on('submit', e => {
        e.preventDefault();
        var pass = $('#con_password').val();

        if (!checkField(pass)) {
            resultElement.css("color", "red");
            resultElement.text('Veuillez remplir correctement tous les champs');
            resultElement.slideDown('fast').delay(2000).slideUp('fast');

            return;
        }

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: html => {
                var result = html.substring(0, 7);
                if (result === "Bonjour") {
                    window.setTimeout(() => {
                        window.location.href = 'index.php';
                    }, 10);

                    return;
                }
                resultElement.css("color", "red");
                resultElement.text(html).show();
                resultElement.slideDown('fast').delay(2000).slideUp('fast');
                $("#error").html(html).show();
            }
        });
    });
});
