from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Spacer

# Function to calculate pending amount
def calculate_pending(total_cost, amount_paid):
    return total_cost - amount_paid

# Create a PDF bill
def create_pdf(output_file, patient_name, test_data, amount_paid):
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
    title_margin_top = Spacer(1, 10)  # Adjust the height (20 points in this example)
    elements.append(title_margin_top)

    # Modify the style for "Patient Name"
    patient_name_style = getSampleStyleSheet()["Normal"]
    patient_name_style.fontName = 'Helvetica-Bold'  # Change the font to bold
    patient_name_style.fontSize = 17  # Change the font size
    patient_name_style.alignment = 1  # 0=left, 1=center, 2=right alignment
    patient_info = Paragraph(f"Patient Name: {patient_name}", patient_name_style)
    elements.append(patient_info)

    # Create a Spacer with a specific height for margin-top
    title_margin_top = Spacer(1, 20)  # Adjust the height (20 points in this example)
    elements.append(title_margin_top)

    # Create a table for test details
    data = [['Test Name', 'Test Cost']]
    total_cost = 0

    # Calculate column widths based on the content
    col_widths = [max(len(test[0]) * 8, 100) for test in test_data]  # Adjust the multiplier as needed

    for test in test_data:
        test_name = test[0]
        test_cost = float(test[1])
        data.append([test_name, f"{test_cost:.2f}Rs"])
        total_cost += test_cost

    table = Table(data, colWidths=col_widths)
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                               ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                               ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                               ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                               ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                               ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                               ('GRID', (0, 0), (-1, -1), 1, colors.black)]))

    # Adjust the overall width of the table to use the full page width with a margin
    table._argW[0] = 400  # Adjust the width as needed
    elements.append(table)
    
    # Create a Spacer with a specific height for margin-top
    title_margin_top = Spacer(1, 20)  # Adjust the height (20 points in this example)
    elements.append(title_margin_top)

    # Amount Details
    amount_details = f"Total Cost: {total_cost:.2f}Rs\nAmount Paid: {amount_paid:.2f}Rs\nPending Amount: {calculate_pending(total_cost, amount_paid):.2f}Rs"
    amount_info = Paragraph(amount_details, address_style)
    elements.append(amount_info)

    # Build the PDF document
    doc.build(elements)

if __name__ == "__main__":
    output_file = "pathology_bill.pdf"
    patient_name = "John Doe"
    test_data = [['Complete Blood Count (CBC)','50'],['Lipid Profile','75']]
    amount_paid = 150  # Replace with the actual amount paid by the patient

    create_pdf(output_file, patient_name, test_data, amount_paid)
