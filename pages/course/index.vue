<template>
  <v-container fluid>
    <v-list subheader two-line>
      <template v-for="c in fiatList">
        <v-list-item >
          <v-list-item-avatar>
            <CurrencyIcon :currency="c" :size="32" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ c.label }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ $t('course.last-course') }}</span>
              <span v-if="lastFiatCourses.hasOwnProperty(c.name)">{{ ldate(lastFiatCourses[c.name]) }}</span>
              <v-progress-circular v-else indeterminate size="12" width="3" />
              <span>{{ $t('course.amount') }}</span>
              <span v-if="amountFiatCourses.hasOwnProperty(c.name)" class="text-right">{{ amountFiatCourses[c.name] }}</span>
              <v-progress-circular v-else indeterminate size="12" width="3" />
            </v-list-item-subtitle>

            <v-progress-linear indeterminate v-show="progressFiatCourses[c.name]"/>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              v-if="c.crawler && c.crawler.forexsb && c.crawler.forexsb.from && c.crawler.forexsb.to"
              :disabled="!lastFiatCourses.hasOwnProperty(c.name) || progressFiatCourses[c.name]"
              @click="onUpdateFiat(c)">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="errorFiatCourses[c.name]">
          <v-list-item-content>
            <v-alert type="error" text>{{ $t('course.update-error', {err: errorFiatCourses[c.name]}) }}</v-alert>
          </v-list-item-content>
        </v-list-item>
      </template>

      <template v-for="c in cryptoList">
        <v-list-item>
          <v-list-item-avatar>
            <CurrencyIcon :currency="c" :size="32" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ c.label }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ $t('course.last-course') }}</span>
              <span v-if="lastCryptoCourses.hasOwnProperty(c.name)">{{ ldate(lastCryptoCourses[c.name]) }}</span>
              <v-progress-circular v-else indeterminate size="12" width="3" />
              <span>{{ $t('course.amount') }}</span>
              <span v-if="amountCryptoCourses.hasOwnProperty(c.name)">{{ amountCryptoCourses[c.name] }}</span>
              <v-progress-circular v-else indeterminate size="12" width="3" />
            </v-list-item-subtitle>

            <v-progress-linear indeterminate v-show="progressCryptoCourses[c.name]" />
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              v-if="c.crawler && c.crawler.coinmarketcap && c.crawler.coinmarketcap.slug"
              :disabled="!lastCryptoCourses.hasOwnProperty(c.name) || progressCryptoCourses[c.name]"
              @click="onUpdateCrypto(c)">

              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="errorCryptoCourses[c.name]">
          <v-list-item-content>
            <v-alert type="error" dismissible>{{ $t('course.update-error', {err: errorCryptoCourses[c.name]}) }}</v-alert>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-footer app class="pa-0">
      <v-toolbar dense>

        <v-toolbar-items class="flex-grow-1"></v-toolbar-items>

        <v-toolbar-items>
          <v-btn tile class="primary" :disabled="disableUpdateAll" @click="onUpdateAll">
            <v-icon>mdi-refresh</v-icon>
            {{ $t('course.update-all') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-container>
</template>

<script>
import Vue from "vue"
import {mapActions, mapState} from "vuex";
import * as dateFN from 'date-fns'
import CurrencyIcon from "@/components/CurrencyIcon";

export default {
  components: {CurrencyIcon},
  data(){
    return {
      lastFiatCourses: {},
      lastCryptoCourses: {},
      amountFiatCourses: {},
      amountCryptoCourses: {},
      progressFiatCourses: {},
      progressCryptoCourses: {},
      errorFiatCourses: {},
      errorCryptoCourses: {},
      disableUpdateAll: true
    }
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies.currencies,
    }),
    fiatList(){
      return Object.values(this.currencies.fiat).filter(c => c.key !== 'USD')
        .map(c => {
          return {
            name: c.key,
            label: c.label,
            crawler: c.crawler
          }
        })
    },
    cryptoList(){
      return Object.values(this.currencies.crypto)
        .map(c => {
          return {
            name: c.key,
            label: c.label,
            crawler: c.crawler
          }
        })
    }
  },
  methods: {
    ...mapActions({
      getLastCourseDate: 'courses/getLastCourseDate',
      getCourseAmount: 'courses/getCourseAmount',
      updateFiat: 'courses/updateFiat',
      updateCrypto: 'courses/updateCrypto',
    }),
    ldate(date) {
      if(!date) return '-'

      return dateFN.format(date, this.$t('common.datetime.format.date'))
    },
    updateLastFiatCourseDate(currencyName){
      Vue.delete(this.lastFiatCourses, currencyName)
      return this.getLastCourseDate({from: {type: 'fiat', name: currencyName}, to: {type: 'fiat', name: 'USD'}})
        .then(date => Vue.set(this.lastFiatCourses, currencyName, date))
    },
    updateLastCryptoCourseDate(currencyName){
      Vue.delete(this.lastCryptoCourses, currencyName)
      return this.getLastCourseDate({from: {type: 'crypto', name: currencyName}, to: {type: 'fiat', name: 'USD'}})
        .then(date => Vue.set(this.lastCryptoCourses, currencyName, date))
    },
    updateAmountFiatCourse(currencyName){
      Vue.delete(this.amountFiatCourses, currencyName)
      return this.getCourseAmount({from: {type: 'fiat', name: currencyName}, to: {type: 'fiat', name: 'USD'}})
        .then(amount => Vue.set(this.amountFiatCourses, currencyName, amount))
    },
    updateAmountCryptoCourse(currencyName){
      Vue.delete(this.amountCryptoCourses, currencyName)
      return this.getCourseAmount({from: {type: 'crypto', name: currencyName}, to: {type: 'fiat', name: 'USD'}})
        .then(amount => Vue.set(this.amountCryptoCourses, currencyName, amount))
    },
    onUpdateFiat(currency) {
      Vue.set(this.progressFiatCourses, currency.name, true)
      Vue.delete(this.errorFiatCourses, currency.name)
      return this.updateFiat({symbolFrom: currency.crawler.forexsb.from, symbolTo: currency.crawler.forexsb.to})
        .then(() => this.updateLastFiatCourseDate(currency.name))
        .then(() => this.updateAmountFiatCourse(currency.name))
        .catch(err => Vue.set(this.errorFiatCourses, currency.name, err))
        .finally(() => this.progressFiatCourses[currency.name] = false)
    },
    onUpdateCrypto(currency) {
      Vue.set(this.progressCryptoCourses, currency.name, true)
      Vue.delete(this.errorCryptoCourses, currency.name)
      return this.updateCrypto({symbol: currency.name, slug: currency.crawler.coinmarketcap.slug})
        .then(() => this.updateLastCryptoCourseDate(currency.name))
        .then(() => this.updateAmountCryptoCourse(currency.name))
        .catch(err => Vue.set(this.errorCryptoCourses, currency.name, err))
        .finally(() => this.progressCryptoCourses[currency.name] = false)
    },
    onUpdateAll(){
      return Promise.all([
        ...this.fiatList
          .filter(c => c.crawler && c.crawler.forexsb && c.crawler.forexsb.from && c.crawler.forexsb.to)
          .map(c => this.onUpdateFiat(c)),
        ...this.cryptoList
          .filter(c => c.crawler && c.crawler.coinmarketcap && c.crawler.coinmarketcap.slug)
          .map(c => this.onUpdateCrypto(c))
      ])
    }
  },
  mounted() {
    let promises = []
    for (let currency of this.fiatList) {
      promises.push(this.updateLastFiatCourseDate(currency.name))
      promises.push(this.updateAmountFiatCourse(currency.name))
    }
    for (let currency of this.cryptoList) {
      promises.push(this.updateLastCryptoCourseDate(currency.name))
      promises.push(this.updateAmountCryptoCourse(currency.name))
    }

    Promise.all(promises).then(() => this.disableUpdateAll = false)
  }
}
</script>

<style scoped>

</style>
