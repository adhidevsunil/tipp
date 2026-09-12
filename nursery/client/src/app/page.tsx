'use client';
import Link from "next/link";
import { ArrowRight, Leaf, Wind, Sun, Droplets, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlantCard from "@/components/PlantCard";
import { plants, reviews, categories } from "@/data/plants";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const featuredPlants = plants.filter(p => p.originalPrice).slice(0, 3);
  const bestSellers = plants.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1619077130450-baea09efa355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMG51cnNlcnklMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3MzQwMjU2Mnww&ixlib=rb-4.1.0&q=80&w=1080)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8" />
            <span className="text-sm uppercase tracking-wider">Welcome to Thottam</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white">Bring Nature Home</h1>
          <p className="text-xl mb-8 text-white/90">
            Discover our curated collection of premium plants for your living spaces. Each plant is
            carefully selected and nurtured with love.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/plants">
                Shop All Plants <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
              <Link href="/plants/Indoor Plants">Indoor Plants</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-3 text-foreground">Featured Plants</h2>
          <p className="text-muted-foreground">Special offers on our most popular plants</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3 text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground">Find the perfect plants for your space</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/plants/Indoor Plants">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">Indoor Plants</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfect for brightening up your home
                  </p>
                  <p className="text-primary">
                    {plants.filter((p) => p.category === "Indoor Plants").length} Plants →
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/plants/Outdoor Plants">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Sun className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">Outdoor Plants</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Beautiful plants for your garden
                  </p>
                  <p className="text-primary">
                    {plants.filter((p) => p.category === "Outdoor Plants").length} Plants →
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/plants/Flowering Plants">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Droplets className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">Flowering Plants</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add colors to your space</p>
                  <p className="text-primary">
                    {plants.filter((p) => p.category === "Flowering Plants").length} Plants →
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/plants/Air Purifying Plants">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Wind className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">Air Purifying</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Clean air, healthy living
                  </p>
                  <p className="text-primary">
                    {plants.filter((p) => p.category === "Air Purifying Plants").length} Plants →
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-3 text-foreground">Best Selling Plants</h2>
          <p className="text-muted-foreground">Our customers' favorite picks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button size="lg" variant="outline" asChild className="rounded-full">
            <Link href="/plants">
              View All Plants <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3 text-foreground">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real feedback from real plant lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-4">{review.comment}</p>
                  <div className="flex items-center gap-3">
                    {review.image && (
                      <img
                        src={review.image}
                        alt={review.author}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-3 text-foreground">Why Choose Thottam?</h2>
          <p className="text-muted-foreground">Premium plants, premium service</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-foreground">Premium Quality</h3>
            <p className="text-muted-foreground">
              Every plant is handpicked and quality-checked before delivery
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-foreground">Expert Care Tips</h3>
            <p className="text-muted-foreground">
              Detailed care instructions included with every plant
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-foreground">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Safe packaging and quick delivery to your doorstep
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
