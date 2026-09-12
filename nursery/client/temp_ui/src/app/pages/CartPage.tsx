import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { coupons } from "../data/plants";
import { toast } from "sonner";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, appliedCoupon, discount, applyCoupon, removeCoupon } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code === couponCode.toUpperCase() && c.active
    );

    if (!coupon) {
      toast.error("Invalid or expired coupon code");
      return;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      toast.error(`Minimum order of $${coupon.minOrder} required for this coupon`);
      return;
    }

    const discountAmount =
      coupon.type === "percentage"
        ? (subtotal * coupon.discount) / 100
        : coupon.discount;

    applyCoupon(couponCode.toUpperCase(), discountAmount);
    toast.success("Coupon applied successfully!");
    setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-3xl mb-4 text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any plants yet
          </p>
          <Button asChild size="lg">
            <Link to="/plants">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.plantId}>
                      <div className="flex gap-6">
                        {/* Image */}
                        <Link
                          to={`/product/${item.plantId}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-lg bg-muted"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.plantId}`}>
                            <h3 className="text-lg text-foreground hover:text-primary mb-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-2xl text-primary mb-4">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.plantId, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-6 py-2 min-w-[60px] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.plantId, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.plantId)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6 text-foreground">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block mb-2 text-foreground">Have a coupon?</label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-secondary/20 border border-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{appliedCoupon}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleApplyCoupon} variant="outline">
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 50 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-xl mb-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/plants">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
