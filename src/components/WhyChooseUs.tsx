import { CheckCircle, CreditCard, Shield, Users } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Fast & Reliable",
    description: "On-time pickup and drop-off, every time",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    description: "Licensed, experienced, and Clean Background-checked",
  },
  {
    icon: Shield,
    title: "Safe & Comfortable",
    description: "Clean, well-maintained vehicles",
  },
  {
    icon: CreditCard,
    title: "All Payment Methods",
    description: "We accept all major credit cards",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              WHY CHOOSE <span className="text-primary">US</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With years of experience serving the Capital Region, Fair Deal Taxi Service 
              has built a reputation for reliability, professionalism, and customer satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Decorative */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-card">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-display text-primary-foreground text-xl">24</span>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-foreground">24/7 SERVICE</p>
                    <p className="text-sm text-muted-foreground">Always available for you</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-display text-primary-foreground text-xl">★</span>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-foreground">TOP RATED</p>
                    <p className="text-sm text-muted-foreground">Trusted by thousands</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-display text-primary-foreground text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-foreground">LICENSED</p>
                    <p className="text-sm text-muted-foreground">Fully insured drivers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
