# start apache from xampp and type command 
# ngrok http 80
# "C:/xampp/htdocs/tmp/"

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
import string
import random
import os

app = Flask(__name__)

CORS(app)
app.secret_key = 'any random string'

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="Pathology")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

"----------------------------------------------------------------------------------------------------"

client = Client(account_sid,auth_token)

from_whatapp_number = "whatsapp:+14155238886"

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
    
def getRandompdfpath():   
    length=10
    characters = string.ascii_uppercase + string.digits
    res = ''.join(random.choice(characters) for _ in range(length))
    if os.path.exists("C:/testfolder/"+res+".pdf"):
        getRandompdfpath()
    else:
        return "C:/testfolder/"+res+".pdf"
    
def getRandomjpgpath():   
    length=10
    characters = string.ascii_uppercase + string.digits
    res = ''.join(random.choice(characters) for _ in range(length))
    if os.path.exists("C:/testfolder/"+res+".jpg"):
        getRandomjpgpath()
    else:
        return "C:/testfolder/"+res+".jpg"

def calculate_pending(total_cost, amount_paid):
    return total_cost - amount_paid

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
    amount_details = f"Total Cost: {int(total_cost):.2f}Rs\nAmount Paid: {int(amount_paid):.2f}Rs\nPending Amount: {calculate_pending(int(total_cost), int(amount_paid)):.2f}Rs"
    amount_info = Paragraph(amount_details, address_style)
    elements.append(amount_info)

    # Build the PDF document
    doc.build(elements)
    
# Create a PDF lab report
def create_lab_report(output_file, patient_info, test_data,doctor_name):
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
    patient_table = Table(patient_table_data, colWidths=[200, 150])
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
    test_table = Table(test_table_data, colWidths=[250, 100, 100])
    test_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 15),  # Make the first row bold
    ]))
    elements.append(test_table)
    
    for row in range(1, len(test_data)):
        result_value = float(test_data[row][1])
        actual_value = float(test_data[row][2])
        if result_value > actual_value:
            test_table.setStyle(TableStyle([
                ('TEXTCOLOR', (1, row), (1, row), colors.red),
            ]))
            
    # Add doctor and lab incharge names at the bottom
    elements.append(Spacer(1, 20))
    doctor_style = getSampleStyleSheet()["Normal"]
    doctor_style.fontName = 'Helvetica-Bold'
    doctor_paragraph = Paragraph(f'Doctor: {doctor_name}', doctor_style)
    elements.append(doctor_paragraph)

    # Build the PDF document
    doc.build(elements)

"----------------------------------------------------------------------------------------------------"

@app.route('/userRegister', methods=['GET', 'POST'])
def userRegister():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        address = data.get('address')
        typeofuser = data.get('typeofuser')
        
        cursor.execute('SELECT * FROM userdetails WHERE username = %s and type=%s', (username,typeofuser))
        count = cursor.rowcount
        if count > 0:       
            return "fail"
        else:
            sql1 = "INSERT INTO userdetails(username, email, mobile, password, address, type) VALUES (%s, %s, %s, %s, %s, %s);"
            val1 = (username, email, mobile, password, address, typeofuser)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
        
        return "success"
    return "fail"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        typeofuser = data.get('typeofuser')

        cursor.execute('SELECT * FROM userdetails WHERE username=%s and password=%s and type=%s', (username, password, typeofuser))
        count = cursor.rowcount
        if count > 0:
            return "success"
        else:
            return "Fail" 
        
"----------------------------------------------------------------------------------------------------"

@app.route('/addnewTest', methods=['GET', 'POST'])
def addnewTest():
    if request.method == 'POST':
        data = request.get_json()
        
        testname = data.get('testname')
        testcost = data.get('testcost')
        testdescription = data.get('testdescription')
        testvalues = data.get('testvalues')
        actualvalues = data.get('actualvalues')
        
        cursor.execute('SELECT * FROM testinfo WHERE testname = %s', (testname))
        count = cursor.rowcount
        if count > 0:       
            return "fail"
        else:
            sql1 = "INSERT INTO testinfo(testname, cost, description, valuesoftest,actualvalues) VALUES (%s, %s, %s, %s, %s);"
            val1 = (testname, testcost, testdescription, testvalues,actualvalues)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/loadAllTests', methods=['GET', 'POST'])
