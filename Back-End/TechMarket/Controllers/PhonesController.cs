using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TechMarket.Models;

namespace TechMarket.Controllers
{
    public class PhonesController : ApiController
    {
        private TechMarketEntities db = new TechMarketEntities();

        // GET: api/Phones/GetPhones
        [HttpGet]
        public IHttpActionResult GetPhones()
        {
            var phoneList = db.Phones.Select(phone => new
            {
                phone.PhoneID,
                phone.Product.ProductName,
                phone.Product.Price,
                phone.Product.BrandID,
                phone.Product.Thumbnail,
                phone.Product.Quantity,
                phone.OS,
                phone.ScreenWidth,
                phone.ScreenResolution,
                phone.CPU,
                phone.RAM,
                phone.ROM,
                phone.Camera,
                phone.FrontCamera,
                phone.Battery
            }).OrderByDescending(phone => phone.PhoneID);

            return Ok(phoneList);
        }

        [HttpGet]
        public IHttpActionResult SearchByName(string name)
        {
            var phoneList = db.Phones.Select(phone => new
            {
                phone.PhoneID,
                phone.Product.ProductName,
                phone.Product.Price,
                phone.Product.Thumbnail,

            }).Where(phone => phone.ProductName.Contains(name));

            return Ok(phoneList);
        }

        // GET: api/Phones/GetPhones/
        [HttpGet]
        public IHttpActionResult GetInRange(int first, int last)
        {
            var phoneList = db.Phones.Select(phone => new
            {
                phone.PhoneID,
                phone.Product.ProductName,
                phone.Product.Price,
                phone.Product.BrandID,
                phone.Product.Thumbnail,
                phone.OS,
                phone.ScreenWidth,
                phone.ScreenResolution,
                phone.CPU,
                phone.RAM,
                phone.ROM,
                phone.Camera,
                phone.FrontCamera,
                phone.Battery
            }).OrderByDescending(phone => phone.PhoneID).Skip(first).Take(last);

            return Ok(phoneList);
        }

        // GET: api/Phones/GetPhoneByID/{id}
        [HttpGet]
        public IHttpActionResult GetPhoneByID(int id)
        {
            var ph = db.Phones.Select(phone => new
            {
                phone.PhoneID,
                phone.Product.ProductName,
                phone.Product.Price,
                phone.Product.BrandID,
                phone.Product.Thumbnail,
                phone.Product.Pic1,
                phone.Product.Pic2,
                phone.Product.Pic3,
                phone.Product.Pic4,
                phone.Product.Quantity,
                phone.OS,
                phone.ScreenWidth,
                phone.ScreenResolution,
                phone.CPU,
                phone.RAM,
                phone.ROM,
                phone.Camera,
                phone.FrontCamera,
                phone.Battery,
                phone.NFC,
                phone.HeadphoneJack,
                phone.Wifi,
                phone.Sim,
                phone.Special
            }).Where(phone => phone.PhoneID == id).FirstOrDefault();
            if (ph == null)
            {
                return NotFound();
            }

            return Ok(ph);
        }

