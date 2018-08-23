using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Meter.Models;

namespace Meter.Controllers
{
    public class vw_batchMeterReportController : Controller
    {
        private PrecisionMeterEntities db = new PrecisionMeterEntities();

        // GET: vw_batchMeterReport
        public ActionResult Index()
        {
            SelectList sl = GetExportedFiles();
            ViewBag.Files = sl;
            return View(db.vw_batchMeterReport.ToList());
        }

        public SelectList GetExportedFiles()
        {
            var path = @"C:\Users\sams club\Downloads\";
            DirectoryInfo directory = new DirectoryInfo(@"C:\Users\sams club\Downloads/");
            //var filesListing = Directory
            //        .EnumerateFiles(path) //<--- .NET 4.5
            //        .Where(file => file.ToLower().EndsWith("aspx") || file.ToLower().EndsWith("ascx"))
            //        .ToList();



            var filesListing = directory.GetFiles("*.pdf").ToList<FileInfo>();
            var filesXlxListing = directory.GetFiles("*.xls").ToList<FileInfo>();
            List<SelectListItem> thefiles = new List<SelectListItem>();
            List<SelectListItem> xlsFiles = new List<SelectListItem>();
            foreach (var item in filesListing)
            {
                thefiles.Add(new SelectListItem() {Text = item.FullName, Value=item.FullName });
            }
            foreach (var item in filesXlxListing)
            {
                xlsFiles.Add( new SelectListItem() { Text = item.FullName, Value = item.FullName });
            }
           // return new SelectList(thefiles.Concat(xlsFiles), "Value", "Text");


            SelectList sl = new SelectList(thefiles.Concat(xlsFiles), "Value", "Text");
            ViewBag.Files = sl;
            return sl;
        }

        public ActionResult GetMeterList()
        {
            SelectList sl = GetExportedFiles();
            ViewBag.Files = sl;
            var x = db.vw_batchMeterReport
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
                          conumandmfgnum = c.conum,
                          Mfgsize = c.Mfgsize,
                          Afpopen = c.Afpopen,
                          Afpcheck = c.Afpcheck,
                          Afperro = c.Afperro,
                          //TextMessage1 = c.TextMessage1,
                        //  Message1 = c.Message1,
                          Alopen = c.Alopen,
                          Alcheck = c.Alcheck,
                          Alerror = c.Alerror,
                          Pdate = c.Pdate,
                        //  Textmessage2 = c.Textmessage2,
                        //  Message2 = c.Message2,
                          Pby = c.Pby,
                          Rft = c.Rft,
                          Irat = c.Irat,
                          Irbt = c.Irbt,
                          Remarks = c.Remarks,
                        //  Statue =   c.Statue

                      }).ToList();


            return Json(x.ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: vw_batchMeterReport/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            vw_batchMeterReport vw_batchMeterReport = db.vw_batchMeterReport.Find(id);
            if (vw_batchMeterReport == null)
            {
                return HttpNotFound();
            }
            return View(vw_batchMeterReport);
        }

        // GET: vw_batchMeterReport/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: vw_batchMeterReport/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Batchno,Custid,mfgnum,conum,Mfgsize,Afpopen,Afpcheck,Afperro,Alopen,Alcheck,Alerror,Pdate,Pby,Rft,Irbt,Remarks,Company,Irat,sysid")] vw_batchMeterReport vw_batchMeterReport)
        {
            if (ModelState.IsValid)
            {
                db.vw_batchMeterReport.Add(vw_batchMeterReport);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(vw_batchMeterReport);
        }

        // GET: vw_batchMeterReport/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            vw_batchMeterReport vw_batchMeterReport = db.vw_batchMeterReport.Find(id);
            if (vw_batchMeterReport == null)
            {
                return HttpNotFound();
            }
            return View(vw_batchMeterReport);
        }

        // POST: vw_batchMeterReport/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Batchno,Custid,mfgnum,conum,Mfgsize,Afpopen,Afpcheck,Afperro,Alopen,Alcheck,Alerror,Pdate,Pby,Rft,Irbt,Remarks,Company,Irat,sysid")] vw_batchMeterReport vw_batchMeterReport)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vw_batchMeterReport).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(vw_batchMeterReport);
        }

        // GET: vw_batchMeterReport/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            vw_batchMeterReport vw_batchMeterReport = db.vw_batchMeterReport.Find(id);
            if (vw_batchMeterReport == null)
            {
                return HttpNotFound();
            }
            return View(vw_batchMeterReport);
        }

        // POST: vw_batchMeterReport/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            vw_batchMeterReport vw_batchMeterReport = db.vw_batchMeterReport.Find(id);
            db.vw_batchMeterReport.Remove(vw_batchMeterReport);
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