def loadAllTests():
    lock.acquire()        
    cursor.execute('SELECT * FROM testinfo')
    row = cursor.fetchall() 
    lock.release()
    
    jsonObj = json.dumps(row) 
    return jsonObj

@app.route('/updateTest', methods=['GET', 'POST'])
def updateTest():
    if request.method == 'POST':
        data = request.get_json()
        
        testid = data.get('testid')
        testname = data.get('testname')
        testcost = data.get('testcost')
        testdescription = data.get('testdescription')   
        testvalues = data.get('testvalues') 
        actualvalues = data.get('actualvalues')  

        sql1 = "UPDATE testinfo SET cost = %s, description = %s, valuesoftest = %s, actualvalues = %s WHERE id = %s AND testname = %s;"
        val1 = (testcost,testdescription,testvalues,actualvalues,testid,testname)
        cursor.execute(sql1,val1)
        con.commit()
        return "success"    
    return "fail"

@app.route('/deleteTest', methods=['GET', 'POST'])
def deleteTest():
    if request.method == 'POST':
        data = request.get_json()
        
        testid = data.get('testid')
        testname = data.get('testname')    

        sql11 = 'DELETE FROM testinfo WHERE id = %s AND testname = %s;'
        val11 = (testid,testname)
        cursor.execute(sql11,val11)
        con.commit() 
        return "success"    
    return "fail"

@app.route('/regPatient', methods=['GET', 'POST'])
def regPatient():
    if request.method == 'POST':
        
        adminname = request.form["adminname"]
        typeofuser = request.form["typeofuser"]
        todaydate = request.form["todaydate"]
        labno = request.form["labno"]
        sampledate = request.form["sampledate"]
        patientname = request.form["patientname"]
        contactno = request.form["contactno"]
        age = request.form["age"]
        email = request.form["email"]
        patientaddress = request.form["patientaddress"]
        pincode = request.form["pincode"]
        totalamount = request.form["totalamount"]
        amountpaid = request.form["amountpaid"]
        balanceamount = request.form["balanceamount"]
        gender = request.form["gender"]
        contry = request.form["contry"]
        state = request.form["state"]
        city = request.form["city"]
        alltests = request.form["alltests"]
        File = request.files["File"]
        doctorname = request.form["doctorname"]
        
        test_data = []
        for i in alltests.split(','):
            cursor.execute('SELECT testname,cost FROM testinfo WHERE testname = %s', (i))
            row = cursor.fetchone()
            test_data.append(list(row))
        
        output_pdffile = getRandompdfpath()
        output_imgfile = getRandomjpgpath()
        create_pdf(output_pdffile, patientname, test_data, amountpaid)        
        File.save(output_imgfile) 
        # sendemailtouser(email,output_file)         
        # to_whatapp_number = "whatsapp:+919930090883"

        # message = client.messages.create(
        #     media_url=[ngroklink+"/tmp/pathology_bill.pdf"],
        #     from_=from_whatapp_number,
        #     to=to_whatapp_number
        #     )

        # print(message)
        
        cursor.execute('SELECT * FROM regpatient WHERE todaydate = %s AND patientname = %s', (todaydate,patientname))
        count = cursor.rowcount
        if count > 0:       
            return "fail"
        else:
            sql1 = "INSERT INTO regpatient(adminname,typeofuser,todaydate,labno,sampledate,patientname,contactno,age,email,patientaddress,pincode,totalamount,amountpaid,balanceamount,gender,contry,state,city,alltests,imgpath,drname,billpdf) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            val1 = (adminname,typeofuser,todaydate,labno,sampledate,patientname,contactno,age,email,patientaddress,pincode,totalamount,amountpaid,balanceamount,gender,contry,state,city,alltests,output_imgfile,doctorname,output_pdffile)
            cursor.execute(sql1,val1)
            con.commit()
        return "success"
    return "fail"

