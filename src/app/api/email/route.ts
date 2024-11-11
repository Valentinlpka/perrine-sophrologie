import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nom, prenom, raison, message, honeypot } = await req.json();

    // Vérification du honeypot
    if (honeypot) {
      console.log("Spam détecté");
      return NextResponse.json({ error: "Spam détecté" }, { status: 400 });
    }

    // Validation des champs requis
    if (!nom || !prenom || !raison || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Nettoyage et validation des entrées
    const cleanNom = nom.trim().slice(0, 100);
    const cleanPrenom = prenom.trim().slice(0, 100);
    const cleanRaison = raison.trim().slice(0, 200);
    const cleanMessage = message.trim().slice(0, 1000);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `Message de ${cleanPrenom} ${cleanNom} - ${cleanRaison} - Site web`,
      text: `
        Nom: ${cleanNom}
        Prénom: ${cleanPrenom}
        Raison: ${cleanRaison}
        Message: ${cleanMessage}
      `,
    };

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Error sending email:", err);
            reject(err.message);
          } else {
            console.log("Email sent:", info.response);
            resolve("Email sent");
          }
        });
      });

    await sendMailPromise();
    return NextResponse.json({ message: "Email envoyé avec succès" });
  } catch (err) {
    console.error("Error in API route:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Une erreur inconnue s'est produite",
      },
      { status: 500 }
    );
  }
}
