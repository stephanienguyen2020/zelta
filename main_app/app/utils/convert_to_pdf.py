from fastapi import UploadFile
from io import BytesIO
from reportlab.pdfgen import canvas

def convert_text_to_pdf(content: str, filename: str) -> UploadFile:
    """
    Converts plain text content to a PDF and returns it as an UploadFile instance.

    Parameters:
        content (str): The text content to convert to PDF.
        filename (str): The original filename.

    Returns:
        UploadFile: A file-like object representing the PDF.
    """
    # Create an in-memory buffer for the PDF
    buffer = BytesIO()

    # Generate the PDF using ReportLab
    can = canvas.Canvas(buffer)
    can.setFont("Helvetica", 12)

    y_position = 800  # Start writing near the top of the page
    for line in content.splitlines():
        if y_position < 50:  # If space runs out, start a new page
            can.showPage()
            y_position = 800
        can.drawString(50, y_position, line)
        y_position -= 15

    can.save()

    # Reset the buffer's position to the beginning
    buffer.seek(0)

    # Create an UploadFile instance with the generated PDF
    pdf_file = UploadFile(
        filename=f"{filename.rsplit('.', 1)[0]}.pdf",
        file=buffer
    )
    return pdf_file