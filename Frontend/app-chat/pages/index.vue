<template>
  <v-card elevation="5"  class="container-card">
    <v-col>
    <div>
      <v-text-field v-model="roomId" placeholder="Enter Room ID"/>
    </div>
    <v-row>
        <div class="btn-margin" style="margin-right:10px;margin-left: 15px;" @click="joinRoom"><v-btn>Join Room</v-btn> </div>
        <div class="btn-margin"  style="margin-right:10px;" @click="create"><v-btn>Create Room</v-btn></div>
        <v-flex v-show="created">it's feature</v-flex>
    </v-row>
  </v-col>
  </v-card>
</template>

<script>
import Login from '@/pages/login'
export default {
  name: 'IndexPage',
  components:{Login},
  data(){
    return({
      roomId:'',
      created:false
    })
  },
  methods:{
    joinRoom(){
      this.$router.push({
        name: "chatRoom",
        query:{roomId:this.roomId }
      })
    },
    create(){
      this.created = !this.created
    }
  }
}
</script>
<style scoped>
.btn-margin{
  margin-bottom: 20px;
}
</style>
