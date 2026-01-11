import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top stripe */}
      <div className="taxi-stripe h-2" />
      
      {/* Main header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-display text-primary-foreground text-xl md:text-2xl font-bold">FD</span>
              </div>
              <span className="font-display text-foreground text-xl md:text-2xl tracking-wide">FAIR DEAL CAR SERVICE</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Button variant="taxiOutline" size="default" asChild>
                <a href="tel:5188199978" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  CALL NOW
                </a>
              </Button>
              <Button variant="taxiOutline" size="default" asChild>
                <a href="mailto:fairdealcarservice@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  EMAIL US
                </a>
              </Button>
              <Button variant="taxi" size="default" asChild>
                <a href="#booking">BOOK A RIDE</a>
              </Button>
            </nav>

            {/* Mobile phone + menu */}
            <div className="flex lg:hidden items-center gap-2">
              <Button variant="taxi" size="sm" asChild>
                <a href="tel:5188199978" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">(518) 819-9978</span>
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Button variant="taxiOutline" className="w-full justify-center" asChild>
                <a href="tel:5188199978" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  CALL NOW
                </a>
              </Button>
              <Button variant="taxiOutline" className="w-full justify-center" asChild>
                <a href="mailto:fairdealcarservice@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  EMAIL US
                </a>
              </Button>
              <Button variant="taxi" className="w-full justify-center" asChild>
                <a href="#booking">BOOK A RIDE</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
