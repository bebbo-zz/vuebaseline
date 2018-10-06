<template>
<div>
    <p>Hier sind wir richtig</p>
    <img v-bind:src="imageLink" height="480" width="480" />
</div>
</template>

<script>
//import db from './firebaseInit'
export default {
    name: 'display',
    data () {
        return {
            imageLink: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'            
        }
    }
    //  https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png
}
</script>
    