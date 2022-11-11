<template>
    <v-card elevation="3" style="padding: 20px;">
            <div v-if="!joined" class="parent">
                <v-col>
                <strong>Enter your name</strong>
                <v-flex class="container">
                    <v-text-field type="text" class="username" v-model="currentUser" />
                    <v-btn class="btn" @click="join"> Join</v-btn>
                </v-flex>
            </v-col>
            </div>
            <div v-if="joined">
                <v-col>
                <strong>Chat Room V.1</strong>
            <v-col style="height:400px;overflow-y: auto;">
                <v-row v-for="message in message" :key="message.id">
                    <v-card elevation="5" style="width: 100%;padding:20px;margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                        <strong>{{message.user}}</strong>: {{message.text}}
                    </v-card>
                </v-row>
            </v-col>
            <v-col>
            <v-row style="margin-top:20px;">
                    <textarea id="text" style="border-style:solid;width:100%;" v-model="text" @keyup.enter="sendMessage" />
                    <v-row class="mt-2">
                        <v-col md="6" style="font-size:8px">press button or enter to send message</v-col>
                        <v-col md="6" class="d-flex justify-end"><v-btn @click="sendMessage">send</v-btn></v-col>
                    </v-row>
            </v-row>
        </v-col>
    </v-col>
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
            roomID:'',
            yourId:''
        })
    },
    mounted(){
        this.roomID = this.$router.currentRoute.query.roomId
        this.socketInstance = io('http://localhost:5000/')
    },
    methods:{
        join(){
            this.joined = true
            this.socketInstance.on('message:received',(data)=>{this.message.push(data)})
        },
sendMessage(){
  
        this.addtext()

    this.text=''
},
addtext(){
        const messages = {
        id:this.yourId,
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