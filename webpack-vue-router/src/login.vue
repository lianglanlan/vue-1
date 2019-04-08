<template>
    <div>
        <h1>登录组件--{{msg}}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg : '123'
        }
    },
    methods: {
        show(){
            console.log('调用了login组件的show方法')
        }
    }
}
</script>
<style>
    
</style>
