<template>
	<section>
		<h2 class="text-2xl font-bold text-secondary mb-4 flex items-center">
			<i class="pi pi-code mr-3 text-primary" />
			<span>{{ $t('skills') }}</span>
		</h2>
		<div class="space-y-4">
			<div v-for="category in skills" :key="category.category">
				<h3 class="text-sm font-semibold mt-6 mb-3 text-dark">{{ category.category }}</h3>
				<div v-for="(skill, index) in category.items" :key="index" class="mb-4">
					<div class="flex justify-between mb-1 text-xs">
						<span class="font-medium text-dark">{{ skill.name || skill }}</span>
						<span v-if="skill.level" class="text-text">{{ skill.level || 80 }}%</span>
					</div>
					<div v-if="skill.level" class="w-full bg-gray-200 rounded-full h-2.5">
						<div class="bg-primary h-2.5 rounded-full" :style="{ width: (skill.level || 80) + '%' }" />
					</div>
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
