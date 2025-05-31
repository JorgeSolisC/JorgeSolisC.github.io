<template>
	<div id="cv" class="bg-light min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-6xl">
			<CvControls :currentLanguage="currentLanguage" @change-language="changeLanguage" />

			<div class="bg-white rounded-lg shadow-sm overflow-hidden border border-light">
				<CvHeader
					:position="profileData.position" />

				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-10">
					<div class="lg:col-span-2 space-y-8">
						<CvAbout :aboutText="profileData.aboutText" />
						<CvExperience :experiences="profileData.experiences" :currentLanguage="currentLanguage" />
						<CvEducation :education="profileData.education" :currentLanguage="currentLanguage" />
					</div>

					<div class="space-y-8">
						<CvSkills :skills="profileData.skills" />
						<CvLanguages :languages="profileData.languages" :currentLanguage="currentLanguage" />
						<CvCertifications
							:certifications="profileData.certifications"
							:currentLanguage="currentLanguage" />
						<CvContact :socialLinks="profileData.socialLinks" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CvControls from '@/components/cv_sections/CvControls.vue'
import CvHeader from '@/components/cv_sections/CvHeader.vue'
import CvAbout from '@/components/cv_sections/CvAbout.vue'
import CvExperience from '@/components/cv_sections/CvExperience.vue'
import CvEducation from '@/components/cv_sections/CvEducation.vue'
import CvSkills from '@/components/cv_sections/CvSkills.vue'
import CvLanguages from '@/components/cv_sections/CvLanguages.vue'
import CvCertifications from '@/components/cv_sections/CvCertifications.vue'
import CvContact from '@/components/cv_sections/CvContact.vue'
import { useI18n } from 'vue3-i18n'
import enData from '@/lang/data/en_data.json'
import esData from '@/lang/data/es_data.json'

const i18n = useI18n();

const currentLanguage = ref(localStorage.locale ?? 'en');

const changeLanguage = async () => {
    currentLanguage.value = localStorage.locale = currentLanguage.value === 'es' ? 'en' : 'es';
    i18n.setLocale(currentLanguage.value);
}

const profileData = computed(() => {
  return currentLanguage.value === 'es' ? esData : enData
})
</script>

<style>
@media print {
    #cv {
        width: 100% !important;
    }
}
</style>