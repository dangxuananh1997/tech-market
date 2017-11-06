export class Phone {
    PhoneID: number;
    OS: string;
    ScreenWidth: string;
    CPU: string;
    RAM: string;
    ROM: string;
    Camera: string;
    FrontCamera: string;
    Battery: string;
    ScreenResolution: string;
    NFC: string;
    HeadphoneJack: string;
    Wifi: string;
    Sim: string;
    Special: string;
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
        PhoneID: number,
        OS: string,
        ScreenWidth: string,
        CPU: string,
        RAM: string,
        ROM: string,
        Camera: string,
        FrontCamera: string,
        Battery: string,
        ScreenResolution: string,
        NFC: string,
        HeadphoneJack: string,
        Wifi: string,
        Sim: string,
        Special: string,
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
        this.PhoneID = PhoneID;
        this.OS = OS;
        this.ScreenWidth = ScreenWidth;
        this.CPU = CPU;
        this.RAM = RAM;
        this.ROM = ROM;
        this.Camera = Camera;
        this.FrontCamera = FrontCamera;
        this.Battery = Battery;
        this.ScreenResolution = ScreenResolution;
        this.NFC = NFC;
        this.HeadphoneJack = HeadphoneJack;
        this.Wifi = Wifi;
        this.Sim = Sim;
        this.Special = Special;
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

