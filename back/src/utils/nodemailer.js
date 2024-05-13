import nodemailer from 'nodemailer'
import {email_of_apk,google_key_apk,urlBackend} from '../config.js'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email_of_apk,
      pass: google_key_apk,
    },
  });


  export const sendEmail = async (userEmail,html,subject) =>{

    await transporter.sendMail({
        from:email_of_apk,
        to:userEmail,
        subject:subject,
        text:"Recupera la comtraseña de Ipunto",
        html:html
    })
  }


 export const emailTemplate = (email,token,userId,userName)=>{
    
    const url = urlBackend

    return  `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            form {
                display: flex;
                flex-direction: column;
                padding: 20px;
                border-radius: 5px;
                max-width: 700px;
                width: 100%;
                margin: 0 auto;
                box-shadow: 0 0 10px #00000085;
            }
            label {
                font-size: 16px;
                color: #333;
                padding-bottom: 30px;
            }
           .btn__info{
                margin-top:30px;
                padding: 10px;
                font-size: 15px;
                text-decoration: none;
                border-radius: 5px;
                text-align: center;
                margin: auto;
                font-weight: 600;
                border: 2px solid green;
            }
            .btn__info:hover{
                background-color:rgba(0, 175, 0, 0);
                color: green;
            }
            .info__saludo{
                text-align: center;
                font-size: 20px;
                font-weight: 600;
            }
            strong{
              color:green;
            }
            
        </style>
    </head>
    <body>
        <form>
        
            <div class="email_info">
                <label class="info__saludo">!Hola¡ <strong>${userName}</strong>:${email}</label>
                <br>
                <br>
                <a class="btn__info" href="${url}/recover/password/${token}/${userId}" target="_blank">Recuperar contraseña</a>
            </div>
        </form>
    </body>
    </html>
    `
  }