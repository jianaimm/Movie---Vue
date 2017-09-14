<template>
<div id="login">
    <x-header
        :left-options="{showBack: true,backText: ''}"
        title="时光网"
        :right-options="{showMore:false}"
        @on-click-more=""
    >
        <span>
            <img class="logo" @touchend="toIndex" src="../assets/logo_mtime.png"/>
        </span>
    </x-header>
    <div class="userInfo">
        <mu-text-field
            v-model="userInfo.userName"
            label="用户名"
            hintText="请输入用户名/手机"
            type="text"
            labelFloat
        />
        <mu-text-field
            v-model="userInfo.password"
            label="密码"
            hintText="请输入密码"
            type="password"
            labelFloat
        />
    </div>
    <x-button type="primary" style="border-radius:99px;" @touchend.native="toLogin">登录</x-button>
    <p class="freeBtns">
        <router-link class="free" :to="{name: 'Register'}" >免费注册</router-link>
        <a href="javascript:;" class="find">重置密码</a>
    </p>
    <toast
        v-model="showPositionValue"
        type="text"
        :time="800"
        width="200px"
        is-show-mask
        :text="texts"
        :position="position"
    >
    </toast>
</div>
</template>
<script>
    import { XHeader,XButton,Toast } from 'vux';

    export default {
        name: 'login',
        data(){
            return {
                userInfo: {
                    userName: '',
                    password: ''
                },
                showPositionValue: false,
                position: 'default',
                texts: ''
            }
        },
        methods: {
            toIndex(){
                this.$router.push('/');
            },
            loginStatus(){
                var storage = window.localStorage;
                console.log(storage);
               for(var i = 0; i < storage.length;i++){
                   console.log(storage.key(i),storage.getItem(this.userInfo.userName));
                   console.log(this.userInfo)
                   if(storage.key(i) == this.userInfo.userName && storage.getItem(this.userInfo.userName) == this.userInfo.password){

                       return true;
                   }
               }
                return false;
            },
            toLogin(){
                if(this.loginStatus()){
                    this.showPositionValue = true;
                    this.texts = '登录成功';
                    this.$store.commit('updateIsLogin',true);
                    this.$store.commit('updateUserName',this.userInfo.userName)
                    setTimeout(() => {
                        this.$router.push({path: '/'});
                    },1000)
                } else {
                    this.showPositionValue = true;
                    this.texts = '登录失败';
                }
            }

        },
        components: {
            XHeader,
            XButton,
            Toast
        }
    }
</script>
<style>
    #login {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 305px;
    }
    #login .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #login .userInfo {
        background: #fff;
        padding: 0 30px 20px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #login .focus-state {
        color: #7e57c2;
    }
    #login .mu-text-field-focus-line {
        background-color: #7e57c2;
    }
    #login .mu-text-field.has-label {
        text-indent: 5px;
    }
    #login button.weui-btn {
        margin-top: 30px;
        width: 88%
    }
    #login .weui-btn_primary {
        background-color: #7e57c2;
    }
    #login .freeBtns {
        overflow: hidden;
    }
    #login .free,
    #login .find {
        float: left;
        padding: 0 20px;
        color: #7e57c2;
        font: 18px/40px '微软雅黑';
    }
    #login .find {
        float: right;
        color: #cccccc;
    }
</style>