@app.route('/loadPatientTests', methods=['GET', 'POST'])
def loadPatientTests():
    lock.acquire()        
    cursor.execute('SELECT * FROM regpatient')
    row = cursor.fetchall() 
    lock.release()
    
    jsonObj = json.dumps(row) 
    return jsonObj

@app.route('/getValueofTest', methods=['GET', 'POST'])
def getValueofTest():
    if request.method == 'POST':
        data = request.get_json()
        
        value = data.get('valueitem')
        newlst = []
        print(value)
        for i in value.split(','): 
            lock.acquire()        
            cursor.execute('SELECT valuesoftest FROM testinfo WHERE testname=%s', (str(i)))
            row = cursor.fetchone()
            lock.release()
            row = list(row)
            newlst.append(str(i)+'&&'+row[0].split(',')[0])
            newlst.extend(row[0].split(',')[1:])
            
        print(newlst)        
        jsonObj = json.dumps(newlst) 
        return jsonObj
    
@app.route('/generateReport', methods=['GET', 'POST'])
def generateReport():
    if request.method == 'POST':
        data = request.get_json()
        
        formlist = data.get('formlist')
        anslist = data.get('anslist')  
        reportemail = data.get('reportemail')
        reportpersonname = data.get('reportpersonname')  
        reportlabno = data.get('reportlabno')
        reportgender = data.get('reportgender')  
        reportage = data.get('reportage')
        docname = data.get('docname')
        
        newformlist=[]
        original_lists=[]
        for i in formlist:
            if len(i.split('&&')) == 2:
                cursor.execute('SELECT actualvalues FROM testinfo WHERE testname=%s', (str(i.split('&&')[0])))
                vallist = list(cursor.fetchone())[0].split(',')
                original_lists.append(vallist)
                newformlist.append(i.split('&&')[1])
            else:                
                newformlist.append(i)
        combined_list = [item for sublist in original_lists for item in sublist] 
        
        if len(newformlist) == len(anslist):
            
            # Sample patient and test data
            patient_info = {
                "Patient Name": reportpersonname,
                "Lab Number": reportlabno,
                "Sex": reportgender,
                "Age": reportage,
                "Date": datetime.date.today().strftime("%Y-%m-%d"),
            }

            test_data = [
                ["Test Name", "Result", "Actual values"]
            ]
            
            for k in range(len(newformlist)):
                test_data.append([newformlist[k], anslist[k], combined_list[k]])
        
            print("------------")        
            print(test_data)  
            print("------------")  
            
            output_file = getRandompdfpath() 
            create_lab_report(output_file, patient_info, test_data,docname)
            # sendemailtouser(reportemail,output_file)       
            # to_whatapp_number = "whatsapp:+919930090883"

            # message = client.messages.create(
            #     media_url=[ngroklink+"/tmp/lab_report.pdf"],
            #     from_=from_whatapp_number,
            #     to=to_whatapp_number
            #     )

            # print(message)
        else:  
            return "fail"        
        return "success"    
    return "fail"

@app.route('/updateBill', methods=['GET', 'POST'])
def updateBill():
    if request.method == 'POST':
        data = request.get_json()
        
        patientname = data.get('patientname')
        contactnumber = data.get('contactnumber')
        amountpaid = data.get('amountpaid')
        balance = data.get('balance')
        
        c = int(amountpaid)+int(balance)

        sql1 = "UPDATE regpatient SET amountpaid = %s, balanceamount = %s WHERE patientname = %s AND contactno = %s;"
        val1 = (str(c),'0',patientname,contactnumber)
        cursor.execute(sql1,val1)
        con.commit()
        
        return "success"
    
if __name__ == "__main__":
    app.run("0.0.0.0")
    
    
