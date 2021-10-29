var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
let nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
let port = process.env.PORT || 8000;
const path = require('path');

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
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var age = req.body.age;
    var gender = req.body.gender;
    var email = req.body.email;
    var phonenum = req.body.phonenum;
    var Cough = req.body.Cough;
    var Expectoration = req.body.Expectoration;
    var Throat_Pain = req.body.Throat_Pain;
    var Swallowing = req.body.Swallowing;
    var Fever = req.body.Fever;
    var Breathlessness = req.body.Breathlessness;
    var Chest_Pain = req.body.Chest_Pain;
    var Wheeze = req.body.Wheeze;
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
        "firstname": firstname,
        "lastname": lastname,
        "age": age,
        "gender": gender,
        "email": email,
        "phonenum": phonenum,
        "Cough": Cough,
        "Expectoration": Expectoration,
        "Throat_Pain": Throat_Pain,
        "Swallowing": Swallowing,
        "Fever": Fever,
        "Breathlessness": Breathlessness,
        "Chest_Pain": Chest_Pain,
        "Wheeze": Wheeze,
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
    doc.pipe(fs.createWriteStream('form.pdf'));
    doc.image('./public/1.jpeg', 250, 0, {
        fit: [100, 80],
        align: 'center',
        valign: 'center'
    })

    doc.fontSize(15);

    doc.font('Times-Bold')
        .text('Patient Detail Form!')


    doc.fontSize(13);
    // Using a standard PDF font
    doc.font('Times-Bold')
        .text('Basic details')

    doc.fontSize(12);
    doc.font('Times-Roman')
      doc.text(`Reason for visitation - Respiratory Disease`, {
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
    doc.text(`Cough  - ${Cough}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Expectoration - ${Expectoration}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Throat Pain  - ${Throat_Pain}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Swallowing - ${Swallowing}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Fever- ${Fever}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Chest Pain - ${Chest_Pain}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Wheeze - ${Wheeze}`, {
        width: 410,
        align: 'left'
    });
    doc.text(`Breathlessness - ${Breathlessness}`, {
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
    doc.text(`Tobacco consumption - ${Tobacco}`, {
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

    global.__basedir = __dirname;
    var base_path = __basedir
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
        // path: 'C:/Users/vaish/OneDrive/Pictures/Documents/GitHub/diagnosec-form/form.pdf',
        // path.join(__dirname, '/form.pdf'),
        contentType: 'application/pdf'
    }]
    };
    
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent successfully: ' + info.response);
    }
})

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
    console.log("Listening on ${PORT}");
});


