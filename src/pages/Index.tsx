import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingForm from "@/components/QuoteForm";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BookingForm />
        <Services />
        <WhyChooseUs />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
