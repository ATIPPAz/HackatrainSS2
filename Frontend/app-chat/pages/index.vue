<template>
  <v-flex class="container-card">
    <div>
      <v-text-field v-model="roomId" placeholder="Enter Room ID"/>
    </div>
    <div class="btn-margin" @click="joinRoom"><v-btn>Join Room</v-btn> </div>
    <div class="btn-margin"><v-btn>Create Room</v-btn></div>
  </v-flex>
</template>

<script>
import Login from '@/pages/login'
export default {
  name: 'IndexPage',
  components:{Login},
  data(){
    return({
      roomId:''
    })
  },
  methods:{
    joinRoom(){
      this.$router.push({
        name: "chatRoom",
        query:{roomId:this.roomId }
      })
    }
  }
}
</script>
<style scoped>
.btn-margin{
  margin-bottom: 20px;
}
</style>
