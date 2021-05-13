<template>
  <div>
    <div class='router'>
      <ul>
        <li v-for=' route in routes' :key='route.name'>
          <router-link :to='route.path'>{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
    <i-header
      class='header'
      :afterConnectWallet='afterConnectWallet'
    />
    <div class='content'>
      <router-view />
    </div>
    <i-footer class='footer' />
  </div>
</template>

<script>
import router from '@/router'
import IHeader from './Header'
import IFooter from './Footer'
import web3Utils from 'web3-utils'
import Web3Wallet from '@/components/web3/wallet'
import { mapActions, mapState } from 'vuex'
import { WEB3_WALLET } from '@/constant'


export default {
  data() {
    return {
      pollChainTimeObj: null,
      pollAccountAddressTimeObj: null,
      routes: []
    }
  },
  components: {
    IHeader,
    IFooter

  },
  props: {},
  computed: {
    ...mapState('main', [
      'currentChain',
      'account',
      'web3',
      'wallet'
    ])
  },
  watch: {},
  created() {
  },
  mounted() {
    //
    this.routes = router.getRoutes()
    //
    this.setupOnlineEnvironment()
  },
  methods: {

    ...mapActions('main', [
      'changeChain',
      'setWallet',
      'setAccountBalance'
    ]),

    setupOnlineEnvironment: web3Utils._.debounce(function() {
      const that = this
      that.clearIntervals()
      //
      if (that.account.address !== null && that.account.identifier === WEB3_WALLET) {
        if (window.ethereum.isMetaMask) {
          that.checkWeb3WalletAccountAddressChange()
          that.checkWeb3WalletNetwork()
        } else {
          that.pollWeb3WalletNetwork()
          that.pollWeb3WalletAccountAddress()
        }
      }
    }),

    //清理轮询
    clearIntervals() {
      clearInterval(this.pollChainTimeObj)
      clearInterval(this.pollAccountAddressTimeObj)
    },

    pollWeb3WalletNetwork() {
      const that = this
      if (!that.web3.eth) {
        throw new Error('web3 not found')
      }
      if (!that.web3.eth.net || typeof that.web3.eth.net.getId !== 'function') {
        return
      }
      that.pollChainTimeObj = setInterval(() => {
        that.web3.eth.net.getId().then(id => {
          that.changeChain(id)
          clearInterval(that.pollChainTimeObj)
        }).catch(e => {
          throw e
        })
      }, 500)
    },

    pollWeb3WalletAccountAddress() {
      const that = this
      //
      that.pollAccountAddressTimeObj = setInterval(() => {
        if (!that.web3.eth) {
          throw new Error('web3 not found')
          //
          clearInterval(this.pollAccountAddressTimeObj)
        }
        //获取到账户
        that.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            throw new Error('Get accounts error' + err)
            clearInterval(that.pollAccountAddressTimeObj)
          }
          if (!accounts.length) {
            throw new Error('Please make sure that your Web3 Wallet is unlocked')
            clearInterval(that.pollAccountAddressTimeObj)
          }
          const address = accounts[0]
          if (that.account.address !== null && address.toLowerCase() !== that.account.address.toLowerCase()) {
            //钱包对象
            this.setWallet(new Web3Wallet(address))
            clearInterval(that.pollAccountAddressTimeObj)
          }
        })
      }, 500)
    },

    checkWeb3WalletAccountAddressChange() {
      const that = this
      try {
        window.ethereum.on('accountsChanged', account => {
          if (account.length > 0) {
            that.setWallet(new Web3Wallet(account[0]))
          }
        })
      } catch (e) {
        throw e
      }
    },

    checkWeb3WalletNetwork() {
      const that = this
      that.web3.eth.net.getId().then(id => {
        that.changeChain(id)
      })
      window.ethereum.on('networkChanged', id => {
        that.changeChain(id)
      })
    },

    afterConnectWallet() {
      this.setupOnlineEnvironment()
    }

  }
}
</script>
<style lang='scss' scoped>
.router {
  display: flex;
  justify-content: flex-start;

  ul {
    li {
      list-style: none;
    }
  }
}

.header {
  padding: 30px;
  margin-top: 10px;
  border: black solid 1px;
}

.content {
  padding: 30px;
  margin-top: 10px;
  border: black solid 1px;
}

.footer {
  padding: 30px;
  margin-top: 10px;
  border: black solid 1px;
}
</style>
