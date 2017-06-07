<template>
  <div class="agent-page">
    <div class="pagination-box">
      <el-button @click="testApi">testapi</el-button>
      <el-button @click="dialogFormVisible = true" type="primary" style="float: left;">新建账户</el-button>
      <!-- 分页器 -->
      <el-pagination v-if="limit < total"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :layout="pageLayout"
        :total="total">
      </el-pagination>
    </div>
    <!-- 账户显示表格 -->
    <el-table :data="clients"
      v-loading="tableLoading"
      element-loading-text="拼命加载中" >
      <el-table-column prop="id" width="80" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template scope="item">
          <el-button type="text" size="small"
            v-if="item.row.is_admin == 0"
            @click.native.prevent="setAdmin(item.row)">管理员委任</el-button>
          <el-button type="text" size="small"
            @click.native.prevent="showDetail(item.row)"
            >详情</el-button>
          <el-button type="text" size="small" 
            v-if="item.row.is_admin == 0" 
            @click.native.prevent="delClient(item.row)"
            class="delete-button">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog title="新建账户" size="tiny" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" :class="{'v-error': errors['form.name']}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off" :class="{'v-error': errors['form.mobile']}"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off" :class="{'v-error': errors['form.email']}"></el-input>
        </el-form-item>
        <el-form-item label="消息通知" :label-width="formLabelWidth">
          <el-checkbox v-model="form.notify_setting.is_send_sms">短信</el-checkbox>
        </el-form-item>
        <div class="err-tip" v-show="errors['form.name']">姓 名 | {{errors['form.name']}}</div>
        <div class="err-tip" v-show="errors['form.mobile']">手机号 | {{errors['form.mobile']}}</div>
        <div class="err-tip" v-show="errors['form.email']">邮 箱 | {{errors['form.email']}}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="tableLoading" @click="toCreateClient">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'client',
  data () {
    return {
      clients: [],
      limit: 10,
      total: 0,
      offset: 0,
      currentPage: 1,
      tableLoading: false,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        mobile: '',
        email: '',
        notify_setting: {
          is_send_sms: 'false'
        }
      }
    }
  },
  filters: {
    log (val) {
      return console.dir(val)
    }
  },
  computed: {
    pageSize () {
      return this.limit
    },
    pageLayout () {
      const haveJumper = this.total / this.pageSize > 5
      return `total, prev, pager, next ${haveJumper ? ', jumper' : ''}`
    },
    errors () {
      return this.$vuerify.$errors
    }
  },
  vuerify: {
    'form.name': 'must',
    'form.mobile': 'phone',
    'form.email': 'email'
  },
  methods: {
    ...mapActions([
      'getClientList',
      'deleteClient',
      'adminTransfer',
      'createClient'
    ]),
    testApi () {
      console.log('ax')
      axios.get('http://localhost:8118/test')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleGetClientList () {
      if (this.tableLoading) return
      this.tableLoading = true
      const {offset, limit} = this
      this.getClientList({offset, limit})
        .then(data => {
          this.clients = data.clients
          this.total = data.total
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleDeleteClient (id) {
      if (this.tableLoading) return
      this.tableLoading = true
      this.deleteClient(id)
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleAdminTransfer (id) {
      if (this.tableLoading) return
      this.tableLoading = true
      this.adminTransfer(id)
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleCreateClient (data) {
      if (this.tableLoading) return
      this.tableLoading = true
      this.createClient(data)
        .then(() => {
          // 成功后刷新列表
          this.handleGetClientList()
        })
        .finally(() => {
          this.dialogFormVisible = false
          this.tableLoading = false
        })
    },
    handleCurrentChange (page) {
      const { pageSize } = this
      this.currentPage = page
      this.offset = pageSize * (page - 1)
      this.handleGetClientList()
    },
    setAdmin (client) {
      this._confirm(`是否确认委任${client.name}的账户为管理员`, () => {
        console.log('page then')
        this.handleAdminTransfer(client.id)
      })
    },
    showDetail (client) {
    },
    delClient (client) {
      this._confirm(`是否确认删除${client.name}的账户`, () => {
        this.handleDeleteClient(client.id)
      })
    },
    toCreateClient () {
      const { $vuerify, handleCreateClient, form } = this
      $vuerify.check()
      if ($vuerify.invalid) return
      handleCreateClient(form)
    }
  },
  mounted () {
    this.handleGetClientList()
  }
}
</script>
<style>
.agent-page{
  padding: 0 8px;
  .delete-button{
    color: #ff4949;
  }
  /* 报错样式 */
  .err-tip{
    color: #ff4949;
    font-size: 12px;
  }
  >.pagination-box{
    padding: 8px 0;
    text-align: right;
  }
  /* 表格居中 */
  table{
    text-align: center;
  }
  th>div{
    text-align: center;
  }
  /* 表单底部按钮居中 */
  .dialog-footer{
    text-align: center;
    > button {
      width: 100px;
    }
  }
  /* 错误输入表单飚红 */
  .el-input.v-error > input{
    border-color: #ff4949;
  }
}
</style>
