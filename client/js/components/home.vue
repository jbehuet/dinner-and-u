<template>
<div class="card animated slideInDown">
   <div class="card-content">
        <h3>Connection</h3>
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
                <label for="icon_prefix">Password</label>
            </div>
            <button type="submit" class="btn btn-success btn-block brown-orange">Connect</button>
        </form>
        <div class="row">
            <div class="col s2">
                <a href="#/signup">Create an account</a>
            </div>
            <div class="col s2">
                <a href="">Forgot password ?</a>
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