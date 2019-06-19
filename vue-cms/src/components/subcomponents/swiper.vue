<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.url" alt :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style lang="scss" scoped>
.mint-swipe {
    height: 200px;

    img {
        height: 100%;
    }
}

.mint-swipe-item {
    text-align: center;
}

.full {
    width: 100%;
}
</style>
<script>
export default {
    props: ['lunbotuList', 'isfull']
}
</script>

