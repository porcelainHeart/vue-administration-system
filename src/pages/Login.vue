<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form-label">
        <el-input placeholder="在此输入手机号" v-model="mobile">
          <template slot="prepend">手机号</template>
        </el-input>
      </div>
      <div class="form-label">
        <el-input placeholder="在此输入验证码" v-model="code">
          <template slot="prepend">验证码</template>
          <el-button slot="append" :loading="sendcodeLoading" @click="getcode">
            <template v-if="!sendcodeLoading">发送验证码</template>
            <template v-if="sendcodeLoading">{{timeCount}}秒</template>
          </el-button>
        </el-input>
      </div>
      <div class="vuerify-error">
        <div v-show="errors.mobile">手机号 | {{errors.mobile}}</div>
        <div v-show="errors.code">验证码 | {{errors.code}}</div>
      </div>
      <div class="form-label">
        <el-button type="primary" @click="login"
          :loading="loginLoading"
          :disabled="!!errors.mobile || !!errors.code">登&nbsp;&nbsp;录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { lowCountDown } from '../utils'

export default {
  name: 'login-page',
  data () {
    return {
      mobile: '',
      code: '',
      sendcodeLoading: false,
      loginLoading: false,
      timeCount: 9
    }
  },
  computed: {
    errors () {
      return this.$vuerify.$errors
    }
  },
  vuerify: {
    mobile: 'phone',
    code: 'must'
  },
  methods: {
    ...mapActions([
      'clientLogin',
      'clientSendCode'
    ]),
    login () {
      this.$vuerify.check()
      const { mobile, code, loginLoading } = this
      if (loginLoading || this.$vuerify.invalid) return
      this.loginLoading = true

      this.clientLogin({mobile, code}).then(res => {
        if (res.code === 200) {
          window.localStorage.userInfo = mobile
          console.log(this.$route)
          this.$router.push('/client')
        }
      }).finally(() => {
        this.loginLoading = false
      })
    },
    getcode () {
      let { timeCount, sendcodeLoading, mobile, errors } = this
      this.$vuerify.check()
      if (sendcodeLoading || errors.mobile) return

      this.sendcodeLoading = true
      this.clientSendCode({mobile})
      lowCountDown(() => {
        this.timeCount--
      }, () => {
        this.sendcodeLoading = false
        this.timeCount = ++timeCount
      }, timeCount)
    }
  }
}
</script>
<style>
.login-page{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .vuerify-error{
    padding: 8px 0;
    color: #ff4949;
    font-size: 14px;
  }
}
.login-form{
  width: 350px;
  >.form-label{
    padding: 8px 0;
    > button {
      width: 100%;
    }
  }
}
</style>
