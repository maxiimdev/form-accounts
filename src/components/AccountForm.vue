<script setup lang="ts">
import AccountItem from './AccountItem.vue'
import { useAccountStore } from '../stores/accountStore'
import { type Account } from '../types/account'

const store = useAccountStore()

const addAccount = () => {
  const newAccount: Account = {
    id: crypto.randomUUID(),
    labels: [],
    labelsInput: '',
    type: null,
    login: '',
    password: null,
  }
  store.addAccount(newAccount)
}

const removeAccount = (id: string) => {
  store.removeAccount(id)
}

const updateAccount = (account: Account) => {
  store.updateAccount(account)
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center gap-5 mb-4">
      <h1 class="text-3xl font-semibold">Учетные записи</h1>
      <ButtonComponent class="w-10 h-10" @click="addAccount">
        <i class="pi pi-plus" />
      </ButtonComponent>
    </div>

    <div class="flex items-center gap-3 bg-black/50 text-white p-4 rounded-md mb-4">
      <i class="pi pi-exclamation-circle"></i>
      <span
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>

    <div>
      <div class="flex px-2 mb-2 text-gray-300 font-medium">
        <span class="flex-1 px-2 py-1">Метки</span>
        <span class="flex-1 px-2 py-1">Тип Записи</span>
        <span class="flex-1 px-2 py-1">Логин</span>
        <span class="flex-1 px-2 py-1">Пароль</span>
        <span class="w-10 py-1"></span>
      </div>
      <div v-for="account in store.accounts" :key="account.id" class="mb-2">
        <AccountItem :account="account" @remove="removeAccount" @update="updateAccount" />
      </div>
      <div v-if="store.accounts.length === 0" class="text-xl flex items-center justify-center h-96">
        Нет учетных записей
      </div>
    </div>
  </div>
</template>
