#!/bin/bash
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

function myEcho() {
    echo ""
    echo "${green}*** $1 ***${reset}"
}

function dotenv () {
  set -a
  [ -f .env ] && . .env
  set +a
}

function remoteCommand () {
  ssh $REMOTE_HOST "$1"
}

dotenv

LOCAL_APP_PATH=$LOCAL_WWW_PATH/$LOCAL_APP_NAME
LOCAL_BUILD_PATH=$LOCAL_APP_PATH/build
LOCAL_REPO_PATH=$LOCAL_APP_PATH/build/$LOCAL_APP_NAME

myEcho "START $LOCAL_APP_NAME deployer script START"

myEcho "Local :  Build App" &&
rm -rvf $LOCAL_BUILD_PATH &&
mkdir $LOCAL_BUILD_PATH &&

myEcho "Local : Git clone $GIT_BRANCH branch" &&
cd $LOCAL_BUILD_PATH &&
git clone --single-branch --branch $GIT_BRANCH $GIT_URL &&
myEcho "Local : Remove unused files for production" &&
rm -rfv $LOCAL_REPO_PATH/deploy &&
rm -rfv $LOCAL_REPO_PATH/.git* &&
rm -rfv $LOCAL_REPO_PATH/*.md &&
rm -rfv $LOCAL_REPO_PATH/public/js/config.js.dist

eval "$(ssh-agent -s)" &&
ssh-add $SSH_PRIVATE_KEY &&

myEcho "Remote : copy from local $LOCAL_REPO_PATH to remote $REMOTE_HOST:$REMOTE_TMP_PATH" &&
scp -r $LOCAL_REPO_PATH $REMOTE_HOST:$REMOTE_TMP_PATH &&

myEcho "BEGIN Executing remote script"

myEcho "Remote : removing previous symbolic link"
remoteCommand "sudo rm -rvf \"$REMOTE_WWW_PATH/$REMOTE_APP_LINK\"" &&

myEcho "Remote : removing previous site"
remoteCommand "sudo rm -rvf \"$REMOTE_WWW_PATH/$REMOTE_APP_NAME\"" &&

myEcho "Remote : Move from tmp folder to app folder"
remoteCommand "sudo mv -v \"$REMOTE_TMP_PATH/$REMOTE_APP_NAME\" \"$REMOTE_APP_PATH\"" &&

myEcho "Remote : Node modules install" &&
remoteCommand "$REMOTE_NPM install --prefix \"$REMOTE_APP_PATH/public\""

myEcho "Remote : remove package files" &&
remoteCommand "sudo rm -f \"$REMOTE_APP_PATH\"/public/package*" &&

myEcho "Remote : Add public/js/config.js file" &&
remoteCommand "sudo cp \"$REMOTE_ENV_FILE\" \"$REMOTE_APP_PATH/public/js/\"" &&

myEcho "Remote : Creating symbolic link" &&
remoteCommand "sudo ln -s \"$REMOTE_APP_PATH/public\" \"$REMOTE_WWW_PATH/$REMOTE_APP_LINK\"" &&

myEcho "Remote : Giving correct rights" &&
remoteCommand "sudo chown -R www-data:www-data \"$REMOTE_APP_PATH\"" &&
remoteCommand "sudo chown -R www-data:www-data \"$REMOTE_WWW_PATH/$REMOTE_APP_LINK\"" &&
remoteCommand "sudo find \"$REMOTE_APP_PATH\" -type d -exec chmod 0755 {} \;" &&
remoteCommand "sudo find \"$REMOTE_APP_PATH\" -type f -exec chmod 0644 {} \;" &&
myEcho "END Executing remote script"

myEcho "Local : remove build files" &&
rm -rf $LOCAL_BUILD_PATH &&

myEcho "END $LOCAL_APP_NAME deployer script END"
