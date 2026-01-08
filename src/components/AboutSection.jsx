import { Code, User, Briefcase } from "lucide-react";

export const AboutSection = () => {
    return (
    <section id="about" className="py-24 px-4 relative"> 
    {""}
    <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        About<span className="text-primary">me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold"> 
                Passionate Web Developer & System Analyst
            </h3>

            <p className="text-muted-foreground">
                 A graduate of President University in Information Systems (GPA 3.72), with 9 months of work experience and 1 
                 year 5 months of internship.    Proficient in C# and PHP programming, with hands-on experience using MySQL, 
                 SSMS, Laravel, ASP.NET Core MVC, .NET Blazor Server, and Bootstrap.
            </p>

            <p className="text-muted-foreground"> 
                Knowledgeable in API concepts and 
                integration in web application development. Also experienced in IT support tasks such as network cabling, printer 
                troubleshooting, and hardware/software maintenance. Actively involved in campus organizations, demonstrating 
                strong leadership, communication, and teamwork skills
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <a href="#contact" className="cosmic-button"> 
                    {""}
                    Get In Touch
                </a>

                <a href="https://drive.google.com/file/d/1Cvc1hEdX2275-Ckg-ifdvRlxjvwhL44u/view?usp=sharing" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                    Download My CV
                </a>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Code className="h-6 w-6 text-primary"/> 
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-lg">Web Development (Fullstack)</h4>
                        <p className="text-muted-foreground">
                        Mengembangkan aplikasi web end-to-end dan mengintegrasikan API untuk otomatisasi proses kerja.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <User className="h-6 w-6 text-primary"/> 
                    </div>
                    <div className ="text-left">
                        <h4 className="font-bold text-lg">UI/UX & Frontend Implementation</h4>
                        <p className="text-muted-foreground">
                           Mendesain antarmuka yang mudah digunakan dan menyajikan data secara visual untuk mendukung keputusan.
                        </p>
                    </div>
                </div>
            </div>
            <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary"/> 
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-lg">IT Support & Infrastruktur Teknologi</h4>
                        <p className="text-muted-foreground">
                          Menangani troubleshooting perangkat dan sistem agar operasional berjalan lancar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
    );
};