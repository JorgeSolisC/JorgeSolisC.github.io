<template>
	<div
		v-if="isVisible"
		class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print-overlay">
		<div class="bg-white rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-w-4xl w-full h-full max-h-[90vh]">
			<!-- Header -->
			<div class="modal-header p-4 pb-2 border-b border-gray-200 flex justify-between items-center no-print">
				<h2 class="text-xl font-bold text-gray-800">{{ $t('download') }} / {{ $t('print') }}</h2>
				<button
					class="text-gray-500 hover:text-gray-700 text-3xl font-bold z-10"
					aria-label="Cerrar modal"
					@click="$emit('close-pdf')">
					&times;
				</button>
			</div>

			<!-- CV Content -->
			<div
				ref="cvContentForPdf"
				class="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar cv-harvard-style text-black font-serif">
				<!-- HEADER -->
				<section class="cv-harvard-header mb-6 pb-2 border-b border-gray-400">
					<h1 class="text-3xl font-bold text-gray-800 uppercase text-center mb-1">{{ profileData.name }}</h1>
					<h2 class="text-xl font-semibold text-center text-gray-700 mb-2">{{ profileData.position }}</h2>
					<div class="text-sm text-gray-600 text-center flex flex-wrap justify-center gap-x-4">
						<span v-if="profileData.socialLinks.linkedin" class="flex items-center">
							<i class="fab fa-linkedin mr-1" /> {{ profileData.socialLinks.linkedin }}
						</span>
						<span v-if="profileData.socialLinks.github" class="flex items-center">
							<i class="fab fa-github mr-1" /> {{ profileData.socialLinks.github }}
						</span>
					</div>
				</section>

				<!-- SUMMARY -->
				<section class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('summary') }}</h3>
					<p class="text-sm leading-relaxed">{{ profileData.aboutText }}</p>
				</section>

				<!-- EDUCATION -->
				<section class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('education') }}</h3>
					<div v-for="(edu, index) in profileData.education" :key="index" class="mb-4 last:mb-0">
						<h4 class="text-md font-bold">{{ edu.degree }}</h4>
						<p class="text-sm italic">{{ edu.institution }} | {{ edu.period }}</p>
						<p v-if="edu.description" class="text-sm mt-1">{{ edu.description }}</p>
					</div>
				</section>

				<!-- EXPERIENCE -->
				<section class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('experience') }}</h3>
					<div v-for="(exp, index) in profileData.experiences" :key="index" class="mb-4 last:mb-0">
						<h4 class="text-md font-bold">{{ exp.title }}</h4>
						<p class="text-sm italic">{{ exp.company }} - {{ exp.location }} | {{ exp.period }}</p>
						<ul class="list-disc pl-5 text-sm mt-1">
							<li v-for="(resp, i) in exp.responsibilities || []" :key="i">{{ resp }}</li>
						</ul>
						<p v-if="exp.description" class="text-sm mt-1">{{ exp.description }}</p>
					</div>
				</section>

				<!-- SKILLS -->
				<section class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('skills') }}</h3>
					<div v-for="(category, index) in profileData.skills" :key="index" class="mb-2 last:mb-0">
						<h4 class="text-sm font-semibold mb-1">{{ category.category }}:</h4>
						<p class="text-sm">{{ category.items.join(', ') }}</p>
					</div>
				</section>

				<!-- LANGUAGES -->
				<section class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('languages') }}</h3>
					<div v-if="profileData.languages?.length" class="text-sm">
						<div v-for="(lang, index) in profileData.languages" :key="index" class="mb-2 last:mb-0">
							<h4 class="text-sm font-semibold mb-1">{{ lang.name }} -  <span class="font-medium">{{ lang.level }}</span></h4>
						</div>
					</div>
					<p v-else class="text-sm">
						{{ $t('no_languages_specified') }}
					</p>
				</section>

				<!-- CERTIFICATIONS -->
				<section v-if="profileData.certifications?.length" class="cv-section mb-6">
					<h3 class="cv-section-title">{{ $t('certifications') }}</h3>
					<div v-for="(cert, index) in profileData.certifications" :key="index" class="mb-4 last:mb-0">
						<h4 class="text-md font-bold">{{ cert.name }}</h4>
						<p class="text-sm italic">{{ cert.issuer }} | {{ cert.date }}</p>
						<p v-if="cert.description" class="text-sm mt-1">{{ cert.description }}</p>
					</div>
				</section>
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
    console.warn("No se pudo abrir la ventana para imprimir.")
  }
}
</script>

<style scoped>
body {
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;
  color: #333;
}

.modal-header {
  background-color: #f8f8f8;
}

.cv-harvard-style {
  max-width: 8.5in;
  margin: 0 auto;
  font-family: 'Times New Roman', Times, serif;
  padding: 1.5rem;
  color: #333;
  background: white;
}

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
}

.cv-section li {
  margin-bottom: 0.25rem;
}

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

@media print {
  .no-print {
    display: none !important;
  }
  .no-print-overlay {
    background: none !important;
  }
}
</style>