<template>
    <v-card>
        test  id = {{this.roomID}}
   <div v-if="!joined" class="parent">
    <div class="container">
    ไม่สามารถเชื่อมต่อห้องได้
        <input type="text" class="username" v-model="currentUser" />
        <button class="btn" @click="join"> Join</button>
    </div>
   </div>
   <div v-if="joined">
    <div class="container-list">
    <div v-for="message in message" :key="message.id">
        <b>
{{message.user}} 
        </b>
        : {{message.text}}
    </div>
</div>
<div class="container-text">
    <textarea class="text-area" v-model="text" @keyup.enter="sendMessage" />
</div>
   </div>
   
    </v-card>
</template>
<script>
import io from 'socket.io-client'
export default {
    name: 'chatroomComponents',
    data(){
        return({
            joined:false,
            currentUser:'',
            text:'',
            message:[],
            socketInstance:null,
            roomID:''
        })
    },
    mounted(){
        this.roomID = this.$router.currentRoute.query.roomId
    },
    methods:{
join(){
    this.joined = true
    this.socketInstance = io('https:localhost:4000')
    this.socketInstance.on(
        'message:received',(data)=>{
           this.message.push(data)
        }
    )
},
sendMessage(){
this.addtext()
this.text=''
},
addtext(){
        const messages = {
        id:new Date().getTime(),
        user:this.currentUser,
        text:this.text,
        time:new Date().getTime()
    }
    this.message.push(messages)
    this.socketInstance.emit('message',messages)
}
    }
}
</script>