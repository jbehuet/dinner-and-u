<template>
    <div class="navbar-fixed">
        <nav class="grey lighten-5" role="navigation">
            <div class="nav-wrapper container">
                <img src="img/logo.png" height="55px">
                <a v-link="{ path: '/' }" class="brand-logo"> Dinner & U</a> 
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a  v-link="{ path: '/parties' }" class="text-brown-light" v-if="($route.path != '/' && $route.path != '/parties' )">Liste des diners</a></li>
                </ul>  
            </div>
        </nav>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
}
</script>
