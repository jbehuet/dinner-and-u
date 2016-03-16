<template>
<div class="card grey lighten-5 animated fadeIn">
   <a class="btn-floating btn-large waves-effect waves-light brown-orange recipe-edit"><i class="material-icons">mode_edit</i></a>
   <a class="btn-floating btn-large waves-effect waves-light brown-orange recipe-delete"><i class="material-icons">delete</i></a>
   <img src="img/recipe_sample.png" alt="" class="recipe">
   <div class="card-content">
        <div class="row">
            <div class="col s3 offset-s1 arrow">
                <img src="img/left.png">
            </div>
            <div class="col s4 title">
                {{selectedRecipe.title}}
            </div>
            <div class="col s3 arrow">
                <img src="img/right.png">
            </div>
        </div>
        <div class="row">
            <div class="col s12">
               {{selectedRecipe.description}}
            </div>
        </div>
        <div class="row">
            <div class="col s12 notes">
              <i class="material-icons prefix" v-if="selectedRecipe.note >= 1">grade</i>
              <i class="material-icons prefix" v-if="selectedRecipe.note >= 2">grade</i>
              <i class="material-icons prefix" v-if="selectedRecipe.note >= 3">grade</i>
              <i class="material-icons prefix" v-if="selectedRecipe.note >= 4">grade</i>
              <i class="material-icons prefix" v-if="selectedRecipe.note == 5">grade</i>
            </div>
        </div>
        <div class="row">
            <div class="col s2">
                <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="getRecipes(-1)" :disabled="(startIndex <= 0)">&#60;</button>
            </div>
            <div class="col s2 offset-s8">
                <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="getRecipes(1)" :disabled="!(startIndex < recipes.length - 1)">&#62;</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            recipes: [
                {id:0, title: 'Plat 1', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat dolorum beatae eligendi molestias voluptatibus porro, minus dolor eos accusantium labore, excepturi aut voluptas quam! Delectus in velit, aliquid possimus voluptate.', note: 3},
                {id:1, title: 'Plat 2', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat dolorum beatae eligendi molestias voluptatibus porro, minus dolor eos accusantium labore, excepturi aut voluptas quam! Delectus in velit, aliquid possimus voluptate.', note: 4},
            ],
            selectedRecipe : {},
            startIndex: 0
        }
    },
    created(){
        this.getRecipes(this.startIndex);
    },
    methods: {
        getRecipes(move){
            this.startIndex += move;
            this.selectedRecipe = this.recipes[this.startIndex];
        }
    }
}
</script>