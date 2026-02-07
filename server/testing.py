from flask import Flask,request 
import pymysql
from flask_cors import CORS
import threading
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Spacer
from werkzeug.utils import secure_filename
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
lock = threading.Lock()
import datetime
from twilio.rest import Client

def sendemailtouser(usermail, pdf_file_path):
    fromaddr = "pranalibscproject@gmail.com"
    toaddr = usermail
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "Pathology app"
    with open(pdf_file_path, 'rb') as pdf_file:
        pdf_attachment = MIMEApplication(pdf_file.read(), _subtype='pdf')
        pdf_attachment.add_header('content-disposition', 'attachment', filename=secure_filename(pdf_file_path))
        msg.attach(pdf_attachment)
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(fromaddr, "wkwfgosewcljcpqh")
    text = msg.as_string()
    s.sendmail(fromaddr, toaddr, text)
    s.quit()

output_file = "C:/xampp/htdocs/tmp/lab_report.pdf"
sendemailtouser('yashsalvi1999@gmail.com',output_file) 



# input_list = [
#     'HEPATITIS C VIRUS ANTIBODIES&&HCV Antibody',
#     'Result',
#     'CMV IgG (CytoMegalo Virus)&&C - Reactive Protein',
#     'TITRE',
#     'ANTI - NUCLEAR ANTIBODY&&RESULT',
#     'URINE ALBUMIN&&Volume',
#     'Result'
# ]

# result_dict = {}
# current_key = None
# current_values = []

# for item in input_list:
#     key, value = item.split("&&", 1) if "&&" in item else (item, None)
#     if current_key is None:
#         current_key = key
#     elif key != current_key:
#         result_dict[current_key] = current_values
#         current_key = key
#         current_values = []

#     if value is not None:
#         current_values.append(value)
#     else:
#         result_dict[list(result_dict) [-1]].append(current_key)

# # Add the last set of values to the dictionary
# if current_key is not None:
#     result_dict[current_key] = current_values

# # Remove keys with empty lists
# result_dict = {k: v for k, v in result_dict.items() if v}

# print(result_dict)
