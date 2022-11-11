<template>
    <v-card>
        test  id = {{this.roomID}}
    </v-card>
</template>
<script>
export default {
    name: 'chatroomComponents',
    data(){
        return({
            roomID:''
        })
    },
    mounted(){
        this.roomID = this.$router.currentRoute.query.roomId
    },
    methods:{
    test(){
        console.log(1)
    }
    }
}
</script>