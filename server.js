var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
let nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const port = process.env.PORT || 8000;
const {
    ClientRequest
} = require("http");
const {
    font
} = require("pdfkit");
fs = require('fs');

// var router = require("./routes")
const app = express()
app.use(express.json())
// app.use(router)
// app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb+srv://vaish:Tanu@cluster0.o8kky.mongodb.net/diag', {
    useNewUrlParser: true,
    useUnifiedTopoLogy: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("connected to Database"))


app.post("/form", (req, res) => {
    var heart = req.body.Reason_Visitation;
    var Respiratory = req.body.Reason_Visitation;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var age = req.body.age;
    var gender = req.body.gender;
    var email = req.body.email;
    var phonenum = req.body.phonenum;
    var Chest_pain = req.body.Chest_pain;
    var Palpitation = req.body.Palpitation;
    var Sudden_Sweating = req.body.Sudden_Sweating;
    var Upper_Back_Pain = req.body.Upper_Back_Pain;
    var Jaw_Neck_pain = req.body.Jaw_Neck_pain;
    var Breathlessness = req.body.Breathlessness;
    var Life_fear = req.body.Life_fear;
    var rating_on_the_Scale_of_10 = req.body.rating_on_the_Scale_of_10;
    var condition = req.body.condition;
    var since = req.body.since;
    var HBP = req.body.HBP;
    var Diabetes = req.body.Diabetes;
    var Cholestrol = req.body.Cholestrol;
    var allergy = req.body.allergy;
    var surgery = req.body.surgery;
    var smoking = req.body.smoking;
    var alcohol = req.body.alcohol;
    var Tobacco = req.body.Tobacco;
    var suggestion = req.body.suggestion;





    var data = {
        "Reason_Visitation": heart,
        "Reason_Visitation": Respiratory,
        "firstname": firstname,
        "lastname": lastname,
        "age": age,
        "gender": gender,
        "email": email,
        "phonenum": phonenum,
        "Chest_pain": Chest_pain,
        "Palpitation": Palpitation,
        "Sudden_Sweating": Sudden_Sweating,
        "Upper_Back_Pain": Upper_Back_Pain,
        "Jaw_Neck_pain": Jaw_Neck_pain,
        "Breathlessness": Breathlessness,
        "Life_fear": Life_fear,
        "rating_on_the_Scale_of_10": rating_on_the_Scale_of_10,
        "condition": condition,
        "since": since,
        "HBP": HBP,
        "Diabetes": Diabetes,
        "Cholestrol": Cholestrol,
        "allergy": allergy,
        "surgery": surgery,
        "smoking": smoking,
        "alcohol": alcohol,
        "Tobacco": Tobacco,
        "suggestion": suggestion
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("record inserted Successfully");
    });





    const doc = new PDFDocument({
        font: 'Courier',
    });
    doc.pipe(fs.createWriteStream('form.pdf')); // write to PDF
    doc.image('./public/1.jpeg', 250, 0, {
        fit: [100, 80],
        align: 'center',
        valign: 'center'
    })
    // doc.image('./public/1.jpeg', 200, 0, {
    //         fit: [100, 100]
    //     })
    //     // .rect(250, 10, 100, 100)

      doc.moveDown();

    doc.fontSize(15);
    // Using a standard PDF font
    doc.font('Times-Bold')
        .text('Patient Detail Form!')
    // .moveDown(0.5);

    doc.fontSize(13);
    // Using a standard PDF font
    doc.font('Times-Bold')
        .text('Basic details')


    doc.fontSize(12);
    doc.font('Times-Roman')
      doc.text(`Reason for visitation - Heart Disease`, {
          width: 410,
          align: 'left',
      });
    doc.text(`Firstname - ${firstname}`, {
        width: 410,
        align: 'left',
    });

    doc.text(`Lastname - ${lastname}`, {
        width: 410,
        align: 'left'
    });

    doc.text(`Age - ${age}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Gender - ${gender}`, {
        width: 410,
        align: 'left'
    });

    doc.text(`Email id- ${email}`, {
        width: 410,
        align: 'left'
    });

    doc.text(`Contact detail - ${phonenum}`, {
        width: 410,
        align: 'left'
    });

    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Symptoms patient is facing')
    // .moveDown(0.5);

    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Chest-pain  - ${Chest_pain}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Palpitaion - ${Palpitation}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Sudden sweaing  - ${Sudden_Sweating}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Upper back pain - ${Upper_Back_Pain}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Jaw neck pain- ${Jaw_Neck_pain}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Breathlessness - ${Breathlessness}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Sudden fear of life - ${Life_fear}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Rating')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Rating on the scale of 10 - ${rating_on_the_Scale_of_10}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('How is the condition')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Condition - ${condition}`, {
        width: 410,
        align: 'left'
    });


    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Suffering since when')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`since - ${since}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Medical History')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`High blood pressure - ${HBP}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Diabetes - ${Diabetes}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Cholestrol - ${Cholestrol}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Allergy')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Any food/drugs allergy - ${allergy}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Surgerical History')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Had any surgery in past - ${surgery}`, {
        width: 410,
        align: 'left'
    });
    doc.fontSize(13);
    // // Using a standard PDF font
    doc.moveDown();
    doc.font('Times-Bold')
        .text('Social History')
    // .moveDown(0.5);
    doc.fontSize(11);
    doc.font('Times-Roman')
    doc.text(`Smoke consumption- ${smoking}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Alcohol consumptiom - ${alcohol}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Tobacco/Gutka consumption - ${Tobacco}`, {
        width: 410,
        align: 'left'
    });
   
    doc.fontSize(12);
    // // Using a standard PDF font
    doc.font('Times-Roman')
    doc.text(`Contact details: 9372182521 
    Email: Info@diagnosec.com
    Website: https://diagnosec.com`, {
        //  width: 310,
        align: 'right'
    });
    doc.pipe(fs.createWriteStream('form.pdf'))
    doc.end();

    return res.redirect('../end.html')
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/public"));
}

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('front_page.html');
}).listen(port, () => {
    console.log("Listening on PORT 8000");
});


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Diagnosecnotify@gmail.com',
        pass: 'Diagnoemailsend'
    }
});

var mailOptions = {
    from: 'Diagnosecnotify@gmail.com',
    to: 'vaishnavigupta292@gmail.com',
    subject: 'Patient Detail',
    text: `Patient form detail
        
          DiagnoSec AI
          Contact details : 9372182521
          Email: diagnosecai02@gmail.com
          Website: https://diagnosec.com`,
    attachments: [{
        filename: 'form.pdf',
         path: 'C:/Users/vaish/OneDrive/Pictures/Documents/GitHub/diagnosec-form/form.pdf',
        contentType: 'application/pdf'
    }]
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
})
