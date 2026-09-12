import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { plants } from "../data/plants";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PlantCard } from "../components/PlantCard";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Sparkles,
  ArrowLeft,
  Minus,
  Plus,
  Check,
} from "lucide-react";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Plant not found</h2>
          <Button onClick={() => navigate("/plants")}>Back to Plants</Button>
        </div>
      </div>
    );
  }

  const relatedPlants = plants
    .filter((p) => p.category === plant.category && p.id !== plant.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        plantId: plant.id,
        name: plant.name,
        price: plant.price,
        image: plant.image,
      });
    }
    toast.success(`${quantity} ${plant.name}${quantity > 1 ? "s" : ""} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/plants" className="hover:text-primary">
              Plants
            </Link>
            <span>/</span>
            <Link to={`/plants/${plant.category}`} className="hover:text-primary">
              {plant.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{plant.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-4">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
            {plant.originalPrice && (
              <Badge className="bg-destructive text-destructive-foreground mb-2">
                Save ${(plant.originalPrice - plant.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="mb-3">{plant.category}</Badge>
              <h1 className="text-4xl mb-4 text-foreground">{plant.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(plant.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2">
                    {plant.rating} ({plant.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl text-primary">${plant.price.toFixed(2)}</span>
                {plant.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${plant.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {plant.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span>In Stock ({plant.stock} available)</span>
                  </div>
                ) : (
                  <div className="text-destructive">Out of Stock</div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{plant.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Sun className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sunlight</p>
                    <p className="text-foreground">{plant.sunlight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Watering</p>
                    <p className="text-foreground">{plant.watering}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="text-foreground">{plant.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Air Purifying</p>
                    <p className="text-foreground">{plant.airPurifying ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(plant.stock, quantity + 1))}
                    disabled={quantity >= plant.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!plant.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleBuyNow}
                  disabled={!plant.inStock}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Droplets className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-foreground">Watering</h3>
                      </div>
                      <p className="text-muted-foreground ml-13">{plant.careInstructions.watering}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-foreground">Sunlight</h3>
                      </div>
                      <p className="text-muted-foreground ml-13">{plant.careInstructions.sunlight}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Thermometer className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-foreground">Temperature</h3>
                      </div>
                      <p className="text-muted-foreground ml-13">{plant.careInstructions.temperature}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Wind className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-foreground">Humidity</h3>
                      </div>
                      <p className="text-muted-foreground ml-13">{plant.careInstructions.humidity}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-foreground">Fertilizing</h3>
                      </div>
                      <p className="text-muted-foreground ml-13">{plant.careInstructions.fertilizing}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{plant.description}</p>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-foreground mb-3">Plant Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="text-foreground">{plant.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-foreground">{plant.indoor ? "Indoor" : "Outdoor"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="text-foreground">{plant.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Air Purifying</p>
                        <p className="text-foreground">{plant.airPurifying ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedPlants.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl mb-8 text-foreground">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPlants.map((relatedPlant) => (
                <PlantCard key={relatedPlant.id} plant={relatedPlant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
