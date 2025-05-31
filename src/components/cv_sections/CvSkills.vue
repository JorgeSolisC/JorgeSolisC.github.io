<template>
	<section>
		<h2 class="text-2xl font-bold text-secondary mb-4 flex items-center">
			<i class="fas fa-code mr-3 text-primary" />
			<span>{{ $t('skills') }}</span>
		</h2>
		<div class="space-y-4">
			<div v-for="(skill, index) in skills" :key="index">
				<div class="flex justify-between mb-1">
					<span class="font-medium text-dark">{{ skill.name }}</span>
					<span class="text-sm text-text">{{ skill.level }}%</span>
				</div>
				<div class="w-full bg-gray-200 skill-bar">
					<div class="bg-primary skill-bar" :style="{width: skill.level + '%'}" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps({
  skills: { type: Array, default: () => [] }
})
</script>
