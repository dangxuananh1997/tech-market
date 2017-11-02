using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechMarket.Models
{
    public class LaptopFilter
    {
        public List<int> BrandIDList { get; set; }
        public List<string> OSList { get; set; }
        public List<string> CPUList { get; set; }
        public List<string> RAMList { get; set; }
        public List<string> HardDiskList { get; set; }
        public List<string> GPUList { get; set; }
        public List<string> Weight { get; set; }
        public List<string> BatteryList { get; set; }
    }
}