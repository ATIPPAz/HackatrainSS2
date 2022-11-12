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
                <strong>Chat Room V.1</strong><v-spacer></v-spacer><p>User: {{currentUser}}</p>
            <v-col style="height:400px;overflow-y: auto;">
                <v-row v-for="message in message" :key="message.id">
                    <v-card elevation="5" style="width: 100%;padding:20px;margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                        <strong>{{message.user}}</strong>: {{message.text}}
                    </v-card>
                </v-row>
            </v-col>
            <v-col>
            <v-row style="margin-top:20px;">
                <v-col md="10"><textarea id="text" style="border-style:solid;width:100%;" v-model="text" @keyup.enter="sendMessage" /></v-col>
                <v-col md="2"><input type="file" @change="up"/></v-col>
                <v-img v-show="image" :src="image"/>
                    <v-row class="mt-2">
                        <v-col md="6" style="font-size:16px">press button or enter to send message</v-col>
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
            yourId:'',
            image:null
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
        up(e){
            const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    // var fs = require('fs'),
                    // PNG = require('pngjs').PNG;
                    // fs.createReadStream('in.png')
                    //     .pipe(new PNG())
                    //     .on('parsed', function() {
                    //         for (var y = 0; y < this.height; y++) {
                    //             for (var x = 0; x < this.width; x++) {
                    //                  var idx = (this.width * y + x) 
                    //                  this.data[idx] = 255 - this.data[idx]; // R
                    //                  this.data[idx+1] = 255 - this.data[idx+1]; // G
                    //                 this.data[idx+2] = 255 - this.data[idx+2]; // B// and reduce opacity
                    //                 this.data[idx+3] = this.data[idx+3]
                    //             }
                    //         }
                    //         this.pack().pipe(fs.createWriteStream('out.png'))});
                            this.image = e.target.result;
                            const base64String = reader.result
                             // .replace('data:', '')
                             // .replace(/^.+,/, '');
                             console.log(base64String)
                            }

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