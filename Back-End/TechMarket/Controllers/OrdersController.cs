using Newtonsoft.Json.Linq;
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
    public class OrdersController : ApiController
    {
        private TechMarketEntities db = new TechMarketEntities();

        // GET: api/Orders
        public IHttpActionResult GetInRange(int first, int last)
        {
            var orderList = db.Orders.Select(order => new
            {
                order.OrderID,
                order.ProductID,
                order.Product.ProductName,
                order.Quantity,
                order.Price,
                order.CustomerEmail,
                order.CustomerName,
                order.CustomerAddress,
                order.CustomerPhone,
                order.CustomerNote,
                order.OrderStatus
            }).OrderByDescending(order => order.OrderID).Skip(first).Take(last);

            return Ok(orderList);
        }

        // GET: api/Orders/5
        [HttpGet]
        public IHttpActionResult GetOrder(int id)
        {
            var ord = db.Orders.Select(order => new
            {
                order.OrderID,
                order.ProductID,
                order.Product.ProductName,
                order.Quantity,
                order.Price,
                order.CustomerEmail,
                order.CustomerName,
                order.CustomerAddress,
                order.CustomerPhone
            }).Where(order => order.OrderID == id).FirstOrDefault();

            if (ord == null)
            {
                return NotFound();
            }

            return Ok(ord);
        }

        // PUT: api/Orders/5
        [HttpPost]
        public async Task<IHttpActionResult> PutOrder([FromBody]JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int id = data["id"].ToObject<Int32>();
            Order order = data["order"].ToObject<Order>();

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<IHttpActionResult> PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            order.OrderGUID = Guid.NewGuid();
            db.Orders.Add(order);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.OrderID))
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

        // DELETE: api/Orders/5
        [HttpPost]
        public async Task<IHttpActionResult> DeleteOrder(int id)
        {
            Order order = await db.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);

            var product = db.Products.Where(p => p.ProductID == order.ProductID).FirstOrDefault();
            product.Quantity = product.Quantity - 1;

            db.Entry(product).State = EntityState.Modified;

            await db.SaveChangesAsync();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}