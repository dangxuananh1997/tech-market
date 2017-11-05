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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int id = data["id"].ToObject<Int32>();
            Phone phone = data["phone"].ToObject<Phone>();


            if (id != phone.PhoneID || id != phone.Product.ProductID)
            {
                return BadRequest();
            }

            db.Entry(phone).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
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
            Product p = await db.Products.FindAsync(id);

            phone.Product.GUID = p.GUID;
            db.Entry(phone.Product).State = EntityState.Modified;

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


            var p = await db.Phones.Select(phone => phone).ToListAsync();

            if (filter.BrandIDList != null)
            {
                foreach (var brand in filter.BrandIDList)
                {
                    if (brand != 0)
                    {
                        p = await db.Phones.Where(phone => phone.Product.BrandID == brand).ToListAsync();
                    }
                }
            }
            if (filter.OSList != null)
            {
                foreach (var os in filter.OSList)
                {
                    if (!String.IsNullOrEmpty(os))
                    {
                        p = await db.Phones.Where(phone => phone.OS.Contains(os)).ToListAsync();
                    }
                }
            }
            if (filter.RAMList != null)
            {
                foreach (var ram in filter.RAMList)
                {
                    if (!String.IsNullOrEmpty(ram))
                    {
                        p = await db.Phones.Where(phone => phone.RAM.Contains(ram)).ToListAsync();
                    }
                }
            }
            if (filter.ROMList != null)
            {
                foreach (var rom in filter.ROMList)
                {
                    if (!String.IsNullOrEmpty(rom))
                    {
                        p = await db.Phones.Where(phone => phone.ROM.Contains(rom)).ToListAsync();
                    }
                }
            }
            if (filter.CameraList != null)
            {
                foreach (var cam in filter.CameraList)
                {
                    if (!String.IsNullOrEmpty(cam))
                    {
                        p = await db.Phones.Where(phone => phone.Camera.Contains(cam)).ToListAsync();
                    }
                }
            }
            if (filter.FrontCameraList != null)
            {
                foreach (var frontCam in filter.FrontCameraList)
                {
                    if (!String.IsNullOrEmpty(frontCam))
                    {
                        p = await db.Phones.Where(phone => phone.FrontCamera.Contains(frontCam)).ToListAsync();
                    }
                }
            }
            var phoneList = p.Select(phone => new
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

            foreach (var i in p)
            {
                Debug.WriteLine(i.PhoneID);
            }
            if (p == null)
            {
                Debug.WriteLine("It's null");
            }
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