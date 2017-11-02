import { Phone } from './phone';
export class PhoneDetails extends Phone {
    ScreenResolution: string;
    NFC: string;
    HeadphoneJack: string;
    Wifi: string;
    Sim: string;
    Special: string;

    constructor(
        PhoneID: number,
        Name: string,
        Price: number,
        BrandID: number,
        Thumbnail: string,
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
        Quantity: number,
        Pic1: string,
        Pic2: string,
        Pic3: string,
        Pic4: string,
    ) {
        super(PhoneID, Name, Price, BrandID, Thumbnail, OS, ScreenWidth, ScreenResolution, CPU, RAM, ROM, Camera, FrontCamera, Battery);
        this.NFC = NFC;
        this.HeadphoneJack = HeadphoneJack;
        this.Wifi = Wifi;
        this.Sim = Sim;
        this.Special = Special;
        this.Quantity = Quantity;
        this.Pic1 = Pic1;
        this.Pic2 = Pic2;
        this.Pic3 = Pic3;
        this.Pic4 = Pic4;
    }

}
