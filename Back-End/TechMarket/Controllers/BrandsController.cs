using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TechMarket.Models;

namespace TechMarket.Controllers
{
    public class BrandsController : ApiController
    {
        private TechMarketEntities db = new TechMarketEntities();

        // GET: api/Brands
        [HttpGet]
        public IHttpActionResult GetBrands()
        {
            var brandList = db.Brands.Select(b => new
            {
                b.BrandID,
                b.BrandName
            });

            return Ok(brandList);
        }

        // GET: api/Brands/5
        [HttpGet]
        public IHttpActionResult GetBrandByID(int id)
        {
            var brand = db.Brands.Select(b => new
            {
                b.BrandID,
                b.BrandName
            }).Where(b => b.BrandID == id).FirstOrDefault();
            if (brand == null)
            {
                return NotFound();
            }

            return Ok(brand);
        }

        

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BrandExists(int id)
        {
            return db.Brands.Count(e => e.BrandID == id) > 0;
        }
    }
}