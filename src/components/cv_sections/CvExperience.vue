<template>
	<section>
		<h2 class="text-2xl font-bold text-secondary mb-4 flex items-center">
			<i class="pi pi-briefcase mr-3 text-primary" />
			<span>{{ $t('experience') }}</span>
		</h2>
		<div class="space-y-6">
			<div v-for="(exp, index) in experiences" :key="index" class="relative pl-8 timeline-item">
				<div
					class="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary border-4 border-light flex items-center justify-center">
					<div class="w-2 h-2 rounded-full bg-white" />
				</div>
				<div class="bg-light p-6 rounded-lg border border-light">
					<h3 class="text-xl font-semibold text-dark">
						{{ exp.title }} <span class="text-sm text-info">({{
							exp.location }})</span>
					</h3>
					<div class="flex flex-wrap items-center text-text text-sm mb-2">
						<span class="mr-4">
							<i class="pi pi-building mr-1 text-primary" />
							{{ exp.company }}
						</span>
						<span>
							<i class="pi pi-calendar mr-1 text-primary" /> {{ exp.period }}
						</span>
					</div>
					<p class="text-justify text-sm mb-3">{{ exp.description }}</p>

					<div v-if="exp.responsibilities" class="print:text-xs mb-3">
						<h4 class="font-medium text-dark mb-1">{{ $t('responsibilities') }}:</h4>
						<ul class="list-disc pl-5 space-y-1 text-xs">
							<li v-for="(responsibility, respIndex) in exp.responsibilities" :key="respIndex">
								{{ responsibility }}
							</li>
						</ul>
					</div>

					<div class="flex flex-wrap gap-2">
						<span
							v-for="(skill, skillIndex) in exp.skills" :key="skillIndex"
							class="bg-primary bg-opacity-10 text-light text-xs px-2 py-1 rounded">
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
})
</script>
