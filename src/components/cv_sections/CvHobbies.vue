<template>
	<section>
		<h2 class="text-2xl font-bold text-secondary mb-4 flex items-center">
			<i class="pi pi-palette mr-3 text-primary" />
			<span>{{ $t('hobbies') }}</span>
		</h2>
		<div class="space-y-4">
			<div
				v-for="(hobby, index) in hobbies" :key="index">
				<div class="flex ml-2 text-xs">
					<div class="w-1 h-6 rounded-full bg-primary border-2 border-light mr-2" />
					<span class="font-medium text-dark">{{ hobby }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps({
    hobbies: { type: Array, default: () => [] },
})
</script>
