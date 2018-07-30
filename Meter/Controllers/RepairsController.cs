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
            var repairs = db.Repairs.Include(r => r.Customer);
            return View(repairs.ToList());
        }


        public ActionResult GetMeterList()
        {
            var x = (from obj in db.Repairs select new
            {
                sysid = obj.sysid,
                Batchno = obj.Batchno,
                Custid = obj.Custid,
                mfgnum = obj.mfgnum,
                conum = obj.conum,
                conumandmfgnum = obj.conumandmfgnum,
                Mfgsize = obj.Mfgsize,
                Afpopen = obj.Afpopen,
                Afpcheck = obj.Afpcheck,
                Afperro = obj.Afperro,
                TextMessage1 = obj.TextMessage1,
                Message1 = obj.Message1,
                Alopen = obj.Alopen,
                Alcheck = obj.Alcheck,
                Alerror = obj.Alerror,
                Pdate = obj.Pdate,
                Textmessage2 = obj.Textmessage2,
                Message2 = obj.Message2,
                Pby = obj.Pby,
                Rft = obj.Rft,
                Irat = obj.Irat,
                Irbt = obj.Irbt,
                Remarks = obj.Remarks,
                Statue = obj.Statue



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
