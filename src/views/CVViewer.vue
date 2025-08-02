<template>
	<div
		v-if="isVisible"
		class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print-overlay">
		<div class="bg-white rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-w-4xl w-full h-full max-h-[90vh]">
			<!-- Modal Header -->
			<div class="modal-header p-4 border-b border-gray-200 flex justify-between items-center no-print">
				<h2 class="text-xl font-bold ">{{ $t('download') }} / {{ $t('print') }}</h2>
				<button
					class=" hover:text-cyan-300 text-3xl font-bold z-10"
					aria-label="Close modal"
					@click="$emit('close-pdf')">
					&times;
				</button>
			</div>

			<!-- CV Content -->
			<div
				ref="cvContentForPdf"
				class=" overflow-y-auto  custom-scrollbar">
				<div
					class="flex-grow  p-6 md:p-8 cv-harvard-style text-black font-serif">
					<!-- HEADER -->
					<section class="cv-harvard-header mb-6 pb-2 border-b border-gray-400">
						<h1 class="text-3xl font-bold text-gray-800 uppercase text-center mb-1">{{ profileData.name }}</h1>
						<h2 class="text-xl font-semibold text-center text-gray-700 mb-2">{{ profileData.position }}</h2>
						<div class="text-sm text-gray-600 text-center flex flex-wrap justify-center gap-x-4">
							<span v-if="profileData.phone" class="flex items-center">
								{{ profileData.phone }}
							</span>
							<span v-if="profileData.email" class="flex items-center">
								{{ profileData.email }}
							</span>
							<span v-if="profileData.socialLinks.linkedin" class="flex items-center">
								<a :href="profileData.socialLinks.linkedin" target="_blank" rel="noopener noreferrer">
									<i class="fab fa-linkedin mr-1" /> LinkedIn
								</a>
							</span>
							<span v-if="profileData.socialLinks.github" class="flex items-center">
								<a :href="profileData.socialLinks.github" target="_blank" rel="noopener noreferrer">
									<i class="fab fa-github mr-1" /> GitHub
								</a>
							</span>
						</div>
					</section>

					<!-- PROFESSIONAL SUMMARY -->
					<section class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('summary') }}</h3>
						<p class="text-sm leading-relaxed">{{ profileData.summary }}</p>
					</section>

					<!-- PROFESSIONAL EXPERIENCE -->
					<section class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('experience') }}</h3>
						<div v-for="(exp, index) in profileData.experiences" :key="index" class="mb-4 last:mb-0">
							<h4 class="text-md font-bold">{{ exp.title }} | {{ exp.company }} | {{ exp.location }}</h4>
							<p class="text-sm italic">{{ exp.period }}</p>
							<ul class="list-disc pl-5 text-sm mt-1">
								<li v-for="(resp, i) in exp.responsibilities || []" :key="i">{{ resp }}</li>
							</ul>
						</div>
					</section>

					<!-- TECHNICAL SKILLS -->
					<section class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('skills') }}</h3>
						<div class="skills-grid">
							<div v-for="(category, index) in profileData.skills" :key="index" class="mb-2">
								<h4 class="text-sm font-semibold mb-1">{{ category.category }}:</h4>
								<p class="text-sm">{{ category.items.join(', ') }}</p>
							</div>
						</div>
					</section>

					<!-- EDUCATION -->
					<section class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('education') }}</h3>
						<div v-for="(edu, index) in profileData.education" :key="index" class="mb-4 last:mb-0">
							<h4 class="text-md font-bold">{{ edu.degree }}</h4>
							<p class="text-sm italic">{{ edu.institution }} | {{ edu.period }}</p>
						</div>
					</section>

					<!-- LANGUAGES -->
					<section class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('languages') }}</h3>
						<div v-if="profileData.languages?.length" class="text-sm">
							<div v-for="(lang, index) in profileData.languages" :key="index" class="mb-2 last:mb-0">
								<h4 class="text-sm font-semibold mb-1">{{ lang.name }} - <span class="font-medium">{{ lang.level }}</span></h4>
							</div>
						</div>
						<p v-else class="text-sm">
							{{ $t('no_languages_specified') }}
						</p>
					</section>

					<!-- PROFESSIONAL DEVELOPMENT & CERTIFICATIONS -->
					<section v-if="profileData.developmentAndCourses?.length" class="cv-section mb-6">
						<h3 class="cv-section-title">{{ $t('certifications') }}</h3>
						<div v-for="(item, index) in profileData.developmentAndCourses" :key="index" class="mb-4 last:mb-0">
							<h4 class="text-md font-bold">{{ item.name }}</h4>
							<p v-if="item.period" class="text-sm italic">{{ item.period }}</p>
						</div>
					</section>
				</div>
			</div>

			<!-- Footer Actions -->
			<div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 no-print">
				<button class="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow-md hover:bg-gray-400 flex items-center" @click="printCV">
					<i class="pi pi-print mr-2" />
					{{ $t('print_cv') }}
				</button>
				<button class="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 flex items-center" @click="downloadPDF">
					<i class="pi pi-download mr-2" /> {{ $t('download_pdf') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

defineProps({
  isVisible: {
    type: Boolean,
    default: () => false
  },
  profileData: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['close-pdf'])

const cvContentForPdf = ref(null)

const generatePdf = async (options = {}) => {
  const element = cvContentForPdf.value
  if (!element) return

  const baseOptions = {
    margin: 0.3,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    ...options
  }

  return html2pdf().set(baseOptions).from(element).toPdf().get('pdf').then(pdf => {
    const totalPages = pdf.internal.getNumberOfPages()
    const { pageSize } = pdf.internal
    const footerY = pageSize.getHeight() - 0.2

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(10)
      pdf.setTextColor(150)
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, footerY - 0.3, pageSize.getWidth(), 0.3, 'F')
      pdf.text(`${i} / ${totalPages}`, pageSize.getWidth() / 2, footerY, { align: 'center' })
    }

    return pdf
  })
}

const downloadPDF = async () => {
  const pdf = await generatePdf({ filename: 'jorge_solis_cv.pdf' })
  if (pdf) pdf.save()
}

const printCV = async () => {
  const pdf = await generatePdf()
  if (!pdf) return

  const blob = pdf.output('blob')
  const url = URL.createObjectURL(blob)
  const win = window.open(url)

  if (win) {
    win.addEventListener('load', () => {
      win.focus()
      win.print()
    })
  } else {
    console.warn('Could not open the window to print.')
  }
}
</script>

<style scoped>
/* General styles */
body {
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;
  color: #333;
}

.modal-header {
  background-color: var(--color-secondary);
  color: white !important;
}

/* CV styles */
.cv-harvard-style {
  max-width: 8.5in;
  margin: 0 auto;
  font-family: 'Times New Roman', Times, serif;
  padding: 1.5rem;
  color: #333;
  background: white;
}

/* Header */
.cv-harvard-header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #222;
}

.cv-harvard-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #444;
}

.cv-harvard-header div {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.3;
}

.cv-harvard-header span {
  white-space: nowrap;
}

/* Sections */
.cv-section-title {
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #777;
  color: #222;
}

.cv-section h4 {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.cv-section p,
.cv-section ul {
  font-size: 0.9rem;
  color: #444;
  text-align: justify;
}

.cv-section li {
  margin-bottom: 0.25rem;
}

/* Skills in two columns */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .skills-grid > div:not(:last-child) {
    margin-bottom: 1rem;
  }
}

/* Scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999;
}


/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  .no-print-overlay {
    background: none !important;
  }
}
</style>
