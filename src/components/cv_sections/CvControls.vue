<template>
	<div class="flex justify-between mb-6 no-print">
		<div class="flex items-center space-x-2 bg-white rounded-full shadow-sm p-1 border border-light">
			<button 
				:class="{'bg-primary text-white': currentLanguage === 'en'}" 
				class="px-4 py-1 rounded-full text-sm font-medium transition-colors duration-200"
				@click="emit('change-language', 'en')">
				{{ $t('lang.english') }}
			</button>
			<button 
				:class="{'bg-primary text-white': currentLanguage === 'es'}" 
				class="px-4 py-1 rounded-full text-sm font-medium transition-colors duration-200"
				@click="emit('change-language', 'es')">
				{{ $t('lang.spanish') }}
			</button>
		</div>
		<button class="flex items-center gap-2 bg-secondary hover:bg-dark text-white px-4 py-2 rounded-lg shadow-sm" @click="printCV">
			<i class="fas fa-print" />
			<span>{{ $t('print') }}</span>
		</button>
	</div>
</template>

<script setup>
const emit = defineEmits(['change-language'])

defineProps({
  currentLanguage: { type: String, default: () => 'es' },
})

const printCV = () => {
  window.print()
}
</script>