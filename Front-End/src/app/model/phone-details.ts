import { Phone } from './phone';
import { Product } from './product';

export class PhoneDetails {
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
    Product: Product;

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
        this.Product = new Product(PhoneID, GUID, ProductName, Price, TypeID, Quantity,
            BrandID, Thumbnail, Pic1, Pic2, Pic3, Pic4);
    }
}