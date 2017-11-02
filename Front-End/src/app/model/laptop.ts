import { Product } from './product';
export class Laptop{
    OS: string;
    ScreenWidth: string;
    ScreenResolution: string;
    CPU: string;
    RAM: string;
    HardDisk: string;
    GPU: string;
    Weight: string;
    Battery: string;
    
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
    ) {
        // super(LaptopID, ProductName, Price, BrandID, Thumbnail);
        this.OS = OS;
        this.ScreenWidth = ScreenWidth;
        this.ScreenResolution = ScreenResolution;
        this.CPU = CPU;
        this.RAM = RAM;
        this.HardDisk = HardDisk;
        this.GPU = GPU;
        this.Weight = Weight;
        this.Battery = Battery;
    }
    
}
