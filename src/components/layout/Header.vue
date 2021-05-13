<template>
  <div class='headerMain'>
    <div class='row' v-if='account.address'>
      <div>
        banner
      </div>
      <div class='info'>
        <div>
          <label>
            账户余额
            <span>【{{ account.balanceString }} {{ currentChain.currencyName }}】</span>
          </label>
        </div>
        <div>
          <label>
            账户地址
            <span>【{{ account.address }}】</span>
          </label>
        </div>
        <div>
          <label>
            当前网络
            <span>【{{ currentChain.name }}】</span>
          </label>
        </div>
      </div>
    </div>
    <div class='row' v-else>
      <div>
        banner
      </div>
      <div>
        <button @click='connectWallet'>连接钱包</button>
      </div>
    </div>
  </div>
</template>

<script>

import { nextTick } from 'vue'
import { mapActions, mapState } from 'vuex'
import Web3 from 'web3'
import Web3Wallet from '@/components/web3/wallet'

export default {
  name: 'Head',
  data() {
    return {
      balance: '0',
      loading: false
    }
  },
  components: {},
  props: {
    accountAddress: {
      type: String,
      default: ''
    },
    afterConnectWallet: {
      type: Function,
      default: function() {
      }
    }
  },

  computed: {
    ...mapState('main', ['currentChain', 'web3', 'account'])
  },

  watch: {
    account: {
      deep: true,
      handler: function(val) {
        if (val) {
          this.account = val
          this.loadBalance()
        }
      }
    },
    currentChain: {
      deep: true,
      handler: function(val) {
        if (val) {
          this.loadBalance()
        }
      }
    }
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {

    ...mapActions('main', ['setWallet', 'setWeb3', 'setAccountBalance']),

    loadBalance() {
      const that = this
      that.loading = true
      //
      nextTick(() => {
        if (that.account.address) {
          that.web3.eth.getBalance(that.account.address.toLowerCase()).then(res => {
            that.setAccountBalance(res)
          }).catch(e => {
            throw e
          })
        }
        this.loading = false
      })
    },

    /**
     * 连接钱包
     */
    async connectWallet() {
      const that = this
      if (window.ethereum) {
        try {
          await window.ethereum.enable()
        } catch (e) {
          if (e.stack && e.stack.includes('Error: User denied account authorization')) {
            throw e
          }
          return
        }
        const web3Obj = new Web3(window.ethereum)
        //web3
        this.setWeb3(web3Obj._provider)
        //
        await that.signIn(web3Obj, 'ethereum')
      } else if (window.web3) {
        //web3
        this.setWeb3(window.web3._provider)
        //
        await that.signIn(window.web3)
      }

    },

    /**
     * 登录账户
     */
    async signIn(web3Obj, type) {
      try {
        const accounts = await web3Obj.eth.getAccounts()
        //if (type === "ethereum") {
        //window.ethereum.autoRefreshOnNetworkChange = false;
        //}
        //钱包对象
        this.setWallet(new Web3Wallet(accounts[0]))
        //
        this.afterConnectWallet()
      } catch (e) {
        if (e.stack && e.stack.includes('Error: User denied account authorization')) {
          throw e
        }
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.headerMain {
  .row {
    display: flex;
    justify-content: space-between;

    .info {
      display: flex;
    }
  }
}
</style>
