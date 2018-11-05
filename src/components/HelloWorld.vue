<template>
 <div><carousel :perPage="1">
   <slide><span class="label">1</span></slide>
   <slide><span class="label">2</span></slide>
   <slide><span class="label">3</span></slide>
   </carousel>
  </div>
</template>

<script>

export default {
    name: 'helloworld',
    data () {
        return { }
    }
}
</script>