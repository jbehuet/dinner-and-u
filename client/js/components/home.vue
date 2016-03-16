<template>
<div class="card grey lighten-5 animated fadeIn">
   <div class="card-content">
        <div class="row">
            <div class="col s3 arrow">
                <img src="img/left.png">
            </div>
            <div class="col s6 title">
                AUTHENTIFICATION
            </div>
            <div class="col s3 arrow">
                <img src="img/right.png">
            </div>
        </div>
        <div class="bs-callout bs-callout-danger" v-if="error">
            <h4></h4>
            <p></p>
        </div>
        <form name="formConnect">
            <div class="input-field">
                <i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix">Email</label>
            </div>
            <div class="input-field">
                <i class="material-icons prefix">vpn_key</i>
                <input id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix">Mot de passe</label>
            </div>
            <button type="submit" class="btn btn-success btn-block brown-orange" v-link="{path : '/parties'}">Se connecter</button>
        </form>
        <div class="row bottom-form">
            <div class="col s6">
                <a href="#/signup">Créer un compte</a>
            </div>
            <div class="col s6 align-right">
                <a href="">Mot de passe oublié ?</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    error: false
}
</script>