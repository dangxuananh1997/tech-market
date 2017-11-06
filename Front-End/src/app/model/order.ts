export class Order {
    OrderID: number;
    ProductID: number;
    ProductName: string;
    Quantity: number;
    Price: number;
    CustomerEmail: string;
    CustomerPhone: string;
    CustomerAddress: string;
    CustomerName: string;
    CustomerNote: string;
    OrderStatus: boolean;
    
    constructor(
        OrderID: number,
        ProductID: number,
        ProductName: string,
        Quantity: number,
        Price: number,
        CustomerEmail: string,
        CustomerPhone: string,
        CustomerAddress: string,
        CustomerName: string,
        CustomerNote: string,
        OrderStatus: boolean
    ) {
        this.OrderID = OrderID;
        this.ProductID = ProductID;
        this.ProductName = ProductName;
        this.Quantity = Quantity;
        this.Price = Price;
        this.CustomerEmail = CustomerEmail;
        this.CustomerPhone = CustomerPhone;
        this.CustomerAddress = CustomerAddress;
        this.CustomerName = CustomerName;
        this.CustomerNote = CustomerNote;
        this.OrderStatus = OrderStatus;
    }
}