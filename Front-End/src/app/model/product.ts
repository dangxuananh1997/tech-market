export class Product {
    ProductID: number;
    GUID: string;
    ProductName: string;
    Price: number;
    TypeID: number;
    Quantity: number;
    BrandID: number;
    Thumbnail: string;
    Pic1: string;
    Pic2: string;
    Pic3: string;
    Pic4: string;

    constructor(
        ProductID: number,
        GUID: string,
        ProductName: string,
        Price: number,
        TypeID: number,
        Quantity: number,
        BrandID: number,
        Thumbnail: string,
        Pic1: string,
        Pic2: string,
        Pic3: string,
        Pic4: string
    ) {
        this.ProductID = ProductID;
        this.GUID = GUID;
        this.ProductName = ProductName;
        this.Price = Price;
        this.TypeID = TypeID;
        this.Quantity = Quantity;
        this.BrandID = BrandID;
        this.Thumbnail = Thumbnail;
        this.Pic1 = Pic1;
        this.Pic2 = Pic2;
        this.Pic3 = Pic3;
        this.Pic4 = Pic4;
    }
}
