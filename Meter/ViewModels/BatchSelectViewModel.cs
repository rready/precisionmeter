using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Meter.ViewModels
{
    public class BatchSelectViewModel
    {
        [Display(Name = "Select Batch")]
        public int SelectedBatchno { get; set; }
        public IEnumerable<SelectListItem> Batchno { get; set; }
    }
}