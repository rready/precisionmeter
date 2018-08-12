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
    public class RepairsController : Controller
    {
        private PrecisionMeterEntities db = new PrecisionMeterEntities();

        // GET: Repairs
        public ActionResult Index()
        {
            var repairs = db.Repairs.Include(r => r.Customer).ToList();
            return View(repairs.ToList());
        }


        public ActionResult GetMeterList()
        {
            var x = db.Repairs
                .Join(db.Customers,
                      c => c.Custid,
                      o => o.Custid,
                      (c, o) => new
                      {
                         Company = o.Company,
                          sysid = c.sysid,
                          Batchno = c.Batchno,
                          Custid = c.Custid,
                          mfgnum = c.mfgnum,
                          conum = c.conum,
                          conumandmfgnum = c.conumandmfgnum,
                          Mfgsize = c.Mfgsize,
                          Afpopen = c.Afpopen,
                          Afpcheck = c.Afpcheck,
                          Afperro = c.Afperro,
                          TextMessage1 = c.TextMessage1,
                          Message1 = c.Message1,
                          Alopen = c.Alopen,
                          Alcheck = c.Alcheck,
                          Alerror = c.Alerror,
                          Pdate = c.Pdate,
                          Textmessage2 = c.Textmessage2,
                          Message2 = c.Message2,
                          Pby = c.Pby,
                          Rft = c.Rft,
                          Irat = c.Irat,
                          Irbt = c.Irbt,
                          Remarks = c.Remarks,
                          Statue = c.Statue

                      }).ToList();

          
            return Json(x.ToList(), JsonRequestBehavior.AllowGet);
        }
        // GET: Repairs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Repair repair = db.Repairs.Find(id);
            if (repair == null)
            {
                return HttpNotFound();
            }
            return View(repair);
        }

        // GET: Repairs/Create
        public ActionResult Create()
        {
            ViewBag.Custid = new SelectList(db.Customers, "Custid", "Company");
            ViewBag.AFM = db.MeterOptions.ToList().Where(x => x.Type == "AFM");
            return View();
        }

        // POST: Repairs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "sysid,Batchno,Custid,mfgnum,conum,conumandmfgnum,Mfgsize,Afpopen,Afpcheck,Afperro,TextMessage1,Message1,Alopen,Alcheck,Alerror,Pdate,Textmessage2,Message2,Pby,Rft,Irat,Irbt,Remarks,Statue")] Repair repair)
        {
            if (ModelState.IsValid)
            {
                db.Repairs.Add(repair);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.Custid = new SelectList(db.Customers, "Custid", "Company", repair.Custid);
            return View(repair);
        }

        // GET: Repairs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Repair repair = db.Repairs.Find(id);
            if (repair == null)
            {
                return HttpNotFound();
            }
            ViewBag.Custid = new SelectList(db.Customers, "Custid", "Company", repair.Custid);
            return View(repair);
        }

        // POST: Repairs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "sysid,Batchno,Custid,mfgnum,conum,conumandmfgnum,Mfgsize,Afpopen,Afpcheck,Afperro,TextMessage1,Message1,Alopen,Alcheck,Alerror,Pdate,Textmessage2,Message2,Pby,Rft,Irat,Irbt,Remarks,Statue")] Repair repair)
        {
            if (ModelState.IsValid)
            {
                db.Entry(repair).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.Custid = new SelectList(db.Customers, "Custid", "Company", repair.Custid);
            return View(repair);
        }

        // GET: Repairs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Repair repair = db.Repairs.Find(id);
            if (repair == null)
            {
                return HttpNotFound();
            }
            return View(repair);
        }

        // POST: Repairs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Repair repair = db.Repairs.Find(id);
            db.Repairs.Remove(repair);
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
