using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechMarket.Models
{
    public partial class PhoneFilter
    {
        public List<int> BrandIDList { get; set; }
        public List<string> OSList { get; set; }
        public List<string> RAMList { get; set; }
        public List<string> ROMList { get; set; }
        public List<string> CameraList { get; set; }
        public List<string> FrontCameraList { get; set; }

        public override string ToString()
        {
            return BrandIDList + "\n" + OSList + "\n"  + RAMList + "\n " + ROMList + "\n " + CameraList + "\n " + FrontCameraList + "\n " ;
        }
    }
}