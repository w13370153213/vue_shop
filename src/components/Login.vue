/* eslint-disable indent */ /* eslint-disable indent */ /* eslint-disable indent
*/ /* eslint-disable indent */
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="头像图片" />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="100px" class="login_form">
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" prefix-icon="el-icon-unlock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则
      loginFormRules: {
        // 验证用户名是否正确
        usernaem: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            // eslint-disable-next-line indent
            min: 3,
            max: 10,
            message: '长度应该在3-10之间',
            trigger: 'blur'
            // eslint-disable-next-line indent
          }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度应该在6-16之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 将登录成功的token值存储在sessiongStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 通过链式导航跳转到主页
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
