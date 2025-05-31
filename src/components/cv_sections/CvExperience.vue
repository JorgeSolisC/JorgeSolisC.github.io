<template>
	<section>
		<h2 class="text-2xl font-bold text-secondary mb-4 flex items-center">
			<i class="fas fa-briefcase mr-3 text-primary" />
			<span>{{ $t('experience') }}</span>
		</h2>
		<div class="space-y-6">
			<div v-for="(exp, index) in experiences" :key="index" class="relative pl-8 timeline-item">
				<div
					class="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary border-4 border-light flex items-center justify-center">
					<div class="w-2 h-2 rounded-full bg-white" />
				</div>
				<div class="bg-light p-6 rounded-lg border border-light">
					<h3 class="text-xl font-semibold text-dark">{{ exp.title[currentLanguage] }}</h3>
					<div class="flex flex-wrap items-center text-text text-sm mb-2">
						<span class="mr-4"><i class="fas fa-building mr-1 text-primary" /> {{
							exp.company[currentLanguage] }}</span>
						<span><i class="fas fa-calendar-alt mr-1 text-primary" /> {{ exp.period[currentLanguage]
						}}</span>
					</div>
					<p class="text-text mb-3">{{ exp.description[currentLanguage] }}</p>
					<div class="flex flex-wrap gap-2">
						<span
							v-for="(skill, skillIndex) in exp.skills" :key="skillIndex"
							class="bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
							{{ skill }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps({
    experiences: { type: Array, default: () => [] },
    currentLanguage: { type: String, default: () => '' },
})
</script>
