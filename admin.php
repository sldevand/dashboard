<!DOCTYPE html>

<?php
if (!isset($_SESSION)) {
    session_start();
}
?>

<html>
<head>
    <title>Activ'Home Admin</title>
    <?php
    include("php/structurePages.php");
    include("html/structureHead.html");
    include("php/userInfos.php");

    ?>
</head>

<body>

<?php navbarAdmin('Activ\'Home Admin'); ?>

<div class="container">
    <div class="row">
        <form id="formcon"
              method="post"
              class="col s12 m8 offset-m2 l6 offset-l4"
              action="php/requetes.php"
              onsubmit="return checkForm(this)">
            <h5 class="input-field textOnBodyColor">
                Connexion
            </h5>
            <div class="input-field">
                <input id="con_password" name="con_password" type="password" class="validate textOnBodyColor"
                       onblur="checkField(this)">
                <label for="con_password">Mot de Passe</label>
            </div>

            <div class="input-field">
                <button id="submit" class="btn waves-effect waves-light primaryColor">
                    Se connecter <i class="material-icons right">send</i>
                </button>
            </div>

            <h6 id="resultCon"></h6>
            <h6 id="error"></h6>
        </form>
    </div>


</div>
<script src="js/utils/formsValidate.js"></script>
<script src="js/utils/formsJquery.js"></script>

</body>
</html>
