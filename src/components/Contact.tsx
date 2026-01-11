import { Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Ready to book? Contact us now for fast, reliable service
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a
              href="tel:5188199978"
              className="group bg-secondary/50 border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Call Us</p>
              <p className="font-display text-xl text-foreground">(518) 819-9978</p>
            </a>

            <a
              href="mailto:info@fairdealtaxi.com"
              className="group bg-secondary/50 border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
              <p className="font-display text-xl text-foreground break-all">info@fairdealtaxi.com</p>
            </a>

            <a
              href="https://www.fairdealtaxi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-secondary/50 border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Website</p>
              <p className="font-display text-xl text-foreground">fairdealtaxi.com</p>
            </a>
          </div>

          {/* Big CTA */}
          <Button variant="cta" size="xl" className="animate-pulse-glow" asChild>
            <a href="tel:5188199978" className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              CALL NOW (518) 819-9978
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
