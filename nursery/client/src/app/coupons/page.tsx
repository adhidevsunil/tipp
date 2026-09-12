'use client';
import { coupons } from "@/data/plants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Copy, Check, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeCoupons = coupons.filter((c) => c.active);
  const expiredCoupons = coupons.filter((c) => !c.active);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl text-foreground">My Coupons</h1>
          <p className="text-muted-foreground mt-2">
            {activeCoupons.length} active coupon{activeCoupons.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Coupons */}
        {activeCoupons.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-foreground">Active Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCoupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
                  <div className="absolute top-4 right-4">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-3 py-1.5 bg-primary text-primary-foreground rounded-lg mb-3">
                          <code className="text-lg">{coupon.code}</code>
                        </div>
                        {coupon.type === "percentage" ? (
                          <p className="text-3xl text-primary">{coupon.discount}% OFF</p>
                        ) : (
                          <p className="text-3xl text-primary">${coupon.discount} OFF</p>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{coupon.description}</p>

                    <div className="space-y-2 mb-4">
                      {coupon.minOrder && (
                        <p className="text-sm text-muted-foreground">
                          • Minimum order: ${coupon.minOrder}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Valid until{" "}
                          {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={copiedCode === coupon.code ? "secondary" : "default"}
                      onClick={() => handleCopyCode(coupon.code)}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Expired Coupons */}
        {expiredCoupons.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6 text-foreground">Expired Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredCoupons.map((coupon) => (
                <Card key={coupon.id} className="relative overflow-hidden opacity-60">
                  <Badge
                    variant="destructive"
                    className="absolute top-4 right-4"
                  >
                    Expired
                  </Badge>
                  <CardHeader>
                    <CardTitle>
                      <div className="inline-block px-3 py-1.5 bg-muted text-muted-foreground rounded-lg mb-3">
                        <code className="text-lg">{coupon.code}</code>
                      </div>
                      {coupon.type === "percentage" ? (
                        <p className="text-3xl text-muted-foreground">
                          {coupon.discount}% OFF
                        </p>
                      ) : (
                        <p className="text-3xl text-muted-foreground">
                          ${coupon.discount} OFF
                        </p>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{coupon.description}</p>
                    <p className="text-sm text-destructive">
                      Expired on{" "}
                      {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeCoupons.length === 0 && expiredCoupons.length === 0 && (
          <div className="text-center py-16">
            <Tag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl mb-4 text-foreground">No coupons available</h2>
            <p className="text-muted-foreground mb-6">
              Check back later for exclusive deals and offers
            </p>
            <Button asChild size="lg">
              <a href="/plants">Continue Shopping</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
