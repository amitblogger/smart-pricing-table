// Smart Pricing Table Builder - Main Script

document.addEventListener('DOMContentLoaded', function() {

    // Toggle Monthly/Yearly Buttons
    const toggleButtons = document.querySelectorAll('.sptb-toggle button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const planType = this.dataset.plan;
            const prices = document.querySelectorAll('.sptb-plan-price');
            prices.forEach(price => {
                if (planType === "monthly") {
                    price.innerHTML = price.dataset.monthly;
                } else {
                    price.innerHTML = price.dataset.yearly;
                }
            });
        });
    });

    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('sptb-dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('sptb-dark-mode');
        });
    }

    // Export to PDF
    const exportPDFBtn = document.getElementById('sptb-export-pdf');
    if (exportPDFBtn) {
        exportPDFBtn.addEventListener('click', function() {
            const table = document.querySelector('.sptb-container');
            if (!table) return;
            
            html2canvas(table).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("pricing-table.pdf");
            });
        });
    }

    // Copy HTML Button
    const copyHTMLBtn = document.getElementById('sptb-copy-html');
    if (copyHTMLBtn) {
        copyHTMLBtn.addEventListener('click', function() {
            const table = document.querySelector('.sptb-container');
            if (!table) return;
            const range = document.createRange();
            range.selectNode(table);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            try {
                document.execCommand('copy');
                alert('Pricing table HTML copied to clipboard!');
            } catch (err) {
                alert('Failed to copy HTML.');
            }
            window.getSelection().removeAllRanges();
        });
    }

});
