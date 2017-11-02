import { Laptop } from './laptop';
export class LaptopDetails extends Laptop {
    Port: string;
    Wifi: string;
    Size: string;
    Special: string;
    Pic1: string;
    Pic2: string;
    Pic3: string;
    Pic4: string;

    constructor(
        LaptopID: number,
        ProductName: string,
        Price: number,
        BrandID: number,
        Thumbnail: string,
        OS: string,
        ScreenWidth: string,
        ScreenResolution: string,
        CPU: string,
        RAM: string,
        HardDisk: string,
        GPU: string,
        Weight: string,
        Battery: string,
        Port: string,
        Wifi: string,
        Size: string,
        Special: string,
        Pic1: string,
        Pic2: string,
        Pic3: string,
        Pic4: string,
    ) {
        super(LaptopID, ProductName, Price, BrandID, Thumbnail, OS, ScreenWidth, ScreenResolution, CPU, RAM, HardDisk, GPU, Weight, Battery);
        this.Port = Port;
        this.Wifi = Wifi;
        this.Size = Size;
        this.Special = Special;
        this.Pic1 = Pic1;
        this.Pic2 = Pic2;
        this.Pic3 = Pic3;
        this.Pic4 = Pic4;
    }
}
