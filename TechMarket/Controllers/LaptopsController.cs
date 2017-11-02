using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TechMarket.Models;

namespace TechMarket.Controllers
{
    public class LaptopsController : ApiController
    {
        private TechMarketEntities db = new TechMarketEntities();

        // GET: api/Laptops/GetLaptops
        [HttpGet]
        public IHttpActionResult GetLaptops()
        {
            var laptopList = db.Laptops.Select(lap => new
            {
                lap.LaptopID,
                lap.Product.ProductName,
                lap.OS,
                lap.CPU,
                lap.RAM,
                lap.HardDisk,
                lap.GPU,
                lap.ScreenResolution,
                lap.ScreenWidth,
                lap.Weight,
                lap.Battery,
                lap.Product.Price,
                lap.Product.BrandID,
                lap.Product.Thumbnail
            });

            return Ok(laptopList);
        }

        // GET: api/Laptops/GetInRange
        [HttpGet]
        public IHttpActionResult GetInRange(int first, int last)
        {
            var laptopList = db.Laptops.Select(lap => new
            {
                lap.LaptopID,
                lap.Product.ProductName,
                lap.OS,
                lap.CPU,
                lap.RAM,
                lap.HardDisk,
                lap.GPU,
                lap.ScreenResolution,
                lap.ScreenWidth,
                lap.Weight,
                lap.Battery,
                lap.Product.Price,
                lap.Product.BrandID,
                lap.Product.Thumbnail
            }).OrderByDescending(lap => lap.LaptopID).Skip(first).Take(last);

            return Ok(laptopList);
        }

        // GET: api/Laptops/GetLaptopByID/{id}
        [HttpGet]
        public IHttpActionResult GetLaptopByID(int id)
        {
            var laptop = db.Laptops.Select(lap => new
            {
                lap.LaptopID,
                lap.Product.ProductName,
                lap.OS,
                lap.CPU,
                lap.RAM,
                lap.HardDisk,
                lap.GPU,
                lap.ScreenResolution,
                lap.ScreenWidth,
                lap.Weight,
                lap.Battery,
                lap.Product.Price,
                lap.Product.BrandID,
                lap.Product.Thumbnail,
                lap.Product.Pic1,
                lap.Product.Pic2,
                lap.Product.Pic3,
                lap.Product.Pic4,
                lap.Port,
                lap.Wifi,
                lap.Size,
                lap.Special,
            }).Where(lap => lap.LaptopID == id).FirstOrDefault();

            if (laptop == null)
            {
                return NotFound();
            }

            return Ok(laptop);
        }

        // PUT: api/Laptops/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLaptop(int id, Laptop laptop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != laptop.LaptopID || id != laptop.Product.ProductID)
            {
                return BadRequest();
            }

            db.Entry(laptop).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LaptopExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            db.Entry(laptop.Product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Laptops/PostLaptop/{laptop}
        [HttpPost]
        public async Task<IHttpActionResult> PostLaptop(Laptop laptop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // add product to table product
            laptop.Product.GUID = Guid.NewGuid();
            db.Products.Add(laptop.Product);
            // try save change
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductExists(laptop.Product.ProductID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            // add forein key to laptop
            Product p = db.Products.Where(prod => prod.GUID == laptop.Product.GUID).FirstOrDefault();
            laptop.LaptopID = p.ProductID;

            // add laptop to table Laptop
            db.Laptops.Add(laptop);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LaptopExists(laptop.LaptopID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Laptops/DeleteLaptop/{id}
        [HttpPost]
        public async Task<IHttpActionResult> DeleteLaptop(int id)
        {
            

            // remove laptop in table Laptop
            Laptop laptop = await db.Laptops.FindAsync(id);
            if (laptop == null)
            {
                return NotFound();
            }
            db.Laptops.Remove(laptop);

            // remove product in table Product
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            db.Products.Remove(product);

            //save change
            await db.SaveChangesAsync();

            return Ok(laptop);
        }

        [HttpPost]
        public async Task<IHttpActionResult> FilterLaptop([FromBody]JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            LaptopFilter filter = data["filter"].ToObject<LaptopFilter>();
            int first = data["first"].ToObject<Int32>();
            int last = data["last"].ToObject<Int32>();

            if (filter == null)
            {
                Debug.WriteLine("Null");
            }
            else
            {
                Debug.WriteLine(filter.ToString());
            }


            var p = await db.Laptops.Select(laptop => laptop).ToListAsync();

            foreach (var brand in filter.BrandIDList)
            {
                if (brand != 0)
                {
                    p = await db.Laptops.Where(laptop => laptop.Product.BrandID == brand).ToListAsync();
                }
            }
            foreach (var os in filter.OSList)
            {
                if (!String.IsNullOrEmpty(os))
                {
                    p = await db.Laptops.Where(laptop => laptop.OS.Contains(os)).ToListAsync();
                }
            }
            foreach (var cpu in filter.CPUList)
            {
                if (!String.IsNullOrEmpty(cpu))
                {
                    p = await db.Laptops.Where(laptop => laptop.CPU.Contains(cpu)).ToListAsync();
                }
            }
            foreach (var ram in filter.RAMList)
            {
                if (!String.IsNullOrEmpty(ram))
                {
                    p = await db.Laptops.Where(laptop => laptop.RAM.Contains(ram)).ToListAsync();
                }
            }
            foreach (var rom in filter.HardDiskList)
            {
                if (!String.IsNullOrEmpty(rom))
                {
                    p = await db.Laptops.Where(laptop => laptop.HardDisk.Contains(rom)).ToListAsync();
                }
            }
            foreach (var gpu in filter.GPUList)
            {
                if (!String.IsNullOrEmpty(gpu))
                {
                    p = await db.Laptops.Where(laptop => laptop.GPU.Contains(gpu)).ToListAsync();
                }
            }
            foreach (var weight in filter.Weight)
            {
                if (!String.IsNullOrEmpty(weight))
                {
                    p = await db.Laptops.Where(laptop => laptop.Weight.Contains(weight)).ToListAsync();
                }
            }
            foreach (var battery in filter.BatteryList)
            {
                if (!String.IsNullOrEmpty(battery))
                {
                    p = await db.Laptops.Where(laptop => laptop.Battery.Contains(battery)).ToListAsync();
                }
            }

            var laptopList = p.Select(laptop => new
            {
                laptop.LaptopID,
                laptop.Product.ProductName,
                laptop.OS,
                laptop.CPU,
                laptop.RAM,
                laptop.HardDisk,
                laptop.GPU,
                laptop.ScreenResolution,
                laptop.ScreenWidth,
                laptop.Weight,
                laptop.Battery,
                laptop.Product.Price,
                laptop.Product.BrandID,
                laptop.Product.Thumbnail,
                laptop.Product.Pic1,
                laptop.Product.Pic2,
                laptop.Product.Pic3,
                laptop.Product.Pic4,
                laptop.Port,
                laptop.Wifi,
                laptop.Size,
                laptop.Special,
            }).OrderByDescending(laptop => laptop.LaptopID).Skip(first).Take(last);

            Debug.WriteLine(filter.ToString());
            foreach (var i in p)
            {
                Debug.WriteLine(i.LaptopID);
            }
            if (p == null)
            {
                Debug.WriteLine("It's null");
            }
            foreach (var laptop in laptopList)
            {
                Debug.WriteLine(laptop.LaptopID);
            }

            return Ok(laptopList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LaptopExists(int id)
        {
            return db.Laptops.Count(e => e.LaptopID == id) > 0;
        }

        private bool ProductExists(int proID)
        {
            return db.Products.Count(p => p.ProductID == proID) > 0;
        }
    }
}