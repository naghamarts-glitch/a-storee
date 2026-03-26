import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentMethodProps {
  total: number;
  items: any[];
  onSuccess?: (transactionId: string) => void;
  onClose?: () => void;
}

export const PaymentGateway: React.FC<PaymentMethodProps> = ({ 
  total, 
  items, 
  onSuccess, 
  onClose 
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "2checkout" | "whatsapp">("whatsapp");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    name: ""
  });
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // بيانات الدفع (يجب أن تُرسل إلى backend آمن)
      const paymentData = {
        method: "stripe",
        amount: total,
        currency: "EGP",
        items: items.map(i => ({ id: i.id, quantity: i.quantity })),
        metadata: {
          email: formData.email,
          name: formData.name
        }
      };

      // محاكاة طلب API (استبدل بـ backend حقيقي)
      console.log("Processing Stripe payment:", paymentData);
      
      // هنا يجب استدعاء Stripe API عبر backend
      const mockTransactionId = `stripe_${Date.now()}`;
      setTransactionId(mockTransactionId);
      setSuccess(true);
      
      if (onSuccess) onSuccess(mockTransactionId);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handle2CheckoutPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const paymentData = {
        method: "2checkout",
        amount: total,
        currency: "EGP",
        items: items.map(i => ({ id: i.id, quantity: i.quantity })),
        metadata: {
          email: formData.email,
          name: formData.name
        }
      };

      console.log("Processing 2Checkout payment:", paymentData);
      
      // هنا يجب استدعاء 2Checkout API عبر backend
      const mockTransactionId = `2checkout_${Date.now()}`;
      setTransactionId(mockTransactionId);
      setSuccess(true);
      
      if (onSuccess) onSuccess(mockTransactionId);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppPayment = () => {
    const itemsList = items
      .map(i => `${i.name} (x${i.quantity})`)
      .join("\n");
    
    const message = `أهلاً وسهلاً في نغم الفن 🎨\n\nطلبي:\n${itemsList}\n\nالإجمالي: ${total} جنيه مصري`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201121688248?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    const transId = `whatsapp_${Date.now()}`;
    setTransactionId(transId);
    setSuccess(true);
    if (onSuccess) onSuccess(transId);
  };

  const handleClose = () => {
    if (success) {
      setOpen(false);
      setSuccess(false);
      setTransactionId("");
      setFormData({ cardNumber: "", expiryDate: "", cvv: "", email: "", name: "" });
      setPaymentMethod("whatsapp");
      onClose?.();
    }
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        size="lg"
      >
        الدفع الآن
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">الدفع والشراء</DialogTitle>
            <DialogDescription>اختر طريقة الدفع المفضلة لديك</DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">تم الدفع بنجاح! ✅</h3>
              <p className="text-gray-600 mb-4">رقم المعاملة: {transactionId}</p>
              <p className="text-center text-sm text-gray-600 mb-6">
                شكراً لشرائك من نغم الفن. سيتم التواصل معك قريباً لتأكيد الطلب.
              </p>
              <Button onClick={handleClose}>حسناً</Button>
            </div>
          ) : (
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="stripe">Stripe</TabsTrigger>
                <TabsTrigger value="2checkout">2Checkout</TabsTrigger>
              </TabsList>

              {/* WhatsApp Method */}
              <TabsContent value="whatsapp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>الدفع عبر WhatsApp</CardTitle>
                    <CardDescription>تحويل بنكي آمن وسريع</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-3">الإجمالي: <strong>{total} جنيه مصري</strong></p>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-semibold text-gray-700">المنتجات:</p>
                        {items.map(item => (
                          <div key={item.id} className="text-xs text-gray-600 flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        سيتم فتح WhatsApp. أرسل الرسالة تلقائياً وستتواصل معك الفريق للتأكيد والدفع.
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={handleWhatsAppPayment}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "جاري المعالجة..." : "تحويل عبر WhatsApp"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stripe Method */}
              <TabsContent value="stripe" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>الدفع بـ Stripe</CardTitle>
                    <CardDescription>بطاقة ائتمان آمنة (Visa, Mastercard)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleStripePayment} className="space-y-4">
                      <div>
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="محمد أحمد"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">رقم البطاقة</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded text-sm text-gray-700">
                        الإجمالي: <strong>{total} جنيه مصري</strong>
                      </div>

                      <Button 
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "جاري المعالجة..." : "دفع الآن"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2Checkout Method */}
              <TabsContent value="2checkout" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>الدفع بـ 2Checkout</CardTitle>
                    <CardDescription>طرق دفع متعددة آمنة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handle2CheckoutPayment} className="space-y-4">
                      <div>
                        <Label htmlFor="name2">الاسم الكامل</Label>
                        <Input
                          id="name2"
                          name="name"
                          placeholder="محمد أحمد"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email2">البريد الإلكتروني</Label>
                        <Input
                          id="email2"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber2">رقم البطاقة</Label>
                        <Input
                          id="cardNumber2"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate2">تاريخ الانتهاء</Label>
                          <Input
                            id="expiryDate2"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv2">CVV</Label>
                          <Input
                            id="cvv2"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded text-sm text-gray-700">
                        الإجمالي: <strong>{total} جنيه مصري</strong>
                      </div>

                      <Button 
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "جاري المعالجة..." : "دفع الآن"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
