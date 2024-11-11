import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
    nom: string;
    prenom: string;
    raison: string;
    message: string;
    honeypot: string; // Nouveau champ honeypot
}

const ContactSection: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        // Vérification du honeypot
        if (data.honeypot) {
            console.log("Spam détecté");
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-kaki text-white pt-20 pb-10" id="contact">
            <div className="container mx-auto py-10 px-10">
                <h2 className="pb-10 text-2xl font-bold text-center mb-8">Contact</h2>
                <div className="grid md:grid-cols-2 gap-8">
                <div>
                         <div className="flex items-center mb-4">
                             <MapPin className="mr-2" />
                             <a href='https://maps.app.goo.gl/bWKmcdLwhXATSG2F7'>556 rue Arthur Brunet, 1er étage<br />59220 Denain</a>
                         </div>
                         <div className="flex items-center mb-4">
                             <Facebook className="mr-2" />
                             <a href=''>Perrine Dupriez<br />Sophrologie</a>
                         </div>
                         <div className="flex items-center mb-4">
                             <Mail className="mr-2" />
                             <a href='mailto:perrine.dupriez.pro@gmail.com'> perrine.dupriez.pro@gmail.com</a>
                         </div>
                         <div className="flex items-center mb-4">
                             <Phone className="mr-2" />
                             <p>06 98 81 18 58</p>
                         </div>
                         <div className="mt-6">
                             <iframe
                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.9783707862554!2d3.3945441!3d50.3258058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2eaf2d80541c9%3A0x1aef8afb3e7c5d4c!2s556%20Rue%20Arthur%20Brunet%2C%2059220%20Denain%2C%20France!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus"
                                 width="90%"
                                 height="220"
                                 style={{ border: 0 }}
                                 loading="lazy"
                             ></iframe>
                         </div>
                     </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Besoin de plus d'informations ?</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="nom" className="block mb-1">Nom :</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        {...register('nom', { required: "Le nom est requis" })}
                                        className="w-full p-2 text-black"
                                    />
                                    {errors.nom && <span className="text-red-500">{errors.nom.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="prenom" className="block mb-1">Prénom :</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        {...register('prenom', { required: "Le prénom est requis" })}
                                        className="w-full p-2 text-black"
                                    />
                                    {errors.prenom && <span className="text-red-500">{errors.prenom.message}</span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="raison" className="block mb-1">Raison :</label>
                                <input
                                    type="text"
                                    id="raison"
                                    {...register('raison', { required: "La raison est requise" })}
                                    className="w-full p-2 text-black"
                                />
                                {errors.raison && <span className="text-red-500">{errors.raison.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-1">Message :</label>
                                <textarea
                                    id="message"
                                    {...register('message', { required: "Le message est requis" })}
                                    className="w-full p-2 h-32 text-black"
                                ></textarea>
                                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                            </div>
                            {/* Champ honeypot */}
                            <input
                                type="text"
                                {...register('honeypot')}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="my-5 w-64 h-10 bg-gradient-to-bl from-orange1 to-orange2 font-medium text-white flex items-center justify-center gap-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-500">Votre message a été envoyé avec succès !</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500">Une erreur s'est produite. Veuillez réessayer.</p>
                            )}
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8 pt-10 text-sm flex justify-center">
                    <a href="#" className="mr-4 hover:underline">Mentions légales</a>
                    <a href="#" className="mr-4 hover:underline">Politique de confidentialité</a>
                    <p>© 2024 Perrine Dupriez. Tous droits réservés</p>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;



// import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
// import React, { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';

// interface FormInputs {
//     nom: string;
//     prenom: string;
//     raison: string;
//     message: string;
// }

// const ContactSection: React.FC = () => {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

//     const onSubmit: SubmitHandler<FormInputs> = async (data) => {
//         setIsSubmitting(true);
//         setSubmitStatus(null);
//         try {
//             const response = await fetch('/api/email', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 setSubmitStatus('success');
//                 reset();
//             } else {
//                 setSubmitStatus('error');
//             }
//         } catch (error) {
//             console.error('Erreur lors de l\'envoi du formulaire:', error);
//             setSubmitStatus('error');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="bg-kaki text-white pt-10 pb-5" id="contact">
//             <div className="container mx-auto px-4">
//                 <h2 className="pb-10 text-2xl font-bold text-center mb-8">Contact</h2>
//                 <div className="grid md:grid-cols-2 gap-8">
//                     <div>
//                         <div className="flex items-center mb-4">
//                             <MapPin className="mr-2" />
//                             <a href='https://maps.app.goo.gl/bWKmcdLwhXATSG2F7'>556 rue Arthur Brunet, 1er étage<br />59220 Denain</a>
//                         </div>
//                         <div className="flex items-center mb-4">
//                             <Facebook className="mr-2" />
//                             <a href=''>Perrine Dupriez<br />Sophrologie</a>
//                         </div>
//                         <div className="flex items-center mb-4">
//                             <Mail className="mr-2" />
//                             <a href='mailto:perrine.dupriez.pro@gmail.com'> perrine.dupriez.pro@gmail.com</a>
//                         </div>
//                         <div className="flex items-center mb-4">
//                             <Phone className="mr-2" />
//                             <p>06 98 81 18 58</p>
//                         </div>
//                         <div className="mt-6">
//                             <iframe
//                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.9783707862554!2d3.3945441!3d50.3258058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2eaf2d80541c9%3A0x1aef8afb3e7c5d4c!2s556%20Rue%20Arthur%20Brunet%2C%2059220%20Denain%2C%20France!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus"
//                                 width="100%"
//                                 height="250"
//                                 style={{ border: 0 }}
//                                 loading="lazy"
//                             ></iframe>
//                         </div>
//                     </div>
//                     <div>
//                         <h3 className="text-xl font-semibold mb-4">Besoin de plus d'informations ?</h3>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="grid grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <label htmlFor="nom" className="block mb-1">Nom :</label>
//                                     <input
//                                         type="text"
//                                         id="nom"
//                                         {...register('nom', { required: "Le nom est requis" })}
//                                         className="w-full p-2 text-black"
//                                     />
//                                     {errors.nom && <span className="text-red-500">{errors.nom.message}</span>}
//                                 </div>
//                                 <div>
//                                     <label htmlFor="prenom" className="block mb-1">Prénom :</label>
//                                     <input
//                                         type="text"
//                                         id="prenom"
//                                         {...register('prenom', { required: "Le prénom est requis" })}
//                                         className="w-full p-2 text-black"
//                                     />
//                                     {errors.prenom && <span className="text-red-500">{errors.prenom.message}</span>}
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="raison" className="block mb-1">Raison :</label>
//                                 <input
//                                     type="text"
//                                     id="raison"
//                                     {...register('raison', { required: "La raison est requise" })}
//                                     className="w-full p-2 text-black"
//                                 />
                                
//                                 {errors.raison && <span className="text-red-500">{errors.raison.message}</span>}
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="message" className="block mb-1">Message :</label>
//                                 <textarea
//                                     id="message"
//                                     {...register('message', { required: "Le message est requis" })}
//                                     className="w-full p-2 h-32 text-black"
//                                 ></textarea>
//                                 {errors.message && <span className="text-red-500">{errors.message.message}</span>}
//                             </div>
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="my-5 w-64 h-10 bg-gradient-to-bl from-orange1 to-orange2 font-medium text-white flex items-center justify-center gap-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
//                             >
//                                 {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
//                             </button>
//                             {submitStatus === 'success' && (
//                                 <p className="text-green-500">Votre message a été envoyé avec succès !</p>
//                             )}
//                             {submitStatus === 'error' && (
//                                 <p className="text-red-500">Une erreur s'est produite. Veuillez réessayer.</p>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//                 <div className="text-center mt-8 pt-10 text-sm flex justify-center">
//                     <a href="#" className="mr-4 hover:underline">Mentions légales</a>
//                     <a href="#" className="mr-4 hover:underline">Politique de confidentialité</a>
//                     <p>© 2024 Perrine Dupriez. Tous droits réservés</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactSection;