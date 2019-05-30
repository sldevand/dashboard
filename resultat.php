<?php
error_reporting(E_ALL);

require __DIR__ . '/php/lib/OCFram/SplClassLoader.php';
$OCFramLoader = new SplClassLoader('OCFram', __DIR__ . '/php/lib');
$OCFramLoader->register();

use OCFram\HTTPRequest;

$rq = new HTTPRequest();
include("php/gpio.php");

if ($rq->getExists("setjson") && $rq->getExists("value")) {
    changeParameters(htmlspecialchars($rq->getData("setjson")));
} elseif ($rq->getExists("piassistnode")) {
    activatePiAssistNode($rq->getData("piassistnode"));
} elseif ($rq->getExists("getpiassistnode")) {
    getPiAssistNodeActivation();
} elseif ($rq->getExists("getopenvpn")) {
    getOpenvpnActivation();
} elseif ($rq->getExists("openvpn")) {
    activateOpenvpn($rq->getData("openvpn"));
} elseif ($rq->getExists("log")) {
    getLog("/home/pi/activServer/log.txt");
} elseif ($rq->getExists("actionid") &&
    $rq->getExists("val")) {

    //PARAMETRES HTTP GET
    $id = $rq->getData("actionid");
    $etat = $rq->getData("val");

    //PARAMETRES RESEAU
    $address = 'localhost';
    $port = 5901;

    //APPEL DES ACTIONNEURS VIA ACTIVAPI (AVEC CURL)
    $url = "http://$address/activapi.fr/api/actionneurs/";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $actionneurs = json_decode(curl_exec($ch));
    curl_close($ch);

    //RECUPERATION DE L'ACTIONEUR
    $data = '';
    foreach ($actionneurs as $actionneur) {
        if ($actionneur->id == $id) {
            //Préparation des données à envoyer
            $actionneur->etat = $etat;
            $action = 'update' . ucfirst($actionneur->categorie);
            if ($actionneur->categorie == "dimmer") {
                $action .= "Persist";
            }
            $dataJSON = json_encode($actionneur);

            //Connexion et envoi des données au serveur node
            $socketio = new OCFram\SocketIO();
            if ($socketio->send($address, $port, $action, $dataJSON)) {
                echo 'OK <br>';
            } else {
                echo 'Error <br>';
            }
            return;
        }
    }

    echo "Pas d'actionneur correspondant à l'id " . $id;

} elseif ($rq->getExists("scenarioid")) {
    //PARAMETRES HTTP GET
    $id = $rq->getData("scenarioid");
    //PARAMETRES RESEAU
    $address = 'localhost';
    $port = 5901;

    //APPEL DES ACTIONNEURS VIA ACTIVAPI (AVEC CURL)
    $url = "http://$address/activapi.fr/api/scenarios/";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $scenarios = json_decode(curl_exec($ch));
    curl_close($ch);
    //RECUPERATION DE L'ACTIONEUR
    $data = '';
    foreach ($scenarios as $scenario) {
        if ($scenario->id === $id) {
            //Préparation des données à envoyer
            $action = 'updateScenario';
            $dataJSON = json_encode($scenario);

            //Connexion et envoi des données au serveur node
            $socketio = new OCFram\SocketIO();
            if ($socketio->send($address, $port, $action, $dataJSON)) {
                echo 'OK <br>';
            } else {
                echo 'Error <br>';
            }
            return;
        }
    }

    echo "Pas de scenario correspondant à l'id " . $id;
} else {
    header("location:index.php");
}

