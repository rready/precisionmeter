using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Meter.Models;

namespace Meter.Controllers
{
    public class CustomersController : Controller
    {
        private PrecisionMeterEntities db = new PrecisionMeterEntities();

        // GET: Customers
       
        public ActionResult Index()
        {
           // var repairs = db.Repairs.Include(r => r.Customer).ToList();
            //return View(db.Customers.ToList());
            return View(db.Customers.Include(d => d.Repairs).ToList());
        }

       
        
        public ActionResult GetEmpList()
        {
           // var records = View(db.Customers);
            var records = (from obj in db.Customers select new { Custid = obj.Custid, Company = obj.Company,
                ShortName = obj.ShortName, Contact = obj.Contact, Address1 = obj.Address1,
                Address2 = obj.Address2, City = obj.City }).ToList();
            return Json(records,JsonRequestBehavior.AllowGet);
        }
        // GET: Customers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // GET: Customers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Custid,Company,ShortName,Contact,Address1,Address2,City,State,Zip,Phone1,Phone2,Fax,Calculation,PrintIncolor,Ytdmeters,CurrentYear,Notes,emailAddress")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(customer);
        }

        // GET: Customers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Custid,Company,ShortName,Contact,Address1,Address2,City,State,Zip,Phone1,Phone2,Fax,Calculation,PrintIncolor,Ytdmeters,CurrentYear,Notes,emailAddress")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
