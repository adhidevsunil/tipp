import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router";
import { PlantCard } from "../components/PlantCard";
import { plants } from "../data/plants";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function ProductListingPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter States
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSunlight, setSelectedSunlight] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [airPurifyingOnly, setAirPurifyingOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(true);

  // Sunlight options
  const sunlightOptions = ["Low to Bright Light", "Low to Medium Light", "Medium Light", "Bright Indirect Light", "Indirect Light", "Bright Direct Light", "Medium to Bright Light"];
  const sizeOptions = ["Small", "Medium", "Large"];

  // Filter and sort plants
  const filteredPlants = useMemo(() => {
    let result = [...plants];

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by sunlight
    if (selectedSunlight.length > 0) {
      result = result.filter((p) => selectedSunlight.includes(p.sunlight));
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size));
    }

    // Filter by indoor
    if (indoorOnly) {
      result = result.filter((p) => p.indoor);
    }

    // Filter by air purifying
    if (airPurifyingOnly) {
      result = result.filter((p) => p.airPurifying);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [category, searchQuery, priceRange, selectedSunlight, selectedSizes, indoorOnly, airPurifyingOnly, sortBy]);

  const clearFilters = () => {
    setPriceRange([0, 100]);
    setSelectedSunlight([]);
    setSelectedSizes([]);
    setIndoorOnly(false);
    setAirPurifyingOnly(false);
    setSortBy("featured");
  };

  const toggleSunlight = (option: string) => {
    setSelectedSunlight((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  const toggleSize = (option: string) => {
    setSelectedSizes((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl mb-2 text-foreground">
            {category || (searchQuery ? `Search Results for "${searchQuery}"` : "All Plants")}
          </h1>
          <p className="text-muted-foreground">
            {filteredPlants.length} {filteredPlants.length === 1 ? "plant" : "plants"} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "w-80" : "w-0 overflow-hidden"} flex-shrink-0 transition-all duration-300`}>
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <Label className="mb-3 block">Price Range</Label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Sunlight Requirement */}
                <div>
                  <Label className="mb-3 block">Sunlight Requirement</Label>
                  <div className="space-y-2">
                    {sunlightOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sunlight-${option}`}
                          checked={selectedSunlight.includes(option)}
                          onCheckedChange={() => toggleSunlight(option)}
                        />
                        <label
                          htmlFor={`sunlight-${option}`}
                          className="text-sm cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plant Size */}
                <div>
                  <Label className="mb-3 block">Plant Size</Label>
                  <div className="space-y-2">
                    {sizeOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${option}`}
                          checked={selectedSizes.includes(option)}
                          onCheckedChange={() => toggleSize(option)}
                        />
                        <label htmlFor={`size-${option}`} className="text-sm cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="mb-3 block">Location</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="indoor"
                        checked={indoorOnly}
                        onCheckedChange={(checked) => setIndoorOnly(checked as boolean)}
                      />
                      <label htmlFor="indoor" className="text-sm cursor-pointer">
                        Indoor Only
                      </label>
                    </div>
                  </div>
                </div>

                {/* Special Features */}
                <div>
                  <Label className="mb-3 block">Special Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airPurifying"
                        checked={airPurifyingOnly}
                        onCheckedChange={(checked) => setAirPurifyingOnly(checked as boolean)}
                      />
                      <label htmlFor="airPurifying" className="text-sm cursor-pointer">
                        Air Purifying
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No plants found matching your criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
