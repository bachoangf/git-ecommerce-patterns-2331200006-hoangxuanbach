import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        console.log("[Checkout] Starting checkout process...");

        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if(inStock){
            const paymentSuccess = this.paymentService.processPayment(orderDetails.userId, orderDetails.amount);

            if(paymentSuccess){
                const shipment = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
                console.log(`[Checkout] Order placed successfully. Tracking ID: ${shipment.trackingId}`);
            }
            else{
                console.log("[Checkout] Payment failed.");
            }
        }
        else{
            console.log("[Checkout] Some products are out of stock.");
        }
    }
}

export { CheckoutFacade };