        // PUT: api/Phones/5
        [HttpPost]
        public async Task<IHttpActionResult> PutPhone([FromBody]JObject data)
        {
            var newContext = new TechMarketEntities();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int id = data["id"].ToObject<Int32>();
            Phone phone = data["phone"].ToObject<Phone>();
            
            Product p = await db.Products.FindAsync(id);
            phone.Product.GUID = p.GUID;
            
            if (id != phone.PhoneID || id != phone.Product.ProductID)
            {
                return BadRequest();
            }

            newContext.Entry(phone).State = EntityState.Modified;

            try
            {
                await newContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
                       
            newContext.Entry(phone.Product).State = EntityState.Modified;

            try
            {
                await newContext.SaveChangesAsync();
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

        // POST: api/Phones
        [HttpPost]
        public async Task<IHttpActionResult> PostPhone([FromBody]Phone phone)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // add product to table product
            phone.Product.GUID = Guid.NewGuid();
            db.Products.Add(phone.Product);
            //try save change
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductExists(phone.Product.ProductID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            // add forein key to phone
            Product p = db.Products.Where(prod => prod.GUID == phone.Product.GUID).FirstOrDefault();
            phone.PhoneID = p.ProductID;

            // add phone to table phone
            db.Phones.Add(phone);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhoneExists(phone.PhoneID))
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

        // DELETE: api/Phones/DeletePhone/{id}
        [HttpPost]
        public async Task<IHttpActionResult> DeletePhone(int id)
        {

            // romove phone in table Phone
            Phone phone = await db.Phones.FindAsync(id);
            if (phone == null)
            {
                return NotFound();
            }
            db.Phones.Remove(phone);
            // remove product in table Product
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            db.Products.Remove(product);

            // save change
            await db.SaveChangesAsync();

            return Ok(phone);
        }

        [HttpPost]
        public async Task<IHttpActionResult> FilterPhone([FromBody]JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            PhoneFilter filter = new PhoneFilter();

            if (!(data["filter"] == null))
            {
                filter = data["filter"].ToObject<PhoneFilter>();
            }

            
            int first = data["first"].ToObject<Int32>();
            int last = data["last"].ToObject<Int32>();


            var tempPhoneList = await db.Phones.Select(phone => phone).ToListAsync();
            var tempFilterList = new List<Phone>();

            // filter BrandID
            if (filter.BrandIDList != null) { 
                foreach (var brand in filter.BrandIDList)
                {
                    if (brand != 0)
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.Product.BrandID == brand).ToList()).ToList();
                        Debug.WriteLine("filter before: ");
                        foreach (var i in tempFilterList)
                        {
                            Debug.WriteLine(i.PhoneID + " BrandId: " + i.Product.BrandID);
                        }
                    }
                }
                tempPhoneList = tempPhoneList.Intersect(tempFilterList).ToList();
                Debug.WriteLine("Phone list before: ");
                foreach (var i in tempPhoneList)
                {
                    Debug.WriteLine(i.PhoneID + " BrandId: " + i.Product.BrandID);
                }
            }
            tempFilterList = new List<Phone>();

            // filter OS
            if (filter.OSList != null)
            {
                foreach (var os in filter.OSList)
                {
                    if (!String.IsNullOrEmpty(os))
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.OS.Contains(os)).ToList()).ToList();
                    }
                }
                tempPhoneList = tempPhoneList.Intersect(tempFilterList).ToList();
            }
            tempFilterList = new List<Phone>();

            // filter RAM
            if (filter.RAMList != null)
            {
                foreach (var ram in filter.RAMList)
                {
                    if (!String.IsNullOrEmpty(ram))
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.RAM.Contains(ram)).ToList()).ToList();
                    }
                }
                tempPhoneList = tempPhoneList.Intersect(tempFilterList).ToList();
            }
            tempFilterList = new List<Phone>();
            
            // filter ROM
            if (filter.ROMList != null)
            {
                foreach (var rom in filter.ROMList)
                {
                    if (!String.IsNullOrEmpty(rom))
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.ROM.Contains(rom)).ToList()).ToList();
                    }
                }
                tempPhoneList = tempPhoneList.Intersect(tempFilterList).ToList();
            }
            tempFilterList = new List<Phone>();

            // filter Camera
            if (filter.CameraList != null)
            {
                foreach (var cam in filter.CameraList)
                {
                    if (!String.IsNullOrEmpty(cam))
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.Camera.Contains(cam)).ToList()).ToList();
                    }
                }
            }
            tempFilterList = new List<Phone>();

            // filter Front Camera
            if (filter.FrontCameraList != null)
            {
                foreach (var frontCam in filter.FrontCameraList)
                {
                    if (!String.IsNullOrEmpty(frontCam))
                    {
                        tempFilterList = tempFilterList.Union(db.Phones.Where(phone => phone.FrontCamera.Contains(frontCam)).ToList()).ToList();
                    }
                }
                tempPhoneList = tempPhoneList.Intersect(tempFilterList).ToList();
            }
            tempFilterList = new List<Phone>();

            var phoneList = tempPhoneList.Select(phone => new
            {
                phone.PhoneID,
                phone.Product.ProductName,
                phone.Product.Price,
                phone.Product.BrandID,
                phone.Product.Thumbnail,
                phone.Product.Pic1,
                phone.Product.Pic2,
                phone.Product.Pic3,
                phone.Product.Pic4,
                phone.OS,
                phone.ScreenWidth,
                phone.ScreenResolution,
                phone.CPU,
                phone.RAM,
                phone.ROM,
                phone.Camera,
                phone.FrontCamera,
                phone.Battery,
                phone.NFC,
                phone.HeadphoneJack,
                phone.Wifi,
                phone.Sim,
                phone.Special
            }).OrderByDescending(phone => phone.PhoneID).Skip(first).Take(last);
            Debug.WriteLine("List before: ");
            foreach (var i in tempPhoneList)
            {
                Debug.WriteLine(i.PhoneID);
            }

            Debug.WriteLine("List after:");
            foreach (var phone in phoneList)
            {
                Debug.WriteLine(phone.PhoneID);
            }

            return Ok(phoneList);
        }

        [HttpPost]
        public IHttpActionResult PostNew()
        {

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Check if phone existed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool PhoneExists(int id)
        {
            return db.Phones.Count(e => e.PhoneID == id) > 0;
        }

        /// <summary>
        /// Check if product existed
        /// </summary>
        /// <param name="proID"></param>
        /// <returns></returns>
        private bool ProductExists(int proID)
        {
            return db.Products.Count(p => p.ProductID == proID) > 0;
        }
    }
}