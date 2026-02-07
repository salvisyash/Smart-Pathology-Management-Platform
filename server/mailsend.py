# -*- coding: utf-8 -*-
"""
Created on Tue Sep  5 16:27:26 2023

@author: yashs
"""

from werkzeug.utils import secure_filename
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

def sendemailtouser(usermail, pdf_file_path):
    fromaddr = "pranalibscproject@gmail.com"
    toaddr = usermail

    # Create an instance of MIMEMultipart
    msg = MIMEMultipart()

    # Set the sender's email address
    msg['From'] = fromaddr

    # Set the receiver's email address
    msg['To'] = toaddr

    # Set the subject of the email
    msg['Subject'] = "Pathology app"

    # Attach the PDF file
    with open(pdf_file_path, 'rb') as pdf_file:
        pdf_attachment = MIMEApplication(pdf_file.read(), _subtype='pdf')
        pdf_attachment.add_header('content-disposition', 'attachment', filename=secure_filename(pdf_file_path))
        msg.attach(pdf_attachment)

    # Create an SMTP session
    s = smtplib.SMTP('smtp.gmail.com', 587)

    # Start TLS for security
    s.starttls()

    # Authentication
    s.login(fromaddr, "wkwfgosewcljcpqh")

    # Convert the Multipart msg into a string
    text = msg.as_string()

    # Sending the mail
    s.sendmail(fromaddr, toaddr, text)

    # Terminating the session
    s.quit()

# Usage example:
# Replace 'your_pdf_file.pdf' with the actual path to the PDF file you want to send.
sendemailtouser('yashsalvi1999@gmail.com', 'pathology_bill.pdf')
