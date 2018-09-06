using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Meter.Models;
using Meter.ViewModels;

namespace Meter.Controllers
{
    public class BatchesController : Controller
    {
        private PrecisionMeterEntities db = new PrecisionMeterEntities();
        
        //[Authorize]
        // GET: Batches
        public ActionResult Index() 
        {

            return View(db.Batches.ToList()); //.OrderByDescending(x => x.BatchNo));
        }

        public ActionResult GetBatchMeters(int batchno)
        {
            var x = db.Repairs.Where(r => r.Batchno == batchno)
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


        public ActionResult GetBatchList()
        {
            //return View(db.Customers.Include(d => d.Repairs).ToList());
            
            var x = (from obj in db.Batches select new { BatchNo = obj.BatchNo, Custid = obj.Custid, BatchDate = obj.BatchDate, Totaldone = obj.Totaldone, Printed = obj.printed }).ToList().OrderByDescending(b => b.BatchNo);
            return Json(x.ToList().OrderByDescending(b => b.BatchNo), JsonRequestBehavior.AllowGet);
        }
        // GET: Batches/Details/5

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Batch batch = db.Batches.Find(id);
            if (batch == null)
            {
                return HttpNotFound();
            }
            return View(batch);
        }

        // GET: Batches/Create
        public ActionResult Create()
        {
           
            var customers = db.Customers.ToList().OrderBy(x => x.Company);
            ViewData["Cust"] = customers;
            return View();
        }

        // POST: Batches/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "BatchNo,Custid,BatchDate,Totaldone,printed,BatchStatus,Notes")] Batch batch)
        {
            if (ModelState.IsValid)
            {
                db.Batches.Add(batch);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(batch);
        }

        [HttpPost]
        public void InsertBatch(string custId)
        {

        }

        // GET: Batches/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Batch batch = db.Batches.Find(id);
            if (batch == null)
            {
                return HttpNotFound();
            }
            return View(batch);
        }

        // POST: Batches/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "BatchNo,Custid,BatchDate,Totaldone,printed,BatchStatus,Notes")] Batch batch)
        {
            if (ModelState.IsValid)
            {
                db.Entry(batch).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(batch);
        }

        // GET: Batches/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Batch batch = db.Batches.Find(id);
            if (batch == null)
            {
                return HttpNotFound();
            }
            return View(batch);
        }

        // POST: Batches/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Batch batch = db.Batches.Find(id);
            db.Batches.Remove(batch);
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
