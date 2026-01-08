import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";

export const ContactSection = () => {
    console.log("ContactSection mounted");

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null);

    const WHATSAPP_NUMBER = "6285694868473";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            setStatus({ type: "error", text: "Please fill all fields." });
            return;
        }
        
        //Buat pesan ke WA
        const message = `Nama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`;
        const encoded = encodeURIComponent(message);
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

         // buka WhatsApp (web/app) di tab baru
        window.open(waUrl, "_blank");

        setStatus({ type: "success", text: "Message sent. Thank you!" });
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 4000);
    };

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto ">
                    Have a project in mind or want to collaborate? Feel free to reach out.
                    I'm always open to discussing new opportunities.
                </p>

                {/* grid: gunakan 5 kolom di md agar kolom form sedikit lebih lebar (sekitar 40%) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    {/* tambahkan text-left agar semua konten kiri rata kiri dan font bold pada judul */}
                    <div className="space-y-8 md:col-span-3 text-left">
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <a
                                        href="mailto:deyoirfandiantoro@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        deyoirfadiantoro@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <a
                                        href="tel:+6285694868473"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        085694868473
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Location</h4>
                                    <span className="text-muted-foreground">
                                        Tangerang, Curug, Sukabakti
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-bold mb-4 text-left">Connect With Me</h4>
                            <div className="flex space-x-4 items-center">
                                <a
                                    href="https://www.linkedin.com/in/deyo-irfandiantoro-7831aa374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="p-2 rounded-md bg-white/5 hover:bg-primary/10 transition-colors"
                                >
                                    <Linkedin className="h-5 w-5 text-primary" />
                                </a>

                                <a
                                    href="https://www.instagram.com/deyoirfandiantoroo?igsh=c2JpcHh1ZHJraDFm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="p-2 rounded-md bg-white/5 hover:bg-primary/10 transition-colors"
                                >
                                    <Instagram className="h-5 w-5 text-primary" />
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="p-2 rounded-md bg-white/5 hover:bg-primary/10 transition-colors"
                                >
                                    <Facebook className="h-5 w-5 text-primary" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* kolom form: sekarang md:col-span-2 (sekitar 40% dari lebar) agar sedikit lebih lebar */}
                    <div className="bg-card p-6 md:p-6 rounded-lg shadow-xs md:col-span-2">
                        <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary text-sm"
                                    placeholder="Deyo Irfandiantoro..."
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary text-sm"
                                    placeholder="Write your message..."
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="cosmic-button px-4 py-2 text-sm"
                                >
                                    Send
                                </button>

                                {status && (
                                    <span
                                        className={
                                            status.type === "success"
                                                ? "text-sm text-green-500"
                                                : "text-sm text-red-500"
                                        }
                                    >
                                        {status.text}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
