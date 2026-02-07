from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import datetime

# Sample patient and test data
patient_info = {
    "Patient Name": "John Doe",
    "Lab Number": "12345",
    "Sex": "Male",
    "Age": "35",
    "Date": datetime.date.today().strftime("%Y-%m-%d"),
}

test_data = [
    ["Test Name", "Result"],
    ["Urinary volume", "Normal"],
    ["Urinary Protein", "High"],
    ["HCV Antibody", "Negative"],
    ["Dengue - IgG", "Positive"],
    ["Sodium", "135 mmol/L"],
    ["Potassium", "4.5 mmol/L"],
]

# Create a PDF lab report
def create_lab_report(output_file, patient_info, test_data):
    doc = SimpleDocTemplate(output_file, pagesize=letter)
    elements = []

    # Modify the style for "Pathology Bill" (the title)
    title_style = getSampleStyleSheet()["Title"]
    title_style.fontName = 'Helvetica-Bold'  # Change the font to bold
    title_style.fontSize = 30  # Change the font size
    title_style.alignment = 1  # 0=left, 1=center, 2=right alignment
    title = Paragraph("DMCE Pathology", title_style)
    elements.append(title)

    # Create a Spacer with a specific height for margin-top
    title_margin_top = Spacer(1, 20)  # Adjust the height (20 points in this example)
    elements.append(title_margin_top)

    # Add the pathology address with proper alignment
    address_style = getSampleStyleSheet()["Normal"]
    address_style.fontName = 'Helvetica'
    address_style.fontSize = 12
    address_style.alignment = 1  # Center alignment
    address_paragraph = Paragraph('Plot No. 98, Sector-3, Airoli, Opp Khandoba Temple Sri Sadguru Vanamrao Pai Marg, Navi Mumbai, Maharashtra 400708', address_style)
    elements.append(address_paragraph)

    # Create a Spacer with a specific height for margin-top
    title_margin_top = Spacer(1, 20)  # Adjust the height (20 points in this example)
    elements.append(title_margin_top)

    # Patient Information
    patient_style = ParagraphStyle(name='BoldCentered', parent=getSampleStyleSheet()["Normal"])
    patient_style.fontName = 'Helvetica-Bold'
    patient_style.alignment = 1  # Center alignment

    patient_table_data = [
        [Paragraph(k, patient_style), v] for k, v in patient_info.items()
    ]
    patient_table = Table(patient_table_data, colWidths=[250, 100])
    patient_table.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'LEFT')]))
    elements.append(patient_table)
    elements.append(Spacer(1, 20))

    # Test Title (Background)
    test_title_data = [["Test Title"]]  # Add your table title here
    test_title_table = Table(test_title_data, colWidths=[500])
    test_title_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.grey),  # Background color
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),  # Text color
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Center alignment
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 15),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),  # Bottom padding
    ]))
    elements.append(test_title_table)

    # Test Results
    test_style = getSampleStyleSheet()["Normal"]
    test_style.fontName = 'Helvetica-Bold'
    test_table_data = test_data
    test_table = Table(test_table_data, colWidths=[250, 100])
    test_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 15),  # Make the first row bold
    ]))
    elements.append(test_table)

    # Build the PDF document
    doc.build(elements)

if __name__ == "__main__":
    output_file = "lab_report.pdf"
    create_lab_report(output_file, patient_info, test_data)
