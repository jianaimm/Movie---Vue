<template>
<div id="register">
    <x-header
        :left-options="{showBack: true,backText: ''}"
        title="时光网"
        :right-options="{showMore:false}"
        on-click-back="goBack"
    >
        <span>
            <img class="logo" @touchend="toIndex" src="../assets/logo_mtime.png"/>
        </span>
    </x-header>
    <div class="userInfo">
        <mu-text-field
            v-model="userInfo.userName"
            label="用户名"
            hintText="请输入用户名"
            type="text"
            labelFloat
        />
        <mu-text-field
            v-model="userInfo.password"
            label="密码"
            hintText="6-20位字母、数字、符号组成"
            type="password"
            labelFloat
        />
        <mu-text-field
            v-model="userInfo.repassword"
            label="确认密码"
            hintText="请再输入一次密码"
            type="password"
            labelFloat
        />
    </div>
    <checklist
        label-position="right"
        @change.native="change"
        :options="commonList"
        required
    ></checklist>
    <x-button
        @touchstart.native="toRegister"
        type="primary"
        style="border-radius:99px;"
    >
        免费注册
    </x-button>
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
    <router-link class="jumpLogin" :to="{ name: 'Login'}">登录</router-link>

</div>
</template>
<script>
    import { XHeader,Checklist,XButton,Toast } from 'vux';

    export default {
        name: 'register',
        data(){
            return {
                commonList: [ '我已阅读并同意服务条款'],
                checked: false,
                showPositionValue: false,
                position: 'default',
                texts: '',
                userInfo: {
                    userName: '',
                    password: '',
                    repassword: ''
                }
            }
        },
        components: {
            XHeader,
            Checklist,
            XButton,
            Toast
        },
        methods: {
            change (val) {
//      console.log('change', val,this.checked)
                this.checked = !this.checked;

            },
            toIndex(){
                this.$router.push('/');
            },
            goBack(){

            },
            toRegister(){
                var storage = window.localStorage;

                if(this.userInfo.password === this.userInfo.repassword && this.userInfo.userName.trim() != '' && this.checked){
                    this.texts = '注册成功，正在跳转...';
                    this.showPositionValue = true;//显示弹出框；

                    storage.setItem(this.userInfo.userName,this.userInfo.password);

                    this.$store.commit('updateUserName',this.userInfo.userName);//如果注册成功，就更新store里的值；

                    setTimeout( () => {
                        this.$router.push('/login');
                    },1000);

                } else {
                    this.showPositionValue = true;
                    this.texts = '注册失败';
                }

            }
        }
    }
</script>
<style>
    #register {
        height: 100%;
        background: #f6f6f6;
        padding-bottom: 305px;
    }
    #register .logo {
        width: 80px;
        height: 30px;
        padding-top: 5px;
    }
    #register .userInfo {
        background: #fff;
        padding: 0 30px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    #register .focus-state {
        color: #7e57c2;
    }
    #register .mu-text-field-focus-line {
        background-color: #7e57c2;
    }
    #register .mu-text-field.has-label {
        text-indent: 5px;
        width: 95%;
    }
    #register button.weui-btn {
        margin-top: 20px;
        width: 88%
    }
    #register .weui-btn_primary {
        background-color: #7e57c2;
    }
    #register .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
        color: purple;
    }
    #register .jumpLogin {
        position: absolute;
        right: 0;
        bottom: 80px;
        display: inline-block;
        padding: 10px 30px;
        font: 20px/40px '微软雅黑';
        color: #7f7f7f;
    }
</style>
