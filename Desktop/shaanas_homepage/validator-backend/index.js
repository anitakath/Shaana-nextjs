
const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { body, validationResult } = require("express-validator");


app.use(
  cors({
    origin: "https://admirable-queijadas-f1b25d.netlify.app/", // Die URL deines React-Projekts
  })
);

app.use(express.json());

// Validierung
const validateName = [
  body('vorname').isLength({ min: 3 }).withMessage('dein Vorname muss mindestens 3 Buchstaben haben.'),
  body('nachname').isLength({min: 3}).withMessage('dein Nachname muss mindestens 3 Buchstaben haben.'),
  body('adresse').isLength({min: 4}).withMessage('deine Adresse muss mindestens 4 Buchstaben haben'),
  body('postleitzahl').isNumeric().withMessage('deine Postleitzahl muss aus Ziffern bestehen').isLength({min: 5, max: 5}).withMessage('deine Postleitzahl muss genau 5 Ziffern haben'),
  body('telefonnummer').isNumeric().withMessage('deine Telefonnummer muss aus Ziffern bestehen').isLength({min: 6, max: 15}).withMessage('deine Telefonnummer muss mindestens 6 und maximal 15 Ziffern haben'),
  body('email').notEmpty().withMessage('deine E-Mail-Adresse darf nicht leer sein').isEmail().withMessage('Ungültige E-Mail-Adresse'),
  body('geburtstermin').notEmpty().withMessage('der Geburtstermin darf nicht fehlen').isDate().withMessage('Ungültiges Datum').custom((value) =>{
      const currentDate = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(currentDate.getDate() + 1);
      const nextYear = new Date ()
      nextYear.setDate(currentDate.getDate()+365)
      const selectedDate = new Date (value)

      if(selectedDate >= tomorrow && selectedDate <= nextYear){
          return true;
      }
      throw new Error('Datum muss frühestens dem morgigen Tag und spätestens dem morgigen Tag in einem Jahr entsprechen')
  }),
  body('versicherung').isLength({min: 3}).withMessage('deine Krankenversicherung muss mindestens 3 Buchstaben haben.'),
  body('datensicherheit').custom((value) =>{
      if(value === true){
          return true;
      }
      throw new Error('bitte lies meine Datenschutzerklärung und bestätige mit einem Klick, dass du diese akzeptierst.')
  })
];


app.get("/", (req, res) => {
  // Hier können Sie den entsprechenden Code für die Verarbeitung der Anforderung schreiben
  res.send("Server aktiv");
});

// Definiere eine API-Route für die Validierung der Formdaten
app.post("/api/validate", validateName, (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  //console.log(req);
  console.log(req.body.vorname);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    return res
      .status(200)
      .json({ message: "Objekt erfolgreich validiert und verarbeitet" });
  }
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});