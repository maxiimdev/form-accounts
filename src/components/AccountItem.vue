<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Account } from '../types/account'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'update', account: Account): void
}>()

const errors = ref({
  login: false,
  password: false,
  type: false,
})

const showPassword = ref(false)

const localAccount = ref({ ...props.account })

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount }
  },
  { deep: true },
)

const validateAndSave = () => {
  errors.value.login = !localAccount.value.login
  errors.value.type = !localAccount.value.type
  errors.value.password = localAccount.value.type === 'Локальная' && !localAccount.value.password

  if (!errors.value.login && !errors.value.password && !errors.value.type) {
    emit('update', localAccount.value)
  }
}

const parseAndValidateLabels = () => {
  const input = localAccount.value.labelsInput || ''
  const tags = input
    .split(';')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
  localAccount.value.labels = tags
  validateAndSave()

  console.log(localAccount.value.labels)
}
</script>

<template>
  <div class="flex py-1">
    <div class="flex-1 px-2">
      <InputText
        v-model="localAccount.labelsInput"
        id="labels"
        placeholder="Метка (через ;)"
        class="w-full"
        @blur="parseAndValidateLabels"
      />
    </div>
    <div class="flex-1 px-2">
      <SelectComponent
        v-model="localAccount.type"
        :options="['LDAP', 'Локальная']"
        placeholder="Выберите тип"
        class="w-full"
        :invalid="errors.type"
        @blur="validateAndSave"
      />
    </div>
    <div :class="localAccount.type === 'Локальная' ? 'flex-1' : 'flex-[2]'">
      <InputText
        v-model="localAccount.login"
        placeholder="Логин"
        type="text"
        autocomplete="new-login"
        class="w-full"
        :invalid="errors.login"
        @blur="validateAndSave"
      />
    </div>
    <div class="flex-1 px-2 relative" v-if="localAccount.type === 'Локальная'">
      <InputText
        v-model="localAccount.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Пароль"
        autocomplete="new-password"
        class="w-full pr-10"
        :invalid="errors.password"
        @blur="validateAndSave"
      />
      <i
        :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
        class="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        @click="showPassword = !showPassword"
      />
    </div>
    <div class="px-2">
      <ButtonComponent
        @click="emit('remove', localAccount.id)"
        label=""
        icon="pi pi-trash"
        severity="danger"
        class="w-20 h-10"
      />
    </div>
  </div>
</template>
