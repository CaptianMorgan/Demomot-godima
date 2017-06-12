/**
 * Created by godima on 12.06.2017.
 */

function loginOverlay() {
    // initialize modal element
    var modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '275px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
    modalEl.innerHTML= '<form action="../php/login.php" class="mui-form"><legend>Connexion</legend><div class="mui-textfield"><input type="text" placeholder="Pseudo" id="usePseudo" name="usePseudo"></div><div class="mui-textfield"><input type="password" id="usePassword" name="usePassword" placeholder="Mot de passe"></div><button type="submit" class="mui-btn mui-btn--raised">Submit</button> <a onclick="signinOverlay()">Inscription</a></form>';

    // show modal
    mui.overlay('on', modalEl);
}

function signinOverlay(){
    // initialize modal element
    var modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '335px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
    modalEl.innerHTML= '<form action="../php/signin.php" method="post" class="mui-form"><legend>Inscription</legend><div class="mui-textfield"><input type="text" placeholder="Pseudo" id="usePseudo" name="usePseudo"></div><div class="mui-textfield"><input type="password" id="usePassword" name="usePassword" placeholder="Mot de passe"></div><div class="mui-textfield"><input type="password" id="usePasswordCheck" name="usePasswordCheck" placeholder="Password"></div><button type="submit" class="mui-btn mui-btn--raised">Submit</button> <a onclick="loginOverlay()">Connexion</a></form>';

    // show modal
    mui.overlay('on', modalEl);
}