# scoped
当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。
```
<style scoped>
div{
    color: red;
}
</style>
```
# 使用预处理器
## scss或less的使用
需安装scss或less对应的loader并在webpack的配置文件中进行配置后使用
```
<style lang="scss" scoped>
body{
    div{
        font-style: italic;
    }
}
</style>
```
