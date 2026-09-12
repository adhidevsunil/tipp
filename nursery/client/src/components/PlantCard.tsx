'use client';
import Link from "next/link";
import { Star, ShoppingCart, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  useCart  } from "@/context/CartContext";
import { toast } from "sonner";
import { Plant } from "@/data/plants";

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      plantId: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
    });
    toast.success(`${plant.name} added to cart!`);
  };

  return (
    <Link href={`/product/${plant.id}`}>
      <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {plant.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
              Sale
            </Badge>
          )}
          {plant.airPurifying && (
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
              Air Purifying
            </Badge>
          )}
          
          {/* Quick Action */}
          <Button
            size="icon"
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <h3 className="text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {plant.name}
            </h3>
            <p className="text-sm text-muted-foreground">{plant.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(plant.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({plant.reviews})</span>
          </div>

          {/* Care Info */}
          <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Sun className="h-3 w-3" />
              <span>{plant.sunlight}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3" />
              <span>{plant.watering}</span>
            </div>
          </div>

          {/* Price and Stock */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-primary">${plant.price.toFixed(2)}</span>
              {plant.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${plant.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {!plant.inStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {plant.inStock && plant.stock < 10 && (
              <Badge variant="secondary" className="text-xs">
                Only {plant.stock} left
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
